<template>
  <div class="audio-controls">
    <IconButton
      v-if="!isPlaying"
      svg-name="play"
      @click="togglePlay"
      class="icon-button-large"
      default-color="#111"
      hover-color="#555"
      icon-size="80px"/>
    <IconButton
      v-if="isPlaying"
      svg-name="pause"
      @click="togglePlay"
      class="icon-button-large"
      default-color="#111"
      hover-color="#555"
      icon-size="80px"/>
    <p>{{ formattedCurrentTime }} / {{ formattedDuration }}</p>
    <div class="progress-bar">
      <input type="range" min="0" :max="audioDuration" v-model="currentTime" @input="seek" />
    </div>
    <div class="control-row">
      <IconButton
        svg-name="backward"
        @click="skipBackward"
        class="icon-button-small"
        default-color="#111"
        hover-color="#555"/>
      <IconButton
        v-if="showStop"
        svg-name="stop"
        @click="stopAudio"
        class="icon-button-small"
        default-color="#111"
        hover-color="#555"/>
      <IconButton
        svg-name="forward"
        @click="skipForward"
        class="icon-button-small"
        default-color="#111"
        hover-color="#555"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed, onMounted } from 'vue';
  import IconButton from './buttons/IconButton.vue';

  // Props for audio file path
  const props = defineProps<{
    audioFilePath: string | null;
  }>();

  // State management
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const audioDuration = ref(0);
  let audioFile: HTMLAudioElement | null = null; // Web audio element

  const showStop = computed(() => {
    if(!audioFile?.currentTime) return false;
    return audioFile.currentTime > 0;
  });

  // Load the audio file when the component is mounted or when the file path changes
  const loadAudioFile = () => {
    if (props.audioFilePath) {
      if (audioFile) {
        audioFile.pause(); // Pause previous audio before loading new one
      }

      // Load the new audio file for web
      audioFile = new Audio(props.audioFilePath);
      console.log(`got audio file: `, audioFile);
      audioFile.addEventListener('loadedmetadata', () => {
        audioDuration.value = audioFile?.duration || 0;
      });

      // Update current time as the audio plays
      audioFile.addEventListener('timeupdate', () => {
        currentTime.value = audioFile?.currentTime || 0;
      });
    }
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (audioFile) {
      if (isPlaying.value) {
        audioFile.pause();
      } else {
        audioFile.play();
      }
      isPlaying.value = !isPlaying.value;
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioFile) {
      audioFile.pause();
      audioFile.currentTime = 0; // Reset to start
      isPlaying.value = false;
    }
  };

  // Skip 5 seconds forward
  const skipForward = () => {
    if(audioFile) {
      audioFile.currentTime = Math.min(audioFile.currentTime + 5, audioDuration.value);
    }
  };

  // Skip 5 seconds backward
  const skipBackward = () => {
    if(audioFile) {
      audioFile.currentTime = Math.max(audioFile.currentTime - 5, 0);
    }
  };

  // Seek to the selected position
  const seek = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if(audioFile) {
      audioFile.currentTime = parseFloat(target.value);
    }
  };

  // Watch for changes in the audioFilePath prop and load the audio
  watch(() => props.audioFilePath, loadAudioFile);

  // Format time as mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Computed formatted times for display
  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(audioDuration.value));

  // On mounted hook to load audio if the path is already set
  onMounted(loadAudioFile);
</script>

<style scoped lang="scss">
  .audio-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .progress-bar {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0;
  }

  input[type='range'] {
    flex-grow: 1;
    margin-right: 10px;
  }

  .control-row {
    display: flex;
    justify-content: space-between;
    height: 42px;
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  .icon-button-small {

  }

  .icon-button-large {
    width: 80px;
    height: 80px;
    margin: 20px;
  }
</style>

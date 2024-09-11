<template>
  <div class="audio-controls">
    <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
    <button @click="stopAudio">Stop</button>

    <div class="skip-buttons">
      <button @click="skipBackward">-5s</button>
      <button @click="skipForward">+5s</button>
    </div>

    <p>{{ formattedCurrentTime }} / {{ formattedDuration }}</p>
    <div class="progress-bar">
      <input type="range" min="0" :max="audioDuration" v-model="currentTime" @input="seek" />
    </div>

    <button @click="previousDay">Previous Day</button>
    <button @click="nextDay">Next Day</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed, onMounted } from 'vue';

  // Props for audio file path
  const props = defineProps<{
    audioFilePath: string | null;
  }>();

  // State management
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const audioDuration = ref(0);
  let audioFile: HTMLAudioElement | null = null; // Web audio element

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
    if (audioFile) {
      audioFile.currentTime = Math.min(audioFile.currentTime + 5, audioDuration.value);
    }
  };

  // Skip 5 seconds backward
  const skipBackward = () => {
    if (audioFile) {
      audioFile.currentTime = Math.max(audioFile.currentTime - 5, 0);
    }
  };

  // Seek to the selected position
  const seek = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (audioFile) {
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

  // Go to the previous day (logic to load the previous day's audio)
  const previousDay = () => {
    // Your logic here
    console.log('Loading previous day\'s audio');
  };

  // Go to the next day (logic to load the next day's audio)
  const nextDay = () => {
    // Your logic here
    console.log('Loading next day\'s audio');
  };

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

  .skip-buttons {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    margin: 10px 0;
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
</style>

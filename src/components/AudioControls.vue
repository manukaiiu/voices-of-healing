<template>
  <div class="audio-controls">
    <div class="content-top">
      <IconButton
        v-if="!isPlaying"
        svg-name="play"
        @click="togglePlay"
        class="icon-button-large"
        icon-size="120px" />
      <IconButton
        v-if="isPlaying"
        svg-name="pause"
        @click="togglePlay"
        class="icon-button-large"
        icon-size="120px" />
    </div>
    <div class="content-bottom">
      <span class="current-time">
        {{ formattedCurrentTime }} / {{ formattedDuration }}
      </span>
      <div class="progress-bar">
        <input
          type="range"
          min="0"
          :max="audioDuration"
          v-model="currentTime"
          @input="seek" />
      </div>
      <div class="control-row">
        <IconButton
          svg-name="backward"
          @click="skipBackward" />
        <IconButton
          v-if="!isPlaying"
          svg-name="play"
          @click="togglePlay" />
        <IconButton
          v-if="isPlaying"
          svg-name="pause"
          @click="togglePlay" />
        <IconButton
          svg-name="stop"
          @click="stopAudio" />
        <IconButton
          svg-name="forward"
          @click="skipForward" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
  import IconButton from './buttons/IconButton.vue';
  import { DirectoryAnalyzer } from 'directory-analyzer';

  // Props for audio file URI
  const props = defineProps<{
    audioFileUri: string | null;
  }>();

  // State management
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const audioDuration = ref(0);
  let positionInterval: ReturnType<typeof setInterval> | null = null;

  // Load the audio file when the component is mounted or when the file URI changes
  const loadAudioFile = async () => {
    if (props.audioFileUri) {
      try {
        await DirectoryAnalyzer.loadAudio({ uri: props.audioFileUri });
        const durationResult = await DirectoryAnalyzer.getDuration();
        audioDuration.value = durationResult.duration;

        // Start updating the current position
        if (positionInterval) {
          clearInterval(positionInterval);
        }
        positionInterval = setInterval(async () => {
          const positionResult = await DirectoryAnalyzer.getCurrentPosition();
          currentTime.value = positionResult.position;
        }, 500); // Update every 500ms
      } catch (error) {
        console.error('Error loading audio file:', error);
      }
    }
  };

  const togglePlay = async () => {
    if (isPlaying.value) {
      await DirectoryAnalyzer.pauseAudio();
    } else {
      await DirectoryAnalyzer.playAudio();
    }
    isPlaying.value = !isPlaying.value;
  };

  const stopAudio = async () => {
    await DirectoryAnalyzer.stopAudio();
    isPlaying.value = false;
    currentTime.value = 0;
  };

  const skipForward = async () => {
    await DirectoryAnalyzer.skipForward({ milliseconds: 5000 });
  };

  const skipBackward = async () => {
    await DirectoryAnalyzer.skipBackward({ milliseconds: 5000 });
  };

  const seek = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const position = parseInt(target.value, 10);
    await DirectoryAnalyzer.seekAudio({ position });
    currentTime.value = position;
  };

  watch(() => props.audioFileUri, loadAudioFile);

  onMounted(loadAudioFile);

  onUnmounted(() => {
    if (positionInterval) {
      clearInterval(positionInterval);
    }
  });

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(audioDuration.value));
</script>

<style scoped lang="scss">
  .audio-controls {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }

  .content-top {
    display: flex;
    justify-content: center;
  }

  .icon-button-large {
    width: 120px;
    height: 120px;
    margin: 20px;
  }

  .content-bottom {
    display: flex;
    flex-direction: column;
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

  .current-time {
    margin: 0;
    display: flex;
    align-self: center;
  }
</style>

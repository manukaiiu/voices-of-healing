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
        <div
          v-if="playedWidth >= 1"
          class="progress-played"
          :style="{ width: playedWidth + '%' }"></div>
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

  const props = defineProps<{
    audioFileUri: string | null;
  }>();

  const isPlaying = ref(false);
  const currentTime = ref(0);
  const audioDuration = ref(0);
  let positionInterval: ReturnType<typeof setInterval> | null = null;

  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(audioDuration.value));
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const playedWidth = computed(() => {
    return ((currentTime.value / audioDuration.value) * 100) + 3;
  });

  const loadAudioFile = async () => {
    if(props.audioFileUri) {
      try {
        await DirectoryAnalyzer.loadAudio({ uri: props.audioFileUri });
        const durationResult = await DirectoryAnalyzer.getDuration();
        audioDuration.value = durationResult.duration;
        isPlaying.value = false;

        if (positionInterval) {
          clearInterval(positionInterval);
        }
        positionInterval = setInterval(async () => {
          const positionResult = await DirectoryAnalyzer.getCurrentPosition();
          currentTime.value = positionResult.position;

          if(positionResult.position >= audioDuration.value) {
            stopAudio();
          }
        }, 500);
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
    if(positionInterval) {
      clearInterval(positionInterval);
    }
  });
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

  .progress-bar input[type="range"] {
    -webkit-appearance: none; /* For Chrome, Safari, and Opera */
    -moz-appearance: none;    /* For Firefox */
    appearance: none;
    width: 100%;
    background: transparent; // var(--color-light-green);
    border: 1px solid var(--color-heavy-green);
    border-radius: 6px;
    margin-top: 6px;
    margin-bottom: 12px;
  }

  .progress-bar input[type="range"]::-webkit-slider-runnable-track {
    height: 12px;
    border-radius: 6px;
    background: transparent; // var(--color-medium-green);
  }

  .progress-bar input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    background: var(--color-heavy-green);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px;
    border: 1px solid var(--color-medium-green);
  }

  .progress-bar input[type="range"]:focus {
    outline: none;
  }

  .progress-played {
    background-color: var(--color-heavy-green);
    height: 12px;
    position: relative;
    top: 19px;
    border-radius: 6px;
  }

  // .progress-bar {
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   margin: 10px 0;

  //   -webkit-appearance: none; /* For WebKit browsers */
  //   appearance: none;
  //   background: transparent;
  // }

  // .progress-bar input[type="range"]::v-deep::-webkit-slider-runnable-track {
  //   width: 100%;
  //   height: 8px;
  //   background: var(--color-light-green);
  //   border-radius: 4px;
  // }

  // .progress-bar input[type="range"]::v-deep::-webkit-slider-thumb {
  //   -webkit-appearance: none;
  //   height: 16px;
  //   width: 16px;
  //   background: var(--color-heavy-green);
  //   border-radius: 50%;
  //   cursor: pointer;
  //   margin-top: -4px; /* Adjust to align thumb with track */
  // }

  // input[type='range'] {
  //   flex-grow: 1;
  //   margin-right: 10px;
  // }

  .control-row {
    display: flex;
    justify-content: space-between;
    height: 42px;
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  .current-time {
    margin: 0;
    margin-bottom: 4px;
    display: flex;
    align-self: center;
  }
</style>

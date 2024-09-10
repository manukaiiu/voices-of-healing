<template>
  <div class="audio-player">
    <h1>{{ audioTitle }}</h1>
    <p>{{ audioDate }}</p>
    <audio-controls :audio-file-path="currentAudioFile" />
    <TodayButton v-if="showTodayButton" @jumpToToday="jumpToToday" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import AudioControls from '@/components/AudioControls.vue';
  import TodayButton from '@/components/TodayButton.vue';

  // Logic to fetch current audio, title, and date based on today's date
  const audioTitle = ref('Title of Today’s Audio');
  const audioDate = ref('Sept 15'); // For display
  const showTodayButton = ref(false);

  const currentAudioFile = ref(null);

  const jumpToToday = () => {
    // Logic to jump to today's audio
  };
</script>

<style scoped lang="scss">
  .audio-player {
    text-align: center;
  }
</style>

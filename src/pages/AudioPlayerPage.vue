<template>
  <div class="audio-player">
    <h1>{{ audioTitle }}</h1>
    <p>{{ audioDate }}</p>
    <audio-controls :audio-file-path="currentAudioFile" />
    <TodayButton v-if="showTodayButton" @jumpToToday="jumpToToday" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import AudioControls from '@/components/AudioControls.vue';
  import TodayButton from '@/components/TodayButton.vue';
import { useAudioStore } from '@/stores/audio.store';

  const audioStore = useAudioStore();

  // Logic to fetch current audio, title, and date based on today's date
  const audioTitle = ref('Selfcompassion - Day by Day');
  const audioDate = ref((new Date()).toDateString()); // For display
  const showTodayButton = ref(false);

  const currentAudioFile = ref(null);

  const jumpToToday = () => {
    // Logic to jump to today's audio
  };

  onMounted(() => {
    const audioFileName = audioStore.getAudioFileNameByDate(new Date());
    console.log(`Audio Player working with filename: ${audioFileName}`);
  });
</script>

<style scoped lang="scss">
  .audio-player {
    text-align: center;
  }
</style>

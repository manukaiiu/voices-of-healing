<template>
  <div class="audio-player">
    <h1>{{ audioTitle }}<br>{{ audioSubtitle }}</h1>
    <h2>{{ audioDate }}</h2>
    <audio-controls :audio-file-path="currentAudioFilePath" />
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
  const audioTitle = ref('Selfcompassion');
  const audioSubtitle = ref('Day by Day');
  const audioDate = ref((new Date()).toDateString()); // For display
  const showTodayButton = ref(false);

  const currentAudioFilePath = ref<string | null>(null);

  const jumpToToday = () => {
    // Logic to jump to today's audio
  };

  onMounted(() => {
    // { audioPath: currentAudioFilePath.value, formattedDate: audioDate.value } = audioStore.getAudioFileNameByDate(new Date());
    const audioStoreEntry = audioStore.getAudioFileNameByDate(new Date());
    currentAudioFilePath.value = audioStoreEntry.filePath;
    audioDate.value = audioStoreEntry.formattedDate;
    console.log(`Audio Player working with filepath: ${currentAudioFilePath.value}`);
  });
</script>

<style scoped lang="scss">
  .audio-player {
    text-align: center;
    background-color: var(--color-page-bg);
  }

  .subTitle {
    margin-top: 0;
  }
</style>

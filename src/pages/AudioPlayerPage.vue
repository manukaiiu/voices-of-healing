<template>
  <div class="audio-player">
    <h1>{{ audioTitle }}<br>{{ audioSubtitle }}</h1>
    <div class="date-control">
      <div class="date-control-top-row">
        <IconButton
          svg-name="chevron-left"
          @click="previousDay"
          class="previous-day"
          default-color="#111"
          hover-color="#555"/>
        <h2 class="today">{{ audioDate }}</h2>
        <IconButton
          svg-name="chevron-right"
          @click="nextDay"
          class="next-day"
          default-color="#111"
          hover-color="#555"/>
      </div>
      <div class="date-control-bottom-row">
        <TextButton
          v-if="showTodayButton"
          class="today"
          text="Today"
          :width-mode="EButtonWidthMode.SLIM"
          @click="jumpToToday"/>
      </div>
    </div>
    <audio-controls :audio-file-path="currentAudioFilePath" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import AudioControls from '@/components/AudioControls.vue';
  import { useAudioStore } from '@/stores/audio.store';
  import IconButton from '@/components/buttons/IconButton.vue';
  import { EButtonWidthMode } from '@/enums/button.enums';
  import { useRouter } from 'vue-router';
  import { ERoutes } from '@/enums/route.enums';

  const audioStore = useAudioStore();
  const router = useRouter();

  // Logic to fetch current audio, title, and date based on today's date
  const audioTitle = ref('Selfcompassion');
  const audioSubtitle = ref('Day by Day');
  const audioDate = ref('');
  const todayDate = ref<Date>(new Date());
  const currentDate = ref<Date>(new Date());
  const currentAudioFilePath = ref<string | null>(null);

  const showTodayButton = computed(() => {
    console.log(`today is: ${todayDate.value}`);
    console.log(`current date is: ${currentDate.value}`);
    console.log(`thus display button = ${todayDate.value.getFullYear() !== currentDate.value.getFullYear() ||
           todayDate.value.getMonth() !== currentDate.value.getMonth() ||
           todayDate.value.getDate() !== currentDate.value.getDate()}`);
    return todayDate.value.getFullYear() !== currentDate.value.getFullYear() ||
           todayDate.value.getMonth() !== currentDate.value.getMonth() ||
           todayDate.value.getDate() !== currentDate.value.getDate();
  });

  const jumpToToday = () => {
    currentDate.value = new Date(todayDate.value);
    selectAudioForDate(todayDate.value);
  }
  const previousDay = () => {
    currentDate.value = new Date(currentDate.value
      .setDate(currentDate.value.getDate() - 1));
    selectAudioForDate(currentDate.value);
  };
  const nextDay = () => {
    currentDate.value = new Date(currentDate.value
      .setDate(currentDate.value.getDate() + 1));
    selectAudioForDate(currentDate.value);
  };

  const selectAudioForDate = (desiredDate: Date): void => {
    const audioStoreEntry = audioStore.getAudioFileNameByDate(desiredDate);
    currentAudioFilePath.value = audioStoreEntry.filePath;
    audioDate.value = audioStoreEntry.formattedDate;
    console.log(`Audio Player working with filepath: ${currentAudioFilePath.value}`);
  }

  onMounted(() => {
    // const selectedFolder = audioStore.getSelectedFolder();
    // if(!selectedFolder) {
    //   void router.push({ name: ERoutes.SETUP });
    // }

    // selectAudioForDate(new Date());
  });
</script>

<style scoped lang="scss">
  .audio-player {
    text-align: center;
    background-color: var(--color-page-bg);
    padding: 10px;
    padding-top: 20px;
  }

  .subTitle {
    margin-top: 0;
    margin-bottom: 0;
  }

  .date-control {
    display: flex;
    flex-direction: column;
  }

  .date-control-top-row {
    background-color: var(--color-page-bg);
    display: grid;
    grid-template-columns: 42px 1fr 42px;
    grid-template-rows: auto;
    grid-template-areas: "previous current next";
  }

  .previous-day {
    grid-area: previous;
  }

  .today {
    grid-area: current;
    align-self: center;
    padding-top: 2px;
  }

  .next-day {
    grid-area: next;
  }
</style>

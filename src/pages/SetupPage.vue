<template>
  <div class="setup-page">
    <div>
      <span>Setup status: </span>
      <span v-if="configState === EConfigState.INITIAL">... please select folder 📁</span>
      <span v-if="configState === EConfigState.SETUP">⚙️ app setup is running ...</span>
      <span v-if="configState === EConfigState.READY">folder selected, all ready ❤️</span>
    </div>

    <div v-if="!!errorMessage">Error: {{ errorMessage }}</div>
    <div v-if="configState === EConfigState.INITIAL">
      <p>This page will help you setup the app.</p>
      <p>Press the button "select Folder" and pick the folder where your Selfcompassion Audios are stored.</p>
      <p>Please make sure to provide the required permissions to the app when prompted.</p>
      <p>Checkin back on this page to see the status anytime and pick another folder if you like.</p>
    </div>

    <TextButton
      class="setup-page__text-button"
      text="Select Folder"
      :width-mode="EButtonWidthMode.WIDE"
      @click="selectFolder"
    />

    <div v-if="configState !== EConfigState.INITIAL"
      class="setup-page__reset-section">
      <p>Any troubles? Try resetting the app and start fresh:</p>
      <TextButton
        class="setup-page__text-button"
        text="Reset App"
        :width-mode="EButtonWidthMode.WIDE"
        @click="resetStore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { EButtonWidthMode } from '@/enums/button.enums';
  import { EConfigState,TAudioMap,useAudioStore } from '@/stores/audio.store';
  import { ISetupInfos, SetupUtils } from '@/utils/setup-utils';
  import { onMounted,ref } from 'vue';
  import TextButton from '../components/buttons/TextButton.vue';

  const audioStore = useAudioStore();
  const configState = ref<EConfigState>(EConfigState.INITIAL);
  const errorMessage = ref<string>('');

  const selectFolder = async () => {
    const setupInfo = await SetupUtils.selectDirectoryAndProcessAudios();
    await setupStore(setupInfo);
  }

  const setupStore = async (setupInfo: ISetupInfos) => {
    const audioMap: TAudioMap = {};
    for(const audioInfo of setupInfo.audioInfos) {
      const dateKey = extractDateKey(audioInfo.name);
      if(dateKey) {
        audioMap[dateKey] = audioInfo;
      } else {
        console.warn(`Couldn't extract dateKey for audio: ${JSON.stringify(audioInfo, null, 2)}`);
      }
    }
    await audioStore.setAudioFiles(audioMap);
    await audioStore.setConfigState(setupInfo.configState);
    console.log(`audio store setup done -> continue to state: `)
    configState.value = setupInfo.configState;
  }

  const resetStore = async () => {
    await audioStore.resetStore();
  }

  const extractDateKey = (filename: string): string => {
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
    const match = nameWithoutExtension.match(/ - (\d{2}-\d{2})$/);
    if (match) {
      return match[1];
    } else {
      return '';
    }
  }

  onMounted(() => {
    console.log(`SETUP > initial state: ${configState.value}`);
    configState.value = audioStore.getConfigState();
    console.log(`SETUP > retrieved state: ${configState.value}`);
  });
</script>

<style lang="scss" scoped>
  .setup-page {
    padding: 20px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-page-bg);
    height: 100%;

    &__text-button {
      margin-top: 40px;
    }

    &__reset-section {
      margin-top: 72px;
    }
  }
</style>
<template>
  <div class="setup-page">
    <TextButton
      class="text-button"
      text="Test Select"
      :width-mode="EButtonWidthMode.WIDE"
      @click="testSelect"
    />
    <div v-if="!!errorMessage">Error: {{ errorMessage }}</div>
    <div v-if="configState === EConfigState.INITIAL">
      <p>11 - This page will help you setup the app.</p>
      <p>First this app will create a folder when you press the button "Create Folder".</p>
      <p>After that, you have to copy the audio files to the folder displayed.</p>
      <p>As soon as that is done, the app is should be ready to use.</p>
      <p>Checkin back on this page to see the status anytime.</p>
      <TextButton
        class="text-button"
        text="Create Folder"
        :width-mode="EButtonWidthMode.WIDE"
        @click="createFolder"
      />
    </div>

    <div v-if="configState !== EConfigState.INITIAL">
      <p>Folder ready: "VoicesOfHealing/Selfcompassion"</p>
    </div>

    <div v-if="configState === EConfigState.SETUP">
      <p>Please continue by copying the audio files into this folder.</p>
      <p>When you are done, you can just start the app again. Or press this button:</p>
      <TextButton
        class="text-button"
        text="Create Folder"
        :width-mode="EButtonWidthMode.WIDE"
        @click="scanForAudios"
      />
    </div>

    <div v-if="configState === EConfigState.READY">
      <p>All done! The app should be ready to use.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { EConfigState, useAudioStore } from '@/stores/audio.store';
  import { onMounted, ref } from 'vue';
  import TextButton from '../components/buttons/TextButton.vue'
  import { EButtonWidthMode } from '@/enums/button.enums';
  import { Directory, Filesystem } from '@capacitor/filesystem';
  import { FilesystemUtils } from '@/utils/filesystem-utils';
  import { TestUtils } from '@/utils/test-utils';

  const audioStore = useAudioStore();
  const configState = ref<EConfigState>(EConfigState.INITIAL);
  const errorMessage = ref<string>('');
  const BASE_DIRECTORY = Directory.Documents;
  const APP_MEDIA_DIRECTORY = 'VoicesOfHealing';
  const SELFCOMPASSION_DIRECTORY = 'Selfcompassion';

  const testSelect = async () => {
    // console.log(`**********************************`);
    // console.log(`>!> testing without any path`);
    // await TestUtils.selectTestAllUsingFileSystem('');
    // console.log(`**********************************`);
    // console.log(`>!> testing for 'Music'`);
    // await TestUtils.selectTestAllUsingFileSystem('Music');
    // console.log(`**********************************`);
    // console.log(`>!> testing for 'Documents'`);
    // await TestUtils.selectTestAllUsingFileSystem('Documents');

    await TestUtils.selectDirectoryUsingFilePicker();
  }

  const createFolder = async () => {
    let steps = 0;
    try {
      await Filesystem.mkdir({
        path: APP_MEDIA_DIRECTORY,
        directory: BASE_DIRECTORY,
      });
      errorMessage.value = '';
      steps++;
    } catch(e) {
      errorMessage.value = JSON.stringify(e);
    }

    if(steps === 1) {
      try {
        await Filesystem.mkdir({
          path: APP_MEDIA_DIRECTORY + '/' + SELFCOMPASSION_DIRECTORY,
          directory: BASE_DIRECTORY,
        });
        errorMessage.value = '';
        steps++;
      } catch(e) {
        errorMessage.value = JSON.stringify(e);
      }
    }

    if(steps === 2) {
      await audioStore.setConfigState(EConfigState.SETUP);
      configState.value = EConfigState.SETUP;
    }
  };

  const scanForAudios = async () => {
    configState.value = await FilesystemUtils.scanAndProcessAudios();
  };

  onMounted(() => {
    configState.value = audioStore.getConfigState();
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
  }

  .text-button {
    margin-top: 40px;
  }
</style>
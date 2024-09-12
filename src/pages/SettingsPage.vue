<template>
  <div class="settings-page">
    <label class="labelHeading">Selected Folder</label>
    <p class="text">{{ selectedFolder }}</p>
    <p class="text">Files: {{ recognizedFileCount }}</p>
    <TextButton
      v-if="isWeb"
      class="select-folder-button"
      text="Select Folder"
      :width-mode="EButtonWidthMode.WIDE"
      @click="selectFolderWeb"
    />
    <button v-else @click="selectFolderAndroid">Select Folder (Android)</button>
  </div>
</template>

<script setup lang="ts">
  import { Capacitor } from '@capacitor/core';
  import { FileInfo,Filesystem } from '@capacitor/filesystem';
  import { Preferences } from '@capacitor/preferences';
  import { onMounted, ref } from 'vue';
  import TextButton from '../components/buttons/TextButton.vue'
  import { EButtonWidthMode } from '@/enums/button.enums';
  import { IAudioInfo, useAudioStore } from '@/stores/audio.store';

  const audioStore = useAudioStore();
  const isWeb = Capacitor.getPlatform() === 'web';
  declare let FileChooser: any;
  const selectedFolder = ref<string | null>(null);
  const recognizedFileCount = ref<number>(0);
  let fileMap: Record<string, IAudioInfo> = {}; // Store MM-DD -> file path

  const selectFolderWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;

    input.onchange = (event: any) => {
      const files = [...event.target.files];
      // const folderPath = files[0].webkitRelativePath.split('/')[0];
      // selectedFolder.value = folderPath;
      analyzeFilesWeb(files);
    };
    input.click();
  };

  const selectFolderAndroid = async () => {
    try {
      const uri = await FileChooser.open();
      selectedFolder.value = await getFolderPathFromUri(uri);
      audioStore.setSelectedFolder(selectedFolder.value ?? '');
    } catch (error) {
      console.error('Error selecting folder:', error);
    }
  };

  const getFolderPathFromUri = async (fileUri: string): Promise<string> => {
    const fileInfo = await Filesystem.stat({ path: fileUri });
    const folderPath = fileInfo.uri.substring(0, fileInfo.uri.lastIndexOf('/'));
    console.log(`found android folder path: ${folderPath}`);
    return folderPath;
  };

  // const selectFolderAndroid1 = async () => {
  //   fileChooser.open({
  //     mime: 'vnd.android.document/directory', // Use this to pick a folder
  //   }).then((uri: string) => {
  //     selectedFolder.value = uri;
  //     console.log('Selected folder:', uri);
  //   }).catch((error: any) => {
  //     console.error('Error selecting folder:', error);
  //   });

  //   if(selectedFolder.value) {
  //     await Preferences.set({ key: 'selectedFolder', value: selectedFolder.value });
  //     const fileInfos = await Filesystem.readdir({ path: selectedFolder.value });
  //     analyzeFilesApp(fileInfos.files);
  //   } else {
  //     console.error('Need a folder to store!');
  //   }
  // };

  const analyzeFilesApp = (fileInofs: FileInfo[]) => {

  }

  const analyzeFilesWeb = (files: File[]) => {
    const regex = /^Selfcompassion Day by Day - (\d{2}-\d{2})\.mp3$/;
    fileMap = {};

    for(const file of files) {
      const match = file.name.match(regex);
      if(match) {
        // console.log(`> file matched with match: ${JSON.stringify(match, null, 2)} and file: ${JSON.stringify(file, null, 2)}` );
        const path = URL.createObjectURL(file);

        fileMap[match[1]] = {
          path,
          name: match[0],
          fileHandle: file,
        }
      }
    }

    recognizedFileCount.value = Object.keys(fileMap).length;
    console.log(`found file count: ${recognizedFileCount.value}`);
    console.log(`create map: `, fileMap);

    audioStore.setAudioFiles(fileMap);
    audioStore.setSelectedFolder(selectedFolder.value ?? '');
  };

  onMounted(() => {
    selectedFolder.value = audioStore.getSelectedFolder();
  });
</script>

<style scoped lang="scss">
  .settings-page {
    padding: 20px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-page-bg);
  }

  .labelHeading {
    font-weight: 600;
    margin: 20px 0;
  }

  .text {
    margin-left: 20px;
  }

  .select-folder-button {
    margin-top: 20px;
  }
</style>

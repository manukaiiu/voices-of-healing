<template>
  <div class="settings-page">
    <label>Selected Folder:</label>
    <p>{{ selectedFolder }}</p>
    <button v-if="isWeb" @click="selectFolderWeb">Select Folder (Web)</button>
    <button v-else @click="selectFolderAndroid">Select Folder (Android)</button>
    <p>Files recognized: {{ recognizedFileCount }}</p>
  </div>
</template>

<script setup lang="ts">
  import { Capacitor } from '@capacitor/core';
  import { FileInfo,Filesystem } from '@capacitor/filesystem';
  import { Preferences } from '@capacitor/preferences';
  import { onMounted,ref } from 'vue';

  declare let fileChooser: any;

  // Detect platform (web or android)
  const isWeb = Capacitor.getPlatform() === 'web';

  const selectedFolder = ref<string | null>(null);
  const recognizedFileCount = ref<number>(0);
  let fileMap: Record<string, string> = {}; // Store MM-DD -> file path

  // Load previously stored folder and file map on app startup
  const loadStoredData = async () => {
    const folder = isWeb
      ? localStorage.getItem('selectedFolder')
      : (await Preferences.get({ key: 'selectedFolder' })).value;
    if(folder) {
      selectedFolder.value = folder;
      console.log(`found selected folder: `, fileMap);
    }

    const storedMap = isWeb
      ? localStorage.getItem('fileMap')
      : (await Preferences.get({ key: 'fileMap' })).value;
    if(storedMap) {
      fileMap = JSON.parse(storedMap);
      console.log(`found stored file map: `, fileMap);
    }
    recognizedFileCount.value = Object.keys(fileMap).length;
  };

  // Function to select folder in web
  const selectFolderWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (event: any) => {
      const files = event.target.files;
      console.log(`event files (web): ${files}`);
      const folderPath = files[0].webkitRelativePath.split('/')[0]; // Get folder name
      selectedFolder.value = folderPath;
      console.log(`selected folder (web): ${selectedFolder.value}`);
      localStorage.setItem('selectedFolder', folderPath);
      analyzeFiles([...files]);
    };
    input.click();
  };

  const selectFolderAndroid = async () => {
    fileChooser.open({
      mime: 'vnd.android.document/directory', // Use this to pick a folder
    }).then((uri: string) => {
      selectedFolder.value = uri;
      console.log('Selected folder:', uri);
    }).catch((error: any) => {
      console.error('Error selecting folder:', error);
    });

    if(selectedFolder.value) {
      await Preferences.set({ key: 'selectedFolder', value: selectedFolder.value });
      const fileInfos = await Filesystem.readdir({ path: selectedFolder.value });
      analyzeFiles(fileInfos.files);
    } else {
      console.error('Need a folder to store!');
    }
  };

  // Function to analyze files and store matching ones
  const analyzeFiles = (files: FileInfo[]) => {
    const regex = /^Selfcompassion Day by Day - (\d{2}-\d{2})\.mp3$/;
    fileMap = {};

    for (const file of files) {
      const match = file.name.match(regex);
      if (match) {
        const mmdd = match[1]; // Extract MM-DD
        fileMap[mmdd] = file.uri;
      }
    }

    recognizedFileCount.value = Object.keys(fileMap).length;
    console.log(`found file count: ${recognizedFileCount.value}`);
    console.log(`create map: `, fileMap);
    persistFileMap();
  };

  // Persist the analyzed file map
  const persistFileMap = async () => {
    const serializedMap = JSON.stringify(fileMap);
    if (isWeb) {
      localStorage.setItem('fileMap', serializedMap);
    } else {
      await Preferences.set({ key: 'fileMap', value: serializedMap });
    }
  };

  onMounted(loadStoredData);
</script>

<style scoped lang="scss">
  .settings-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
</style>

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
    <TextButton
      v-else
      class="select-folder-button"
      text="Select Folder"
      :width-mode="EButtonWidthMode.WIDE"
      @click="selectTest"
    />
    <div class="folder-browser">
      <p>browse and select a folder</p>
      <p>current folder: {{ testPath }}</p>
      <TextButton class="select-folder-button" text="set folder" @click="selectFinal"/>
      <div
        v-for="(folder, index) in folders"
        :key="index"
        class="browser-row"
        @click="navigateInside(index)">
        {{folder.name}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Capacitor } from '@capacitor/core';
  import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
  import { Preferences } from '@capacitor/preferences';
  import { onMounted, ref } from 'vue';
  import TextButton from '../components/buttons/TextButton.vue'
  import { EButtonWidthMode } from '@/enums/button.enums';
  import { IAudioInfo, useAudioStore } from '@/stores/audio.store';
  import { FilePicker } from '@capawesome/capacitor-file-picker';

  const audioStore = useAudioStore();
  const isWeb = Capacitor.getPlatform() === 'web';
  declare let FileChooser: any;
  const selectedFolder = ref<string | null>(null);
  const recognizedFileCount = ref<number>(0);
  let fileMap: Record<string, IAudioInfo> = {}; // Store MM-DD -> file path

  const folders = ref<Array<{ name: string }>>([]);
  const testPath = ref<string>('');

  const selectFinal= () => {
    // audioStore.setSelectedFolder(testPath.value);
  }

  const selectTest = async () => {
    const data = await Filesystem.readdir({
      directory: Directory.Data,
      path: testPath.value,
    });
    console.log(`data content: ${JSON.stringify(data.files.map(file => file.name), null, 2)}`);
    const documents = await Filesystem.readdir({
      directory: Directory.Documents,
      path: testPath.value,
    });
    console.log(`documents content: ${JSON.stringify(documents.files.map(file => file.name), null, 2)}`);
    const external = await Filesystem.readdir({
      directory: Directory.External,
      path: testPath.value,
    });
    console.log(`external content: ${JSON.stringify(external.files.map(file => file.name), null, 2)}`);
    const lirbrary = await Filesystem.readdir({
      directory: Directory.Library,
      path: testPath.value,
    });
    console.log(`lirbrary content: ${JSON.stringify(lirbrary.files.map(file => file.name), null, 2)}`);

    const externalStorageContent = await Filesystem.readdir({
      directory: Directory.ExternalStorage,
      path: testPath.value,
    });
    console.log(`external storage content: ${JSON.stringify(externalStorageContent.files.map(file => file.name), null, 2)}`);

    folders.value = externalStorageContent.files
      .filter(element => element.type === 'directory')
      .map(folder => ({ name: folder.name }));

    await analyzeFilesAndroid(testPath.value);
  }

  const navigateInside = async (index: number) => {
    const newCurrentFolder = folders.value[index].name;
    testPath.value = testPath.value ? testPath.value + '/' + newCurrentFolder : newCurrentFolder;
    console.log(`trying to dive into: ${testPath.value}`);
    const content = await Filesystem.readdir({
      directory: Directory.ExternalStorage,
      path: testPath.value,
    });
    console.log(`new content: ${JSON.stringify(content, null, 2)}`);
    folders.value = content.files
      .filter(element => element.type === 'directory')
      .map(folder => ({ name: folder.name }));
  };

  const selectTest1 = async () => {
    const result = await FilePicker.pickFiles();
    console.log(`this is the result: ${JSON.stringify(result, null, 2)} ... `, result);

    const fullPath = result.files[0].path;
    const fileNameStartString = 'Selfcompassion';
    const fileNameStartIndex = fullPath?.indexOf(fileNameStartString);
    const folderPath = fullPath?.slice(0, fileNameStartIndex);
    console.log(`got folder path: ${folderPath}`);

    // audioStore.setSelectedFolder(folderPath ?? '');

    if(!!folderPath) {
      const files = await Filesystem.readdir({ path: folderPath });
      console.log(`found files: ${JSON.stringify(files, null, 2)}`);
    }
  }

  const selectFolderAndroid = async () => {
    try {
      const uri = await FileChooser.open();
      selectedFolder.value = await getFolderPathFromUri(uri);
      // audioStore.setSelectedFolder(selectedFolder.value ?? '');
      await analyzeFilesAndroid(selectedFolder.value);
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

const analyzeFilesAndroid = async (folderPath: string) => {
  console.log(`trying to analyse files in folder: ${folderPath}`);
  try {
    // List the files in the folder
    const files = await Filesystem.readdir({
      path: folderPath,
      directory: Directory.ExternalStorage
    });

    console.log('Files in folder:', files.files);

    const regex = /^Selfcompassion Day by Day - (\d{2}-\d{2})\.mp3$/;
    fileMap = {};

    // Iterate through the files and analyze
    for (const file of files.files) {
      const fileName = file.name;
      const match = fileName.match(regex);
      if(match) {
        // Create file path (using the Filesystem plugin to read the file)
        const filePath = `${folderPath}/${fileName}`;

        // Store the file path and name in fileMap
        fileMap[match[1]] = {
          path: filePath,
          name: match[0]
        };
      }
    }

    recognizedFileCount.value = Object.keys(fileMap).length;
    console.log(`Found file count: ${recognizedFileCount.value}`);
    console.log('Created file map:', fileMap);

    // Save the analyzed files in your Pinia store
    audioStore.setAudioFiles(fileMap);
  } catch (error) {
    console.error('Error reading folder contents:', error);
  }
};
  const selectFolderWeb = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;

    input.onchange = (event: any) => {
      const files = [...event.target.files];
      selectedFolder.value = files[0].webkitRelativePath.split('/')[0];
      analyzeFilesWeb(files);
    };
    input.click();
  };

  const analyzeFilesWeb = (files: File[]) => {
    const regex = /^Selfcompassion Day by Day - (\d{2}-\d{2})\.mp3$/;
    fileMap = {};

    for(const file of files) {
      const match = file.name.match(regex);
      if(match) {
        const path = URL.createObjectURL(file);

        fileMap[match[1]] = {
          path,
          name: match[0],
        }
      }
    }

    recognizedFileCount.value = Object.keys(fileMap).length;
    console.log(`found file count: ${recognizedFileCount.value}`);
    console.log(`created map: `, fileMap);

    audioStore.setAudioFiles(fileMap);
    // audioStore.setSelectedFolder(selectedFolder.value ?? '');
  };

  onMounted(() => {
    // selectedFolder.value = audioStore.getSelectedFolder();
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

  .folder-browser {
    display: flex;
    flex-direction: column;
    height: max-content;
  }

  .browser-row {
    height: 32px;
  }
</style>

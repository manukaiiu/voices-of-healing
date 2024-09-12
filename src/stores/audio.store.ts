import { formatFilenameToDateString } from '@/utils/utils';
import { defineStore } from 'pinia';
import { Preferences } from '@capacitor/preferences';

export interface IAudioState {
  selectedFolder: string,
  audioMap: Record<string, IAudioInfo>;
}

export interface IAudioInfo {
  path: string,
  name: string,
  fileHandle: any,
}

export const useAudioStore = defineStore('audio', {
  state: (): IAudioState => ({
    selectedFolder: '',
    audioMap: {},
  }),

  actions: {
    async setSelectedFolder(folder: string) {
      this.selectedFolder = folder;
      await Preferences.set({ key: 'selectedFolder', value: folder });
    },

    async setAudioFiles(audioMap: Record<string, IAudioInfo>) {
      this.audioMap = audioMap;
      console.log(`STORING audiomap: ${JSON.stringify(audioMap, null, 2)}`);
      await Preferences.set({ key: 'audioMap', value: JSON.stringify(audioMap) });
    },

    async loadFileMapFromPreferences() {
      const { value } = await Preferences.get({ key: 'audioMap' });
      if(value) {
        this.audioMap = JSON.parse(value);
        console.log(`RETRIEVED audiomap: ${JSON.stringify(this.audioMap, null, 2)}`);
      }
      const folder = await Preferences.get({ key: 'selectedFolder' });
      if(folder.value) {
        this.selectedFolder = folder.value;
      }
    },
  },

  getters: {
    getAudioFileNameByDate: (state) => {
      return (searchDate: Date): { filePath: string, formattedDate: string } => {
        const month = (searchDate.getMonth() + 1).toString().padStart(2, '0');
        const day = searchDate.getDate().toString().padStart(2, '0');
        const dateKey = `${month}-${day}`;

        console.log(`Retrieving audio file name for date "${searchDate}" with key "${dateKey}" => ${state.audioMap[dateKey]}`);

        return {
          // filePath: `${state.selectedFolder}/${state.audioMap[dateKey]}`,
          filePath: state.audioMap[dateKey].path ?? '',
          formattedDate: formatFilenameToDateString(state.audioMap[dateKey].name ?? ''),
        }
      };
    },

    getSelectedFolder: (state) => { return () => { return state.selectedFolder; }},
  },

  // persist: true, // Optional: use a plugin to persist state to localStorage
});

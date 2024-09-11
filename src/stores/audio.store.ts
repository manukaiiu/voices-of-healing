import { defineStore } from 'pinia';

export interface IAudioState {
  selectedFolder: string,
  audioMap: Record<string, string>;
}

export const useAudioStore = defineStore('audio', {
  state: (): IAudioState => ({
    selectedFolder: '',
    audioMap: {},
  }),

  actions: {
    setSelectedFolder(folder: string) {
      this.selectedFolder = folder;
    },
    setAudioFiles(audioMap: Record<string, string>) {
      this.audioMap = audioMap;
    },
  },

  getters: {
    getAudioFileNameByDate: (state) => {
      return (searchDate: Date): string | undefined => {
        const month = (searchDate.getMonth() + 1).toString().padStart(2, '0');
        const day = searchDate.getDate().toString().padStart(2, '0');
        const dateKey = `${month}-${day}`;

        console.log(`Retrieving audio file name for date "${searchDate}" with key "${dateKey}" => ${state.audioMap[dateKey]}`);

        return state.audioMap[dateKey];
      };
    },
  },

  // persist: true, // Optional: use a plugin to persist state to localStorage
});

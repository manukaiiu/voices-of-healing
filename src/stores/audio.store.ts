import { formatFilenameToDateString } from '@/utils/utils';
import { defineStore } from 'pinia';
import { Preferences } from '@capacitor/preferences';

export enum EConfigState {
  INITIAL = 'initial',
  SETUP = 'folder-created',
  READY = 'files-scanned',
};

export interface IAudioState {
  configState: EConfigState,
  audioMap: Record<string, IAudioInfo>;
}

export interface IAudioInfo {
  path: string,
  name: string,
}

export const useAudioStore = defineStore('audio', {
  state: (): IAudioState => ({
    configState: EConfigState.INITIAL,
    audioMap: {},
  }),

  actions: {
    async setConfigState(configState: EConfigState) {
      this.configState = configState;
      await Preferences.set({ key: 'configState', value: configState });
    },

    async setAudioFiles(audioMap: Record<string, IAudioInfo>) {
      this.audioMap = audioMap;
      console.log(`STORING audiomap: ${JSON.stringify(audioMap, null, 2)}`);
      await Preferences.set({ key: 'audioMap', value: JSON.stringify(audioMap) });
    },

    // async loadFileMapFromPreferences() {
    //   const { value } = await Preferences.get({ key: 'audioMap' });
    //   if(value) {
    //     this.audioMap = JSON.parse(value);
    //     console.log(`RETRIEVED audiomap: ${JSON.stringify(this.audioMap, null, 2)}`);
    //   }
    //   const folder = await Preferences.get({ key: 'selectedFolder' });
    //   if(folder.value) {
    //     this.selectedFolder = folder.value;
    //   }
    // },

    async loadPreferences() {
      const { value } = await Preferences.get({ key: 'configState' });
      if(value) {
        this.configState = JSON.parse(value);
        console.log(`>!> loaded config state: ${this.configState}`);
        return this.configState;
      }
      this.configState = EConfigState.INITIAL;
      return this.configState;
    }
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

    getConfigState: (state) => { return () => { return state.configState; }; },
  },
});

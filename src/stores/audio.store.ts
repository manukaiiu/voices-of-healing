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
  audioMap: TAudioMap;
}

export interface IAudioInfo {
  name: string,
  fileUri: string,
}

export type TAudioMap = Record<string, IAudioInfo>;

export const useAudioStore = defineStore('audio', {
  state: (): IAudioState => ({
    configState: EConfigState.INITIAL,
    audioMap: {},
  }),

  actions: {
    async resetStore() {
      this.configState = EConfigState.INITIAL;
      this.audioMap = {};
      await Preferences.set({ key: 'configState', value: this.configState });
      await Preferences.set({ key: 'audioMap', value: JSON.stringify({}) });
    },

    async setConfigState(configState: EConfigState) {
      this.configState = configState;
      await Preferences.set({ key: 'configState', value: configState });
    },

    async setAudioFiles(audioMap: TAudioMap) {
      this.audioMap = audioMap;
      console.log(`STORING audiomap: ${JSON.stringify(audioMap, null, 2)}`);
      await Preferences.set({ key: 'audioMap', value: JSON.stringify(audioMap) });
    },

    async loadPreferences(): Promise<EConfigState> {
      console.log(`AUDIO STORE > loading preferences`);
      const { value: state } = await Preferences.get({ key: 'configState' });
      const { value: audioMap } = await Preferences.get({ key: 'audioMap' });
      if(state && audioMap) {
        this.configState = JSON.parse(state);
        console.log(`>!> loaded config state: ${this.configState}`);
        this.audioMap = JSON.parse(audioMap);
        console.log(`>!> loaded audio map: `, this.audioMap);
        console.log(`AUDIO STORE > loading preferences DONE`);
        return this.configState;
      }
      this.configState = EConfigState.INITIAL;
      this.audioMap = {};
      console.log(`AUDIO STORE > loading empty preferences DONE`);
      return this.configState;
    }
  },

  getters: {
    getConfigState: (state) => { return () => { return state.configState; }; },

    getAudioByDate: (state) => {
      return (searchDate: Date): { fileUri: string, formattedDate: string } => {
        const month = (searchDate.getMonth() + 1).toString().padStart(2, '0');
        const day = searchDate.getDate().toString().padStart(2, '0');
        const dateKey = `${month}-${day}`;

        console.log(`Retrieving audio file name for date "${searchDate}" with key "${dateKey}" => ${state.audioMap[dateKey]}`);

        return {
          fileUri: state.audioMap[dateKey].fileUri ?? '',
          formattedDate: formatFilenameToDateString(state.audioMap[dateKey].name ?? ''),
        }
      };
    },
  },
});

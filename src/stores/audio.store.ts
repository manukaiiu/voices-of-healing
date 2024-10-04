import { formatFilenameToDateString } from '@/utils/utils';
import { defineStore } from 'pinia';
import { Preferences } from '@capacitor/preferences';
import { toRaw } from 'vue';

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
      try {
        await Preferences.set({ key: 'configState', value: this.configState });
        await Preferences.set({ key: 'audioMap', value: JSON.stringify({}) });
      } catch(e) {
        console.log('>!> ReSetting preferences produced an error: ', e);
      }
    },

    async setConfigState(configState: EConfigState) {
      this.configState = configState;
      try {
        await Preferences.set({ key: 'configState', value: configState });
      } catch(e) {
        console.log('>!> Setting preferences:configState produced an error: ', e);
      }
    },

    async setAudioFiles(audioMap: TAudioMap) {
      this.audioMap = audioMap;
      try {
        await Preferences.set({ key: 'audioMap', value: JSON.stringify(toRaw(audioMap)) });
      } catch(e) {
        console.log('>!> Setting preferences:audiomap produced an error: ', e);
      }
    },

    async loadPreferences(): Promise<EConfigState> {
      try {
        const { value: state } = await Preferences.get({ key: 'configState' });
        const { value: audioMap } = await Preferences.get({ key: 'audioMap' });
        if(state && audioMap) {
          this.configState = state as EConfigState;
          this.audioMap = {};
          this.audioMap = JSON.parse(audioMap);
          return this.configState;
        }
      } catch(e) {
        console.log('>!> Retrieving preferences produced an error: ', e);
      }

      this.configState = EConfigState.INITIAL;
      this.audioMap = {};
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

        return {
          fileUri: state.audioMap[dateKey].fileUri ?? '',
          formattedDate: formatFilenameToDateString(state.audioMap[dateKey].name ?? ''),
        }
      };
    },
  },
});

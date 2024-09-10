<template>
  <div>
    <h1>Voices of Healing</h1>
    <input
      v-if="isWeb"
      type="file"
      accept="audio/*"
      @change="handleFileSelectionWeb"
    />
    <button v-else @click="selectAudioFileNative">Select Audio File</button>

    <button @click="playAudio" :disabled="!audioFileUrl">Play Selected Audio</button>
    <button @click="stopAudio" :disabled="!audioFileUrl">Stop</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Capacitor } from '@capacitor/core';

const isWeb = Capacitor.getPlatform() === 'web';
const audioFileUrl = ref<string | null>(null);
let mediaFile: any = null;
declare let fileChooser: any;
declare let Media: any;

const handleFileSelectionWeb = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    audioFileUrl.value = URL.createObjectURL(file); // Web: Create a URL for the selected file
  }
};

const selectAudioFileNative = async () => {
  if (Capacitor.getPlatform() === 'android') {
    try {
      fileChooser.open((uri: string) => {
        console.log('File URI:', uri);
        audioFileUrl.value = uri;
      }, (error: any) => {
        console.error('File selection failed:', error);
      });
    } catch (error) {
      console.error('File selection failed:', error);
    }
  } else {
    console.error('File selection not supported on this platform');
  }
};

const playAudio = () => {
  if (isWeb) {
    if (audioFileUrl.value) {
      const audio = new Audio(audioFileUrl.value);
      audio.play();
    }
  } else {
    if (audioFileUrl.value) {
      mediaFile = new Media(audioFileUrl.value, () => {
        console.log('Audio played successfully');
      }, (err: any) => {
        console.error('Error playing audio:', err);
      });
      mediaFile.play();
    }
  }
};

// Stop the audio playback
const stopAudio = () => {
  if (mediaFile) {
    mediaFile.stop();
    mediaFile.release();
  }
};
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
}
</style>

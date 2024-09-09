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

<script>
import { Capacitor } from '@capacitor/core';
import { Media } from 'capacitor-media'; // Native media handling plugin (for Android)
import { FilePicker } from 'capacitor-file-picker'; // File picker plugin

export default {
  data() {
    return {
      isWeb: Capacitor.getPlatform() === 'web', // Check if running in the browser
      audioFileUrl: null,
      audioFile: null,
    };
  },
  methods: {
    handleFileSelectionWeb(event) {
      const file = event.target.files[0];
      if (file) {
        this.audioFileUrl = URL.createObjectURL(file); // Web: Create a URL for the selected file
      }
    },
    async selectAudioFileNative() {
      // Android: Open file picker and select the audio file
      try {
        const result = await FilePicker.pickFiles({
          types: ['audio/*'], // Allow only audio files
        });

        // File URI should now be available in result.files[0].path
        if (result.files.length > 0) {
          const fileUri = result.files[0].path; // Path of the selected file
          this.audioFileUrl = fileUri; // Set the file URL for playback
        } else {
          console.error('No file selected');
        }
      } catch (error) {
        console.error('File selection failed:', error);
      }
    },
    playAudio() {
      if (this.isWeb) {
        // Web: Use standard HTML5 Audio
        if (this.audioFileUrl) {
          this.audioFile = new Audio(this.audioFileUrl);
          this.audioFile.play();
        }
      } else {
        // Native: Use Capacitor Media plugin for native audio playback
        if (this.audioFileUrl) {
          this.audioFile = new Media(this.audioFileUrl);
          this.audioFile.play();
        }
      }
    },
    stopAudio() {
      if (this.audioFile) {
        this.audioFile.pause();
        this.audioFile.currentTime = 0; // Reset the audio to the beginning (for web)
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>

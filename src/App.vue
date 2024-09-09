<template>
  <div>
    <h1>Voices of Healing</h1>
    <input
      v-if="isWeb"
      type="file"
      accept="audio/*"
      @change="handleFileSelection"
    />
    <button @click="playAudio" :disabled="!audioFileUrl">Play Selected Audio</button>
    <button @click="stopAudio" :disabled="!audioFileUrl">Stop</button>
  </div>
</template>

<script>
import { Capacitor } from '@capacitor/core'; // Capacitor imports
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Media } from 'capacitor-media'; // Native media handling plugin (for Android)

export default {
  data() {
    return {
      isWeb: Capacitor.getPlatform() === 'web', // Check if running in the browser
      audioFileUrl: null,
      audioFile: null,
    };
  },
  methods: {
    handleFileSelection(event) {
      if (this.isWeb) {
        const file = event.target.files[0];
        if (file) {
          this.audioFileUrl = URL.createObjectURL(file); // Web: Create a URL for the selected file
        }
      } else {
        this.selectAudioFileNative(); // Native: Handle audio file selection on Android
      }
    },
    async selectAudioFileNative() {
      try {
        const result = await Filesystem.readFile({
          path: 'path_to_audio_file_in_android', // Path to the audio file on Android
          directory: Directory.External, // Adjust as needed
        });
        this.audioFileUrl = result.uri;
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Audio file not found');
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
        // Native: Use Capacitor Media plugin
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

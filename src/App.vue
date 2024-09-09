<template>
  <div id="app">
    <h1>Voices of Healing</h1>
    <input type="file" accept="audio/*" @change="handleFileSelection" />
    <button @click="playAudio" :disabled="!audioFileUrl">Play Selected Audio</button>
    <button @click="stopAudio" :disabled="!audioFileUrl">Stop</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioFileUrl: null,
      audioFile: null,
    };
  },
  methods: {
    handleFileSelection(event) {
      const file = event.target.files[0];
      if (file) {
        this.audioFileUrl = URL.createObjectURL(file); // Create a URL for the selected file
      }
    },
    playAudio() {
      if (this.audioFileUrl) {
        this.audioFile = new Audio(this.audioFileUrl);
        this.audioFile.play();
      }
    },
    stopAudio() {
      if (this.audioFile) {
        this.audioFile.pause();
        this.audioFile.currentTime = 0; // Reset the audio to the beginning
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

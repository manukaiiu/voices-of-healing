<template>
  <div class="settings-page">
    <label>Selected Folder:</label>
    <p>{{ selectedFolder }}</p>
    <button @click="selectFolder">Select Folder</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const selectedFolder = ref('/path/to/folder');

  const selectFolder = async () => {
    // Logic to open file chooser and select a folder
  };
</script>

<style scoped lang="scss">
  .settings-page {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
</style>

<template>
  <div id="app">
    <Header />
    <router-view class="content" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Header from './components/Header.vue';
  import { useAudioStore } from './stores/audio.store';

  const audioStore = useAudioStore();
  const isSettingsPage = ref(false);

  onMounted(() => {
    audioStore.loadFileMapFromPreferences(); // Load stored data into Pinia store
  });
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  body {
    margin: 0;
    height: 100vh;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

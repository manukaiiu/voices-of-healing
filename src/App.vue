<template>
  <div id="app">
    <div v-if="appLoaded">
      <Header />
      <router-view class="content" />
    </div>
    <div v-else>Waiting for Permission</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Header from './components/Header.vue';
  import { useAudioStore } from './stores/audio.store';
  import { checkStoragePermissions } from './utils/permissions';
  import { ERoutes } from './enums/route.enums';
  import { useRouter } from 'vue-router';

  const audioStore = useAudioStore();
  const appLoaded = ref(false);
  const router = useRouter();

  onMounted(async () => {
    appLoaded.value = await checkStoragePermissions();

    await audioStore.loadFileMapFromPreferences();
    const selectedFolder = audioStore.getSelectedFolder();
    if(!selectedFolder) {
      void router.push({ name: ERoutes.SETTINGS });
    }
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

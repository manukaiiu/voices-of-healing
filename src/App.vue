<template>
  <div id="app">
    <div
      v-if="appLoaded"
      class="full-page">
      <Header />
      <router-view class="content" />
    </div>
    <div v-else>Loading / Waiting for Permissions</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Header from './components/Header.vue';
  import { EConfigState, useAudioStore } from './stores/audio.store';
  import { checkStoragePermissions } from './utils/permissions';
  import { ERoutes } from './enums/route.enums';
  import { useRouter } from 'vue-router';

  const audioStore = useAudioStore();
  const appLoaded = ref(false);
  const router = useRouter();
  const configState = ref<EConfigState>(EConfigState.INITIAL);

  onMounted(async () => {
    const permissionsGranted = await checkStoragePermissions();
    if(!permissionsGranted) return;

    configState.value = await audioStore.loadPreferences();
    appLoaded.value = true;

    if(configState.value !== EConfigState.READY) {
      void router.push({ name: ERoutes.SETUP });
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
    display: flex;
    margin: 0;
    flex-direction: column;
    height: 100vh;
  }

  .full-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - var(--header-height));
  }
</style>

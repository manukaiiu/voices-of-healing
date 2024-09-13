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
  import { EConfigState, useAudioStore } from './stores/audio.store';
  import { checkStoragePermissions } from './utils/permissions';
  import { ERoutes } from './enums/route.enums';
  import { useRouter } from 'vue-router';

  const audioStore = useAudioStore();
  const appLoaded = ref(false);
  const router = useRouter();
  const configState  = ref<EConfigState>(EConfigState.INITIAL);

  onMounted(async () => {
    appLoaded.value = await checkStoragePermissions();

    const configState = await audioStore.loadPreferences();
    if(configState !== EConfigState.READY) {
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
    margin: 0;
    height: 100vh;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

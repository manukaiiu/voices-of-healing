<template>
  <div id="app">
    <Header :isSettings="isSettingsPage" @navigateBack="goBack" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Header from './components/Header.vue';

  const isSettingsPage = ref(false);

  const goBack = () => {
    // Logic to go back from the settings page
  };
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>

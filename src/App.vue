<template>
  <div id="app">
    <Header :isSettings="isSettingsPage" @navigateBack="goBack" />
    <router-view class="content" />
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

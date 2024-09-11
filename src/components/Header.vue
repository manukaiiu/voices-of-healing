<template>
  <header>
    <IconButton
      v-if="showBackButton"
      @click="goBack"
      class="back-button"
      svg-name="chevron-left"
      default-color="#FFF"
      hover-color="#DDD"/>
    <h1 class="title">{{ headerTitle }}</h1>
    <IconButton
      v-if="showSettingsIcon"
      @click="goToSettings"
      class="settings-button"
      svg-name="cog"
      default-color="#FFF"
      hover-color="#DDD"
      :animation-type="EButtonAnimation.ROTATE"/>
  </header>
</template>

<script setup lang="ts">
  import { EButtonAnimation } from '@/enums/button.enums';
  import { ERoutes } from '@/enums/route.enums';
  import { computed } from 'vue';
  import { useRoute,useRouter } from 'vue-router';
  import IconButton from './buttons/IconButton.vue';

  const route = useRoute();
  const router = useRouter();

  const props = defineProps({
    isSettings: Boolean,
  });

  const headerTitle = computed(() => route.meta.headerTitle || 'Default Title');
  const showBackButton = computed(() => route.meta.showBackButton || false);
  const showSettingsIcon = computed(() => route.meta.showSettingsButton || false);

  const goToSettings = (): void => {
    void router.push({ name: ERoutes.SETTINGS });
  };

  const goBack = () => {
    router.back();
  };
</script>

<style scoped lang="scss">
  header {
    display: grid;
    grid-template-columns: 42px 1fr 42px;
    grid-template-rows: auto;
    grid-template-areas: "back title settings";
    align-items: center;
    background-color: var(--color-header-bg);
    height: 54px;
  }

  .back-button {
    grid-area: back;
  }

  .settings-button {
    grid-area: settings;
  }

  .title {
    grid-area: title;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    margin: 0;
  }
</style>

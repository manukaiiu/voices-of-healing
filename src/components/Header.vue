<template>
  <header>
    <button v-if="isSettings" @click="$emit('navigateBack')">
      <i class="chevron-left"></i> Back
    </button>
    <IconButton
      v-else @click="goToSettings"
      svg-name="cog"
      default-color="#BB75BD"
      hover-color="#AA53AC"/>
  </header>
</template>

<script setup lang="ts">
  import { ERoutes } from '@/enums/route.enums';
  import { useRouter } from 'vue-router';
  import IconButton from './buttons/IconButton.vue';

  const { push } = useRouter();

  const props = defineProps({
    isSettings: Boolean,
  });

  const goToSettings = (): void => {
    void push({ name: ERoutes.SETTINGS });
  };
</script>

<style scoped lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #aa53ac;
    height: 30px;
  }

  .cog-icon {
    /* Styles for cog icon */
  }

  .chevron-left {
    /* Styles for back button */
  }
</style>

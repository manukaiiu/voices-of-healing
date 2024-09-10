<template>
  <header>
    <button v-if="isSettings" @click="$emit('navigateBack')">
      <i class="chevron-left"></i> Back
    </button>
    <button v-else @click="goToSettings">
      <i class="cog-icon"></i>
    </button>
  </header>
</template>

<script setup lang="ts">
  const props = defineProps({
    isSettings: Boolean,
  });

  const goToSettings = () => {
    // Logic to navigate to the settings page
  };
</script>

<style scoped lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .cog-icon {
    /* Styles for cog icon */
  }
  .chevron-left {
    /* Styles for back button */
  }
</style>

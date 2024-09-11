<template>
  <button
    class="button"
    :class="widthModeClass">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { EButtonWidthMode } from '@/enums/button.enums';
import { computed, PropType } from 'vue';

  const props = defineProps({
    text: {
      type: String,
      default: 'missing text',
    },
    widthMode: {
      type: Object as PropType<EButtonWidthMode>,
      default: EButtonWidthMode.SLIM,
    },
  });

  const widthModeClass = computed(() => {
    return `width-mode-${props.widthMode}`;
  });
</script>

<style scoped lang="scss">
  .button {
    background-color: var(--color-button-bg);
    color: #f8f8f8;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  }

  .button:hover {
    background-color: var(--color-button-bg-hover); /* Slightly lighter shade */
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  .button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(170, 83, 172, 0.3); /* Light purple shadow on focus */
  }

  .button:active {
    background-color: #8e3d90; /* Darker shade for active state */
    transform: translateY(2px); /* Button pressed down effect */
  }

  .button:disabled {
    background-color: #d4aad5; /* Lighter color for disabled state */
    cursor: not-allowed;
    opacity: 0.7;
  }

  .width-mode-slim {
    width: fit-content;
  }

  .width-mode-wide {
    width: 100%;
  }
</style>
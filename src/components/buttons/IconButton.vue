<template>
  <button
    class="button-standard"
    :class="animationClass"
    @mouseover="hovered = true"
    @mouseleave="hovered = false">
    <SvgIcon
      :svgName="svgName"
      :strokeColor="hovered ? hoverColor : defaultColor" />
  </button>
</template>

<script setup lang="ts">
  import { computed, PropType, ref } from 'vue';
  import SvgIcon from '../system/SvgIcon.vue';
  import { EButtonAnimation } from '@/enums/button.enums';

  const props = defineProps({
    svgName: {
      type: String,
      required: true,
    },
    defaultColor: {
      type: String,
      default: '#555',
    },
    hoverColor: {
      type: String,
      default: '#3498db',
    },
    animationType: {
      type: Object as PropType<EButtonAnimation>,
      default: EButtonAnimation.PULSE,
    },
  });

  const animationClass = computed(() => {
    return `${props.animationType}-animation`;
  });
  const hovered = ref(false);
</script>

<style scoped lang="scss">
  .button-standard {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    transition: transform 0.3s ease;
  }

  .pulse-animation:hover { animation: pulse 0.5s ease; }
  .rotate-animation:hover { animation: rotate 0.5s ease; }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes rotate {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(60deg); }
  }
</style>

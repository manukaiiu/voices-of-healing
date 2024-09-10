<template>
  <div>
    <component :is="iconComponent" :style="{ color: strokeColor }"></component>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';

  const props = defineProps({
    svgName: {
      type: String,
      required: true,
    },
    strokeColor: {
      type: String,
      default: '#000',
    },
  });

  const iconComponent = ref();

  const loadSvg = async () => {
    try {
      const svgModule = await import(`@/assets/icons/${props.svgName}.svg`);
      iconComponent.value = svgModule.default;
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  };

  onBeforeMount(loadSvg);
</script>

<style scoped>
  /* You can use the stroke CSS property if needed */
  svg {
    stroke: currentColor;
    fill: none;
  }
</style>

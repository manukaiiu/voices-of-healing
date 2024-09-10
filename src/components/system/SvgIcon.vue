<template>
  <div v-if="svgContent" v-html="svgContent" class="svg-icon" :style="{ color: strokeColor }"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';

  // Props for SVG name and stroke color
  const props = defineProps({
    svgName: {
      type: String,
      required: true,
    },
    strokeColor: {
      type: String,
      default: '#000', // Default stroke color (optional, for styling)
    },
  });

  // Reference for the SVG content
  const svgContent = ref<string | undefined>(undefined);

  // Import all SVGs as raw content (instead of URLs)
  const svgFiles = import.meta.glob('../../assets/icons/*.svg', { as: 'raw' });

  // Function to load the appropriate SVG content
  const loadSvg = async () => {
    try {
      const svgFile = svgFiles[`../../assets/icons/${props.svgName}.svg`];
      if (svgFile) {
        svgContent.value = await svgFile(); // Load SVG as raw content
      } else {
        console.error(`SVG file for ${props.svgName} not found.`);
        svgContent.value = undefined;
      }
    } catch (error) {
      console.error('Error loading SVG:', error);
      svgContent.value = undefined;
    }
  };

  // Watch the svgName prop for changes and reload the SVG
  watch(() => props.svgName, loadSvg);
  onMounted(loadSvg);
</script>

<style scoped>
  .svg-icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    stroke: currentColor; /* Ensure the color applies to the SVG */
  }
</style>

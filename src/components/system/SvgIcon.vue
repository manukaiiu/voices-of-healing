<template>
  <img :src="svgContent" alt="SVG Icon" class="svg-icon" />
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

  // Import all SVGs as data URIs
  const svgFiles = import.meta.glob('../../assets/icons/*.svg', { as: 'url' });

  // Function to load the appropriate SVG as a data URI
  const loadSvg = async () => {
    try {
      const svgFile = svgFiles[`../../assets/icons/${props.svgName}.svg`];
      if (svgFile) {
        svgContent.value = await svgFile(); // Load SVG as URL
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
  }
</style>

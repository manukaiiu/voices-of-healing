<template>
  <div class="button-wrapper">
    <button class="button-standard" @mouseover="hovered = true" @mouseleave="hovered = false">
      <!-- Pass the svgName and color to the SvgIcon component -->
      <SvgIcon :svgName="svgName" :strokeColor="hovered ? hoverColor : defaultColor" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SvgIcon from '../system/SvgIcon.vue';

  // Define props to receive the SVG name and allow for color customization
  const props = defineProps({
    svgName: {
      type: String,
      required: true,
    },
    defaultColor: {
      type: String,
      default: '#555', // Default icon color
    },
    hoverColor: {
      type: String,
      default: '#3498db', // Color on hover
    },
  });

  // Reactive variable to track hover state
  const hovered = ref(false);
</script>

<style scoped lang="scss">
  .button-standard {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 10px;
    transition: transform 0.3s ease;

    /* Apply rotation on hover */
    &:hover {
      transform: rotate(90deg); /* Rotate the button on hover */
    }

    &:focus {
      outline: none;
    }
  }
</style>

<script setup>
const props = defineProps([
  'color',
  'progress'
])

const backgroundStyle = computed(() => {
  return {
    backgroundColor: 'var(--'+(props.color || 'blue')+')'
  }
})

const barStyle = computed(() => {
  return {
    backgroundColor: 'var(--'+(props.color || 'blue')+')',
    width: Math.round((props.progress || 0)*100) + '%'
  }
})
</script>

<template>
  <div class="progress-bar">
    <div class="bar-background"
      :style="backgroundStyle"
    />
    <div class="bar"
      :style="barStyle"
    />
  </div>
</template>

<style scoped lang="scss">

.progress-bar {
  position: relative;
  height: 4px;
  min-width: 100px;

  .bar-background {
    opacity: 0.25;
  }

  .bar-background,
  .bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    transition: all 250ms $ease;
  }
}

</style>
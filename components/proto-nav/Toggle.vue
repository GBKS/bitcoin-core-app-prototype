<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'theme'
])

const icon = computed(() => {
  return Icons.caretLeft
})
</script>

<template>
  <button
    v-html="icon"
    title="Toggle prototype navigation"
  />
</template>

<style scoped lang="scss">

button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--neutral-9);
  background-color: var(--neutral-3);
  border-radius: var(--corner-radius-small);
  transition: all 100ms $ease;
  padding: 0 6px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background-color: var(--neutral-0);
    color: var(--neutral-9);
  }

  &.-active {
    background-color: var(--neutral-4);
    color: var(--neutral-9);
  }

  ::v-deep(svg) {
    width: 12px;
    height: 12px;
    transition: all 100ms $ease;
  }
}

</style>

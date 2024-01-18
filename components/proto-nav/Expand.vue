<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'theme'
])

const icon = computed(() => {
  return Icons.caretRight
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--neutral-9);
  transition: all 100ms $ease;
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-2);
  }

  &.-active {
    background-color: var(--neutral-4);
  }

  ::v-deep(svg) {
    width: 12px;
    height: 12px;
    transition: all 100ms $ease;
  }

  @include media-query(small) {
    position: fixed;
    bottom: 10px;
    left: 10px;
    padding: 10px;
    background-color: var(--neutral-9);
    border-radius: 100px;
    color: var(--neutral-0);
  }

  @include media-query(medium-up) {
    padding: 5px;
  }
}

</style>

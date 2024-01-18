<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'isMobile'
])

const icon = computed(() => {
  return Icons.mobile
})
</script>

<template>
  <button
    :class="isMobile ? '-active' : null"
    v-html="icon"
    title="Toggle theme"
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

  &:hover {
    background-color: var(--neutral-0);
    color: var(--neutral-9);
  }

  &.-active {
    background-color: var(--neutral-4);
    color: var(--neutral-9);
  }

  ::v-deep(svg) {
    width: 16px;
    height: 16px;
    transition: all 100ms $ease;
  }

  @include media-query(small) {
    display: none;
  }
}

</style>

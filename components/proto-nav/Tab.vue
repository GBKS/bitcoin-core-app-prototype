<script setup>
const props = defineProps([
  'info',
  'active'
])

const isActive = computed(() => {
  return props.active == props.info.id
})

const classObject = computed(() => {
  const c = ['-body-8']

  if(isActive.value) {
    c.push('-active')
  }

  return c.join(' ')
})
</script>

<template>
  <button
    :class="classObject"
    :aria-pressed="isActive"
  >
    {{ info.name }}
  </button>
</template>

<style scoped lang="scss">

button {
  flex-grow: 1;
  padding: 5px 10px;
  background-color: var(--neutral-3);
  border-radius: var(--corner-radius-small);
  transition: all 100ms $ease;
  color: var(--neutral-7);
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-0);
    color: var(--neutral-9);
  }

  &.-active {
    background-color: var(--neutral-4);
    color: var(--neutral-9);
  }
}

</style>

<script setup>
const props = defineProps([
  'id',
  'info'
])

const classObject = computed(() => {
  const c = ['tab', '-title-6']

  return c.join(' ')
})
</script>

<template>
  <NuxtLink
    :class="classObject"
    :to="info.to"
  >
    <span>{{ info.name }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">

.tab {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--neutral-7);
  transition: all 150ms $ease;
  position: relative;
  cursor: pointer;

  &:before {
    display: block;
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--primary);
    opacity: 0;
  }

  &:hover {
    color: var(--neutral-9);
    background-color: var(--neutral-1);
  }

  &.-active,
  &.router-link-active {
    color: var(--primary);

    &:before {
      opacity: 1;
    }
  }
}

</style>

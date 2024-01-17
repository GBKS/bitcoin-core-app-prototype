<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'id',
  'info',
  'activeId'
])

const classObject = computed(() => {
  const c = ['option']

  if(props.id == props.activeId) {
    c.push('-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return Icons[props.info.icon]
})
</script>

<template>
  <NuxtLink
    :class="classObject"
    :to="info.to"
    v-html="Icons[info.icon]"
  />
</template>

<style scoped lang="scss">

.option {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: var(--neutral-7);
  cursor: pointer;
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

  ::v-deep(svg) {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  &:hover {
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

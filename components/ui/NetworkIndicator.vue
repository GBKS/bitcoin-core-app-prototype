<script setup>
const props = defineProps([
  'label',
  'color',
  'small'
])

const classObject = computed(() => {
  const c = [
    'network-indicator',
    '-'+(props.small ? 'small' : 'default')
  ]

  return c.join(' ')
})

const styleObject = computed(() => {
  return {
    backgroundColor: 'var(--'+props.color+')'
  }
})
</script>

<template>
  <p
    :class="classObject"
    :style="styleObject"
  >{{ label }}</p>
</template>

<style scoped lang="scss">

.network-indicator {
  color: white;
  border-radius: 3px;

  &.-small {
    font-size: 11px;
    padding: 1px 4px 2px;
  }

  &.-default {
    font-size: 15px;
    padding: 2px 7px;
  }
}

</style>
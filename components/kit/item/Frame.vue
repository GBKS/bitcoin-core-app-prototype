<script setup>
const props = defineProps([
  'url',
  'to',
  'frame',
  'active'
])

const emit = defineEmits(['select'])

const classObject = computed(() => {
  const c = [
    'item'
  ]

  if(props.frame) c.push('-frame')
  if(props.active) c.push('-active')

  return c.join(' ')
})
</script>

<template>
  <NuxtLink
    v-if="to || url"
    :class="classObject"
    :to="to || url"
    :target="url ? '_blank' : null"
  >
    <slot></slot>
  </NuxtLink>
  <div
    v-if="!(to || url)"
    :class="classObject"
    @click="emit('select')"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

.item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 15px 0;
  text-decoration: none;

  &.-frame {
    border: 1px solid var(--neutral-4);
    border-radius: var(--corner-radius-big);
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;

    &.-active {
      border-color: var(--primary);
    }
  }

  &:is(a) {
    &:hover {
      ::v-deep(h6),
      ::v-deep(p),
      ::v-deep(.right) {
        color: var(--primary);
      }
    }
  }

  &:not(.-frame) {
    border-top: 1px solid var(--neutral-2);

    &:first-child {
      border-top-width: 0;
    }
  }
}

</style>

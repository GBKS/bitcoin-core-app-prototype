<script setup>
const props = defineProps([
  'id',
  'info',
  'activeId',
  'indent'
])

const isActive = computed(() => {
  return props.activeId == props.id
})

const classObject = computed(() => {
  const c = ['item']

  if(isActive.value) {
    c.push('-active')
  }

  if(props.indent) {
    c.push('-indent')
  }

  if(props.info.divider) {
    c.push('-divider')
  }

  return c.join(' ')
})
</script>

<template>
  <NuxtLink
    :class="classObject"
    :to="info.to"
  >
    {{ info.name }}
  </NuxtLink>
</template>

<style scoped lang="scss">

.item {
  padding: 5px 10px;
  text-align: left;
  border-radius: var(--corner-radius-small);
  transition: all 100ms $ease;
  color: var(--neutral-9);
  text-decoration: none;
  font-size: 12px;

  &:hover {
    background-color: var(--neutral-1);
  }

  &.-active {
    background-color: var(--neutral-4);
  }

  &.-indent {
    padding-left: 30px;
  }

  &.-divider {
    border-top: 1px solid var(--neutral-4);
  }

  @include media-query(small) {
    font-size: 15px;
  }
}

</style>

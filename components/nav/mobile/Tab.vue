<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'id',
  'info',
  'activeId'
])

const classObject = computed(() => {
  const c = ['tab']

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
  >
    <div 
      class="icon" 
      v-html="icon"
    />
    <p class="-title-8">{{ info.name }}</p>
  </NuxtLink>
</template>

<style scoped lang="scss">

.tab {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  text-decoration: none;

  p {
    color: var(--neutral-7);
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: var(--neutral-7);

    ::v-deep(svg) {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }

  &:hover {
    background-color: var(--neutral-1);
  }

  &.-active,
  &.router-link-active {
    p {
      color: var(--primary);
    }

    .icon {
      color: var(--primary);
    }
  }
}

</style>

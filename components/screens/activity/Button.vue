<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'icon',
  'label',
  'disabled',
  'to'
])

const emit = defineEmits(['click'])

const icon = computed(() => {
  return Icons[props.icon]
})

const classObject = computed(() => {
  const c = ['activity-button']

  if(props.disabled) c.push('-disabled')

  return c.join(' ')
})
</script>

<template>
  <NuxtLink
    v-if="!props.disabled"
    :class="classObject"
    :to="to"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <p>{{ label }}</p>
  </NuxtLink>
  <div
    v-if="props.disabled"
    :class="classObject"
    title="You cannot send from a view-only wallet"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <p>{{ label }}</p>
  </div>
</template>

<style scoped lang="scss">

.activity-button {
  appearance: none;
  border-width: 0;
  // transition: color 100ms $ease;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--neutral-7);
  box-sizing: border-box;
  text-decoration: none;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid var(--neutral-4);
    border-radius: 100px;
    transition: border-color 100ms $ease;

    ::v-deep(svg) {
      width: 16px;
      height: 16px;
      transition: color 100ms $ease;
    }
  }

  p {
    transition: all 100ms $ease;
  }

  &.-disabled {
    opacity: 0.25;
  }

  &:not(.-disabled) {
    &:hover {
      color: var(--primary);

      .icon {
        border-color: var(--primary);
      }

      p {
        color: var(--primary);
      }
    }
  }
}

</style>

<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'icon',
  'iconPosition', // left, right
  'label',
  'theme', // filled, outline, free
  'size', // small, medium, big
  'disabled',
  'to'
])

const emit = defineEmits(['click'])

const classObject = computed(() => {
  const c = [
    'kit-button',
    '-' + (props.theme || 'filled'),
    '-' + (props.size || 'medium')
  ]

  if(props.icon) {
    c.push('-icon')

    if(!props.label) c.push('-icon-only')

    c.push('-' + (props.iconPosition || 'right'))
  }

  return c.join(' ')
})

const type = computed(() => {
  return props.to ? 'NuxtLink' : 'button'
})

const content = computed(() => {
  let result = ''

  if(props.icon && Icons[props.icon] && props.iconPosition == 'left') {
    result += Icons[props.icon]
  }

  if(props.label) {
    result += props.label
  }

  if(props.icon && Icons[props.icon] && props.iconPosition != 'left') {
    result += Icons[props.icon]
  }

  return result
})

</script>

<template>
  <NuxtLink
    v-if="to"
    :class="classObject"
    :disabled="disabled"
    :aria-label="label"
    :to="to"
    v-html="content"
  />
  <button
    v-if="!to"
    :class="classObject"
    :disabled="disabled"
    :aria-label="label"
    v-html="content"
    @click="emit('click')"
  />
</template>

<style scoped lang="scss">

.kit-button {
  appearance: none;
  border-width: 0;
  transition: all 150ms $ease;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: var(--corner-radius);
  color: white;
  box-sizing: border-box;
  text-decoration: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  // Styles
  &.-filled {
    background-color: var(--primary);

    &:disabled {
      background-color: var(--neutral-4);
    }
  }

  &.-outline {
    background-color: transparent;
    border: 1px solid var(--neutral-5);
    color: var(--primary);

    &:hover {
      border-color: var(--primary);
      color: var(--primary);
    }
  }

  &.-free {
    background-color: transparent;
    color: var(--primary);

    &.-icon {
      color: var(--primary);
    }

    &:hover {
      background-color: var(--neutral-2);
      color: var(--primary);
    }
  }

  // Sizes
  &.-small {
    height: 30px;
    font-size: 15px;

    &:not(.-icon-only) {
      padding-left: 15px;
      padding-right: 15px;
    }

    &.-icon {
      ::v-deep(svg) {
        width: 16px;
        height: 16px;
      }
    }

    &.-icon-only {
      width: 30px;
    }
  }

  &.-medium {
    height: 46px;
    font-size: 18px;

    &:not(.-icon-only) {
      padding-left: 20px;
      padding-right: 20px;
    }

    &.-icon {
      ::v-deep(svg) {
        width: 20px;
        height: 20px;
      }
    }

    &.-icon-only {
      width: 46px;
    }
  }

  &.-big {
    height: 60px;
    font-size: 21px;

    &:not(.-icon-only) {
      padding-left: 20px;
      padding-right: 20px;
    }

    &.-icon {
      ::v-deep(svg) {
        width: 20px;
        height: 20px;
      }
    }

    &.-icon-only {
      width: 60px;
    }
  }
}

</style>

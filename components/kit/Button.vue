<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'id',
  'class',
  'icon',
  'iconPosition', // left, right
  'label',
  'title',
  'active',
  'theme', // filled, outline, free, free-subtle
  'size', // small, medium, big
  'disabled',
  'to',
  'ariaLabel'
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

  if(props.active) c.push('-active')
  if(props.disabled) c.push('-disabled')

  let result = c.join(' ')

  if(props.class) result += ' ' + props.class

  return result
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
    :id="id"
    :class="classObject"
    :disabled="disabled"
    :aria-label="ariaLabel || label"
    :to="to"
    :title="title"
    v-html="content"
  />
  <button
    v-if="!to"
    :id="id"
    :class="classObject"
    :disabled="disabled"
    :aria-label="ariaLabel || label"
    :title="title"
    v-html="content"
    @click="emit('click', $event)"
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

  &:not(.-disabled) {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid var(--purple);
  }

  // Styles
  &.-filled {
    background-color: var(--primary);

    &.-disabled {
      background-color: var(--neutral-4);
      color: rgba(255, 255, 255, .25);
    }
  }

  &.-outline {
    background-color: transparent;
    border: 1px solid var(--neutral-5);
    color: var(--neutral-9);
  }

  &.-free {
    color: var(--primary);

    &.-icon {
      color: var(--primary);
    }

    &:disabled {
      color: var(--neutral-4);
    }
  }

  &.-free-subtle {
    color: var(--neutral-7);

    &.-icon {
      color: var(--neutral-7);
    }
  }

  &.-free,
  &.-free-subtle {
    background-color: transparent;

    &:active {
      background-color: var(--neutral-1);
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
        width: 30px;
        height: 30px;
      }
    }

    &.-icon-only {
      width: 60px;
    }
  }

  @include container(medium-up) {
    &.-free,
    &.-free-subtle {
      &:not(:disabled):hover {
        background-color: var(--neutral-1);
        color: var(--primary);
      }
    }

    &.-outline {
      &:not(:disabled):hover {
        border-color: var(--primary);
        color: var(--primary);
      }
    }
  }
}

</style>

<script setup>
const props = defineProps([
  'active',
  'label',
  'size',
  'disabled',
  'tag'
])

const classObject = computed(() => {
  const c = [
    'toggle',
    '-' + (props.size || 'big')
  ]

  if(props.active) c.push('-active')

  return c.join(' ')
})

const componentTag = computed(() => {
  return props.tag || 'button'
})
</script>

<template>
  <component
    :is="componentTag"
    :class="classObject"
    :disabled="disabled"
    :aria-label="label"
    :aria-pressed="active"
  />
</template>

<style lang="scss" scoped>

.toggle {
  position: relative;
  appearance: none;
  border-radius: 100px;
  background-color: var(--neutral-4);
  border-width: 0;
  transition: all 150ms $ease;
  cursor: pointer;

  &:after {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    content: '';
    border-radius: 100px;
    background-color: white;
    transition: all 150ms $ease;
  }

  &.-active {
    background-color: var(--primary);

    &:after {
      transform: translateX(10px);
    }
  }

  &.-tiny {
    width: 40px;
    height: 24px;

    &:after {
      top: 4px;
      left: 4px;
      width: 16px;
      height: 16px;
      box-shadow: 0 5px 10px 0 rgba(black, 0.25)
    }

    &.-active {
      &:after {
        transform: translateX(17px);
      }
    }
  }

  &.-small {
    width: 45px;
    height: 28px;

    &:after {
      top: 4px;
      left: 4px;
      width: 20px;
      height: 20px;
      box-shadow: 0 5px 10px 0 rgba(black, 0.25)
    }

    &.-active {
      &:after {
        transform: translateX(17px);
      }
    }
  }

  &.-big {
    width: 60px;
    height: 36px;

    &:after {
      top: 4px;
      left: 4px;
      width: 28px;
      height: 28px;
      box-shadow: 0 5px 10px 0 rgba(black, 0.25)
    }

    &.-active {
      &:after {
        transform: translateX(24px);
      }
    }
  }
}

</style>

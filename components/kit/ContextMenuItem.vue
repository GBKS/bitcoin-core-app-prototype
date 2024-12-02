<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'id',
  'info'
])

const emit = defineEmits(['select'])

const label = computed(() => {
  let result = '<span class="label">' + props.info.label + '</span>'

  if(props.info.icon) {
    result = Icons[props.info.icon] + result
  } else if(props.info.toggle !== undefined) {
    result += '<span class="toggle"></span>'
  }

  console.log('fdshkfhjkds', props.info.toggle)

  return result
})

const classObject = computed(() => {
  const c = ['context-menu-item', '-body-6', '-body-5-mobile']

  if(props.info.indent) {
    c.push('-indent')
  } else if(props.info.toggle === true) {
    c.push('-toggle-active')
  }

  return c.join(' ')
})

function select() {
  emit('select', props.id)
}
</script>

<template>
  <button 
    :class="classObject"
    @click="select"
  >
    <span
      v-if="info.icon" 
      class="icon"
      v-html="Icons[info.icon]"
    />
    <span class="label">{{ props.info.label }}</span>
    <span
      v-if="info.toggle !== undefined"
      class="toggle"
    />
  </button>
</template>

<style scoped lang="scss">

.context-menu-item {
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 5px 8px;
  color: var(--neutral-7);

  .icon {
    line-height: 0;

    ::v-deep(svg) {
      width: 14px;
      height: 14px;
    }
  }

  .label {
    flex-grow: 1;
    text-align: left;
  }

  ::v-deep(.toggle) {
    position: relative;
    width: 40px;
    height: 24px;
    background-color: var(--neutral-6);
    border-radius: 100px;
    transition: background-color 150ms $ease;
    align-self: flex-end;

    &:after {
      position: absolute;
      display: block;
      content: '';
      top: 4px;
      left: 4px;
      width: 16px;
      height: 16px;
      background-color: white;
      border-radius: 100px;
      box-shadow: 0 5px 10px 0 rgba(black, 0.25);
      transition: left 150ms $ease;
    }
  }

  &.-indent {
    padding-left: 29px;
  }

  &.-toggle-active {
    ::v-deep(.toggle) {
      background-color: var(--primary);

      &:after {
        left: 20px;
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    border-radius: var(--corner-radius);
    cursor: pointer;

    &:hover {
      color: var(--neutral-9);
      background-color: var(--neutral-2);
    }
  }
}

</style>
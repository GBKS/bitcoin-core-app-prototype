<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'id',
  'info'
])

const emit = defineEmits(['select'])

const label = computed(() => {
  let result = props.info.label

  if(props.info.icon) {
    result = Icons[props.info.icon] + props.info.label
  }

  return result
})

const classObject = computed(() => {
  const c = ['context-menu-item', '-body-6', '-body-5-mobile']

  if(props.info.indent) {
    c.push('-indent')
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
    v-html="label"
    @click="select"
  />
</template>

<style scoped lang="scss">

.context-menu-item {
  display: flex;
  gap: 7px;
  align-items: center;
  padding: 5px 8px;
  color: var(--neutral-7);

  ::v-deep(svg) {
    width: 14px;
    height: 14px;
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
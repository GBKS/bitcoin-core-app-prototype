<script setup>
const props = defineProps([
  'address',
  'elide',
  'tag'
])

const content = computed(() => {
  let result = props.address

  const bits = chunkAddress(result).split(' ')

  if(props.elide) {
    // Only keep the first and last two chunks
    result = '<span>' + bits.slice(0, 2).join('</span> <span>') + '</span> ... <span>' + bits.slice(-2).join('</span> <span>') + '</span>'
  } else {
    result = '<span>' + bits.join('</span> <span>') + '</span>'
  }

  return result
})

function chunkAddress(value) {
  let newValue = value.replace(/\s/g, '');
  let formattedValue = '';
  let cursorOffset = 0;

  for (let i = 0; i < newValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
      }
      formattedValue += newValue[i];
  }

  return formattedValue.trim();
}

const classObject = computed(() => {
  const c = [
    'address',
    '-'+(props.elide ? 'short' : 'long')
  ]

  return c.join(' ')
})

const componentType = computed(() => {
  return props.tag || 'p'
})
</script>

<template>
  <component
    :class="classObject"
    :is="componentType"
    v-html="content"
  />
</template>

<style scoped lang="scss">

p.address {
  color: var(--neutral-7);
  font-family: monospace;
  text-wrap: balance;

  ::v-deep(span) {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-last-child(2),
    &:nth-last-child(1) {
      color: var(--neutral-9);
    }
  }
}

</style>
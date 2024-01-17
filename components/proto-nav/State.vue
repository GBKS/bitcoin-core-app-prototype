<script setup>
const props = defineProps([
  'info'
])

const code = ref(null)

const formattedData = computed(() => {
  const result = JSON.stringify(props.info, undefined, 2)

  return result
})

function blur() {
  console.log('blur', code.value)

  const newState = code.value.innerHTML
  try {
    const newData = JSON.parse(newState)

    window.emitter.emit('update-state', newData)
  } catch(error) {
    console.log('State.blur invalid data', newState)
  }
}
</script>

<template>
  <div class="state">
    <pre
      ref="code"
      class="-body-7" 
      contenteditable
      @blur="blur"
    >{{ formattedData }}</pre>
  </div>
</template>

<style scoped lang="scss">

.state {
  min-width: 0;
  flex-grow: 1;
  background-color: var(--neutral-2);

  pre {
    overflow-x: auto;
    display: block;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    min-width: 0; // CSS fix for pre tag
    color: var(--neutral-7);
  }
}

</style>

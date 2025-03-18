<script setup>
const props = defineProps([
  'label',
  'text',
  'placeholder'
])

const emit = defineEmits(['change'])

const textValue = ref('')
const hasFocus = ref(false)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

watch(() => props.text, (newValue) => {
  textValue.value = newValue
})

function changeValue(event) {
  emit('change', event.target.value)
}

const hasContent = computed(() => {
  return textValue.value.length > 0
})

const classObject = computed(() => {
  const c = ['receive-note-input']

  if(hasContent.value) {
    c.push('-has-content')
  }

  if(hasFocus.value) {
    c.push('-has-focus')
  }

  return c.join(' ')
})

function setFocus() {
  hasFocus.value = true
}

function removeFocus() {
  hasFocus.value = false
}

onBeforeMount(() => {
  textValue.value = props.text
})
</script>

<template>
  <div :class="classObject">
    <label
      class="-body-5"
      :for="uniqueId"
    >{{ label }}</label>
    <input
      class="-body-5"
      type="text"
      :id="uniqueId"
      :value="textValue"
      :placeholder="placeholder"
      @focus="setFocus"
      @blur="removeFocus"
      @change="changeValue"
    />
  </div>
</template>

<style scoped lang="scss">

.receive-note-input {
  display: flex;
  align-items: stretch;
  gap: 5px;
  padding: 13px 0;

  label {
    width: 110px;
    color: var(--neutral-9);
    transition: all 150ms $ease;
  }

  input {
    appearance: none;
    border-width: 0;
    background-color: transparent;
    padding: 0;
    color: var(--neutral-9);
    transition: all 150ms $ease;
    flex-grow: 1;

    &::placeholder {
      color: var(--neutral-5);
    }

    &:focus-visible {
      outline: none;
    }
  }

  &.-has-content,
  &.-has-focus {
    label {
      color: var(--neutral-7);
    }
  }

  &:hover {
    input {
      color: var(--primary);
    }
  }

  @include container(small) {
    flex-direction: column;
  }

  @include container(medium-up) {
    
  }
}

</style>

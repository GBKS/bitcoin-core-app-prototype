<script setup>
const props = defineProps([
  'label',
  'value',
  'placeholder',
  'disabled',
  'error',
  'layout'
])

const emit = defineEmits(['change', 'validate'])

const inputElement = ref(null)
const valueModel = ref('')
const hasFocus = ref(false)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

watch(() => props.value, (newValue) => {
  valueModel.value = newValue
})

function changeValue(event) {
  emit('change', event.target.value)
}

const hasContent = computed(() => {
  return valueModel.value?.length > 0
})

const classObject = computed(() => {
  const c = [
    'proxy-settings-input',
    '-' + (props.layout || 'horizontal')
  ]

  if(hasContent.value) {
    c.push('-has-content')
  }

  if(hasFocus.value) {
    c.push('-has-focus')
  }

  if(props.error) {
    c.push('-has-error')
  }

  if(props.disabled) {
    c.push('-disabled')
  }

  return c.join(' ')
})

function setFocus() {
  hasFocus.value = true
}

function removeFocus() {
  hasFocus.value = false

  console.log('removeFocus', inputElement.value.validity)

  emit('validate', valueModel.value)
}

onBeforeMount(() => {
  valueModel.value = props.value
})
</script>

<template>
  <div :class="classObject">
    <div class="content">
      <label
        class="-body-5"
        :for="uniqueId"
      >{{ label }}</label>
      <input
        ref="inputElement"
        class="-body-5"
        type="text"
        :id="uniqueId"
        :value="valueModel"
        :placeholder="placeholder"
        :disabled="disabled"
        pattern="^((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]):([0-9]{1,5})$"
        @focus="setFocus"
        @blur="removeFocus"
        @change="changeValue"
      />
    </div>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss">

.proxy-settings-input {
  border-top: 1px solid var(--neutral-2);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  padding: 10px 0;

  .content {
    display: flex;

    label {
      color: var(--neutral-7);
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
  }

  .error {
    color: var(--red);
  }

  &.-horizontal {
    .content {
      input {
        text-align: right;
      }
    }
  }

  &.-vertical {
    .content {
      flex-direction: column;
    }
  }

  &.-disabled {
    .content {
      label,
      input,
      input::placeholder {
        color: var(--neutral-4);
      }
    }

    .error {
      color: var(--neutral-4);
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

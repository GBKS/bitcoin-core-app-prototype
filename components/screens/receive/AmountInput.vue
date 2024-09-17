<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'label',
  'amount',
  'unit'
])

const emit = defineEmits(['change', 'changeUnit'])

const amountValue = ref(null)
const unitValue = ref('bitcoin')
const hasFocus = ref(false)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

watch(() => props.amount, (newValue) => {
  amountValue.value = newValue
})

watch(() => props.unit, (newValue) => {
  unitValue.value = newValue
})

const placeholder = computed(() => {
  return props.unit == 'bitcoin' ? '0.00 000 000' : '0'
})

function changeValue(event) {
  emit('change', event.target.value)
}

function toggleUnit() {
  unitValue.value = unitValue.value == 'bitcoin' ? 'sats' : 'bitcoin'
  emit('changeUnit', unitValue.value)
}

const toggleLabel = computed(() => {
  return unitValue.value == 'bitcoin' ? '₿' : 'sats'
})

function setFocus() {
  hasFocus.value = true
}

function removeFocus() {
  hasFocus.value = false
}

const hasContent = computed(() => {
  return amountValue.value !== null
})

const classObject = computed(() => {
  const c = ['receive-amount-input']

    if(hasContent.value) {
    c.push('-has-content')
    }

    if(hasFocus.value) {
    c.push('-has-focus')
    }

  return c.join(' ')
})

const step = computed(() => {
  return unitValue.value == 'bitcoin' ? '0.00000001' : '1'
})

onBeforeMount(() => {
    amountValue.value = props.amount
    unitValue.value = props.unit
})
</script>

<template>
    <div :class="classObject">
      <div class="left">
        <label
            class="-body-5"
            :for="uniqueId"
        >{{ label }}</label>
        <input
            class="-body-5"
            type="number"
            :id="uniqueId"
            :value="amountValue"
            :placeholder="placeholder"
            :step="step"
            @focus="setFocus"
            @blur="removeFocus"
            @change="changeValue"
        />
      </div>
      <button
        class="toggle -body-5"
        @click="toggleUnit"
      >
        {{ toggleLabel }}
        <div v-html="Icons.flip" />
      </button>
    </div>
</template>

<style scoped lang="scss">

.receive-amount-input {
    display: flex;
    gap: 5px;
    padding: 10px 0;

    .left {
      display: flex;
      align-items: stretch;
      gap: 5px;
      flex-basis: 10px;
      flex-grow: 1;

      label {
        color: var(--neutral-9);
        width: 110px;
      }

      input {
        appearance: none;
        border-width: 0;
        background-color: transparent;
        padding: 0;
        -moz-appearance: textfield;
        color: var(--neutral-9);

        &::placeholder {
          color: var(--neutral-5);
        }

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &:focus-visible {
            outline: none;
        }
      }

      &:hover {
        input {
          color: var(--primary);
        }
      }
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--neutral-7);

      > div {
        line-height: 0;

        ::v-deep(svg) {
          width: 18px;
          height: 18px;
        }
      }

      &:hover {
        color: var(--primary);
        cursor: pointer;
      }
    }

    &.-has-content,
    &.-has-focus {
        .left label {
            color: var(--neutral-7);
        }
    }
}

</style>

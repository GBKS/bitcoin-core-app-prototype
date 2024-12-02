<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'label',
  'amount'
])

const emit = defineEmits(['change'])

const stateStore = useStateStore()
const amountValue = ref(null)
const hasFocus = ref(false)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

watch(() => props.amount, (newValue) => {
  updateAmountValue(newValue)
})

watch(() => stateStore.balanceDisplayMode, (newValue) => {
  updateAmountValue(props.amount)
})

function updateAmountValue(newValue) {
  const adjustedValue = stateStore.balanceDisplayMode == 'satoshi' ? newValue : newValue / 100000000
  amountValue.value = adjustedValue
}

const placeholder = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? '0' : '0.00 000 000'
})

function changeValue(event) {
  emit('change', parseFloat(event.target.value))
}

function toggleUnit() {
  stateStore.balanceDisplayMode = stateStore.balanceDisplayMode == 'satoshi' ? 'bitcoin' : 'satoshi'
}

const toggleLabel = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? 'sats' : '₿' 
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
  return stateStore.balanceDisplayMode == 'satoshi' ? '1' : '0.00000001'
})

onBeforeMount(() => {
    amountValue.value = props.amount
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
        class="toggle"
        @click="toggleUnit"
      >
        <p class="-body-5">{{ toggleLabel }}</p>
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
      min-width: 0;

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
        box-sizing: border-box;
        min-width: 0;
        flex: 1;

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
      flex: 0 0 auto;
      padding: 3px 9px;
      border-radius: 5px;

      > * {
        flex-shrink: 0;
      }

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
        background-color: var(--neutral-2);

        p {
          color: var(--primary);
        }
      }
    }

    &.-has-content,
    &.-has-focus {
        .left label {
            color: var(--neutral-7);
        }
    }

    @include container(small) {
      .left {
        flex-direction: column;
      }
    }

    @include container(medium-up) {
      
    }
}

</style>

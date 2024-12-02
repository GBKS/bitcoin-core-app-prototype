<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'feeRate'
])

const emit = defineEmits(['change'])

const stateStore = useStateStore()
const feeRateValue = ref(null)
const hasFocus = ref(false)

watch(() => props.feeRate, (newValue) => {
  feeRateValue.value = newValue
})

const placeholder = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? '0': '0.00 000 000'
})

const step = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? 1: 0.00000001
})

function changeValue(event) {
  emit('change', parseFloat(event.target.value))
}

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
  const c = ['send-fee-input']

  if(hasContent.value) {
    c.push('-has-content')
  }

  if(hasFocus.value) {
    c.push('-has-focus')
  }

  return c.join(' ')
})

const formattedFee = computed(() => {
  let amount = 50 * props.feeRate

  let formattedAmount = amount
  if(stateStore.balanceDisplayMode != 'satoshi') {
    formattedAmount = formattedAmount / 100000000

    let amountStringLength = (amount + '').length
    if(amount >= 1000) amountStringLength++
    if(amount >= 1000000) amountStringLength++

    // Format amount to 8 decimals with a thin space between the second and third numbers, and another thin space between the fifth and sixth numbers
    formattedAmount = formattedAmount.toFixed(8).replace(/(\d{1,2})(\d{3})(\d{3})/, '$1\u2009$2\u2009$3')

    // Wrap the last 3 characters in a span with a class to style them differently
    formattedAmount = '<span class="fee-decimals">' + formattedAmount.slice(0, -amountStringLength) + '</span>' + formattedAmount.slice(-amountStringLength)
  }

  const amountString = formattedAmount + ' ' + (stateStore.balanceDisplayMode == 'satoshi' ? 'sats' : '₿')

  return amountString + ', ' + duration.value
})

const duration = computed(() => {
  let minutes = Math.max(10, 100 - props.feeRate*5)
  return minutes + ' minute' + (minutes == 1 ? '' : 's')
})

onBeforeMount(() => {
  feeRateValue.value = props.feeRate
})
</script>
 
<template>
  <div class="send-fee-input">
    <div class="rate-input">
      <label
        class="-body-5"
        for="fee-rate-input-field"
      >Fee rate</label>
      <input
        class="-body-5"
        type="number"
        id="fee-rate-input-field"
        :value="feeRateValue"
        :placeholder="placeholder"
        :step="step"
        @focus="setFocus"
        @blur="removeFocus"
        @change="changeValue"
      />
      <p class="-body-5">sats/vbyte</p>
    </div>
    <div class="fee-display">
      <h4 class="-body-5">Fee</h4>
      <p class="-body-5" v-html="formattedFee" />
    </div>
  </div>
</template>

<style scoped lang="scss">

.send-fee-input {
  display: flex;
  flex-direction: column;

  .rate-input {
    display: flex;
    align-items: stretch;
    gap: 5px;
    padding: 10px 0;
    border-top: 1px solid var(--neutral-3);

    label {
      color: var(--neutral-9);
      width: 110px;
    }

    input {
      flex-grow: 1;
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
  
  .fee-display {
    display: flex;
    align-items: stretch;
    gap: 5px;
    padding: 10px 0;
    border-top: 1px solid var(--neutral-3);

    h4 {
      color: var(--neutral-9);
      width: 110px;
    }
  }
}

</style>

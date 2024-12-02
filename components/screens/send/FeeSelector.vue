<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'feeSpeed'
])

const emit = defineEmits([
  'change'
])

const stateStore = useStateStore()

function previousFeeSpeed() {
  let newFeeSpeed = 'default'

  switch(props.feeSpeed) {
    case 'fast':
      newFeeSpeed = 'default'
      break
    case 'default':
      newFeeSpeed = 'slow'
      break
  }

  emit('change', newFeeSpeed)
}

function nextFeeSpeed() {
  let newFeeSpeed = 'default'

  switch(props.feeSpeed) {
    case 'default':
      newFeeSpeed = 'fast'
      break
    case 'fast':
      newFeeSpeed = 'slow'
      break
  }

  emit('change', newFeeSpeed)
}

const formattedFee = computed(() => {
  let amount = 500
  switch(props.feeSpeed) {
    case 'fast':
      amount = 1000
      break
    case 'slow':
      amount = 250
      break
  }

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

  const amountString = formattedAmount + ' ' + (stateStore.balanceDisplayMode != 'satoshi' ? '₿' : 'sats')

  return amountString + ', ' + duration.value
})

const formattedFeeSpeed = computed(() => {
  return props.feeSpeed == 'default' ? 'Default' : props.feeSpeed.charAt(0).toUpperCase() + props.feeSpeed.slice(1)
})

const duration = computed(() => {
  let result = '~1 hour'
  switch(props.feeSpeed) {
    case 'fast':
      result = '~30 minutes'
      break
    case 'slow':
      result = '~3 hours'
      break
  }
  return result
})
</script>

<template>
  <div class="fee-selector">
    <h4 class="-body-5">Fee</h4>
    <p class="-body-5" v-html="formattedFee" />
    <button
      class="toggle"
      @click="nextFeeSpeed"
    >
      <p class="-body-5">{{ formattedFeeSpeed }}</p>
      <div v-html="Icons.flip" />
    </button>
  </div>
</template>

<style scoped lang="scss">

.fee-selector {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--neutral-3);

  h4 {
    width: 120px;
  }

  p {
    &:first-of-type {
      flex-basis: 10%;
      flex-grow: 1;
      color: var(--neutral-9);

      ::v-deep(span) {
        color: var(--neutral-7);
      }
    }

    &:nth-of-type(2) {
      color: var(--neutral-7);
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

  @include container(small) {
    flex-wrap: wrap;

    h4 {
      flex-basis: 100%;
    }
  }

  @include container(medium-up) {
    
  }
}

</style>

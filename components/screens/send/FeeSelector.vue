<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'feeSpeed',
  'transactionSize'
])

const emit = defineEmits([
  'change',
  'toggleFeeOptions',
  'setToggleElement'
])

const stateStore = useStateStore()
const toggleElement = ref(null)

function toggleOptions() {
  emit('toggleFeeOptions', toggleElement.value)
}

const feeAmount = computed(() => {
  let amount = 500
  switch(props.feeSpeed) {
    case 'fast':
      amount = 1000
      break
    case 'slow':
      amount = 250
      break
  }

  amount *= props.transactionSize

  return amount
})

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

  amount *= props.transactionSize

  let formattedAmount = amount
  if(stateStore.balanceDisplayMode != 'satoshi') {
    formattedAmount = formattedAmount / 100000000

    // console.log('formattedAmount', amount, formattedAmount)

    if(amount == 0) {
      formattedAmount = '<span class="fee-decimals">' + formattedAmount.toFixed(8).replace(/(\d{1,2})(\d{3})(\d{3})/, '$1\u2009$2\u2009$3') + '</span>'
    } else {
      let amountStringLength = (amount + '').length
      if(amount >= 1000) amountStringLength++
      if(amount >= 1000000) amountStringLength++

      // Format amount to 8 decimals with a thin space between the second and third numbers, and another thin space between the fifth and sixth numbers
      formattedAmount = formattedAmount.toFixed(8).replace(/(\d{1,2})(\d{3})(\d{3})/, '$1\u2009$2\u2009$3')

      // Wrap the last 3 characters in a span with a class to style them differently
      formattedAmount = '<span class="fee-decimals">' + formattedAmount.slice(0, -amountStringLength) + '</span>' + formattedAmount.slice(-amountStringLength)
    }
  }

  const amountString = formattedAmount + ' ' + (stateStore.balanceDisplayMode != 'satoshi' ? '₿' : 'sats')

  return amountString
})

const formattedFeeSpeed = computed(() => {
  let result = 'Default'

  switch(props.feeSpeed) {
    case 'fast':
      result = 'Fast'
      break
    case 'slow':
      result = 'Slow'
      break
  }

  result += ' (' + duration.value + ')'

  return result
})

const duration = computed(() => {
  let result = '~1 hour'
  switch(props.feeSpeed) {
    case 'fast':
      result = '~30 mins'
      break
    case 'slow':
      result = '~3 hours'
      break
  }
  return result
})

onMounted(() => {
  emit('setToggleElement', toggleElement.value)
})
</script>

<template>
  <div class="fee-selector">
    <h4 class="-body-5">Fee</h4>
    <KitBalance
      class="-body-5"
      :amount="feeAmount"
      :unit="stateStore.balanceDisplayMode"
      theme="neutral"
    />
    <button
      class="toggle"
      ref="toggleElement"
      @click="toggleOptions"
    >
      <p class="-body-5">{{ formattedFeeSpeed }}</p>
      <div v-html="Icons.caretDown" />
    </button>
  </div>
</template>

<style scoped lang="scss">

.fee-selector {
  padding: 10px 0;
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
      // color: var(--neutral-9);
      text-align: left;

      // ::v-deep(span) {
      //   color: var(--neutral-7);
      // }
    }

    &:nth-of-type(2) {
      color: var(--neutral-7);
    }
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 5px;
    flex: 0 0 auto;
    padding: 3px 9px;
    border-radius: 5px;

    > * {
      flex-shrink: 0;
    }

    p {
      color: var(--neutral-7);
    }

    > div {
      line-height: 0;
      color: var(--primary);

      ::v-deep(svg) {
        width: 14px;
        height: 14px;
      }
    }

    &:hover {
      color: var(--primary);
      cursor: pointer;
      background-color: var(--neutral-1);

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

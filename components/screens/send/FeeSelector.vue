<script setup>
const props = defineProps([
  'feeSpeed',
  'unit'
])

const emit = defineEmits([
  'change'
])

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
  if(props.unit == 'bitcoin') {
    formattedAmount = formattedAmount / 100000000

    let amountStringLength = (amount + '').length
    if(amount >= 1000) amountStringLength++
    if(amount >= 1000000) amountStringLength++

    console.log('fdsfds', amount, amountStringLength)

    // Format amount to 8 decimals with a thin space between the second and third numbers, and another thin space between the fifth and sixth numbers
    formattedAmount = formattedAmount.toFixed(8).replace(/(\d{1,2})(\d{3})(\d{3})/, '$1\u2009$2\u2009$3')

    // Wrap the last 3 characters in a span with a class to style them differently
    formattedAmount = '<span class="fee-decimals">' + formattedAmount.slice(0, -amountStringLength) + '</span>' + formattedAmount.slice(-amountStringLength)
  }

  const amountString = formattedAmount + ' ' + (props.unit == 'bitcoin' ? '₿': 'sats')

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
    <p class="-body-5">{{ formattedFeeSpeed }}</p>
    <KitButton
      icon="caretLeft"
      theme="free"
      size="small"
      @click="previousFeeSpeed"
    />
    <KitButton
      icon="caretRight"
      theme="free"
      size="small"
      @click="nextFeeSpeed"
    />
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
}

</style>

<script setup>
const props = defineProps([
  'transactions',
  'unit'
])

const totalAmount = computed(() => {
  const amount = props.transactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  return amount + ' ' + (props.unit == 'bitcoin' ? '₿' : 'sats')
})
</script>

<template>
  <div class="totals">
    <h4 class="-title-5">Total</h4>
    <div class="row">
      <h5 class="-body-5">Amount</h5>
      <p class="-body-5">{{ totalAmount }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.totals {
  .row {
    display: flex;
    padding: 10px 0;
    border-top: 1px solid var(--neutral-2);

    &:first-of-type {
      margin-top: 10px;
      border-top-color: var(--neutral-4);
    }

    h5 {
      color: var(--neutral-7);
      width: 120px;
    }

    p {
      color: var(--neutral-9);
    }
  }
}

</style>

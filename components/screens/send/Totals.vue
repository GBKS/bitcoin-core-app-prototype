<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'transactions'
])

const stateStore = useStateStore()

const totalAmount = computed(() => {
  const amount = props.transactions.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)

  const adjustedAmount = stateStore.balanceDisplayMode == 'satoshi' ? amount : (amount / 100000000).toFixed(8)

  return adjustedAmount + ' ' + (stateStore.balanceDisplayMode == 'satoshi' ? 'sats' : '₿')
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
  margin-top: 20px;
  
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

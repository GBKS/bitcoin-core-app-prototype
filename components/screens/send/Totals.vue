<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'transactions'
])

const stateStore = useStateStore()

const totalAmount = computed(() => {
  let amount

  if(sendMaxEnabled.value) {
    amount = walletData.value.balance
  } else {
    amount = props.transactions.reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
  }
  
  return amount
})

const sendMaxEnabled = computed(() => {
  return props.transactions.some(transaction => transaction.sendMax)
})

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})

const label = computed(() => {
  let result = null

  if(sendMaxEnabled.value) {
    result = 'Full balance'
  }

  return result
})
</script>

<template>
  <div class="totals">
    <h4 class="-title-5">Total</h4>
    <div class="row">
      <h5 class="-body-5">Amount</h5>
      <KitBalance
        class="-body-5"
        :amount="totalAmount"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
      <p v-if="label" class="-body-5" v-html="label" />
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

      &:first-of-type {
        flex-basis: 10%;
        flex-grow: 1;
        text-align: left;
      }

      &:nth-of-type(2) {
        color: var(--neutral-7);
      }
    }
  }
}

</style>

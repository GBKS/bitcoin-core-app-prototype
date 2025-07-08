<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'transactions',
  'selected',
  'amountToSelect'
])

const stateStore = useStateStore()
const expanded = ref(false)

const classObject = computed(() => {
  const c = ['coin-selection-total']

  if(expanded.value) c.push('-expanded')
  if(remainingAmount.value < 0) c.push('-over-amount')

  return c.join(' ')
})

const selectedAmount = computed(() => {
  let result = 0

  props.transactions.forEach(item => {
    if(props.selected.includes(item.id)) {
      result += item.amount
    }
  })

  return result
})

const amountToSend = computed(() => {
  let result = 125000

  return result
})

const feeAmount = computed(() => {
  let result = 375

  return result
})

const totalAmount = computed(() => {
  let result = amountToSend.value + feeAmount.value

  return result
})

const remainingLabel = computed(() => {
  let amount = props.amountToSelect - selectedAmount.value
  return amount > 0 ? `Remaining to select` : `Over required amount`
})

const remainingAmount = computed(() => {
  let result = props.amountToSelect - selectedAmount.value
  return result
})
</script>
<template>
    <div :class="classObject">
      <div class="header" @click="expanded = !expanded">
        <div class="arrow" v-html="expanded ? Icons.caretDown : Icons.caretUp" />
        <h2 v-if="remainingAmount > 0" class="-body-6">Remaining amount</h2>
        <div class="over-amount" v-if="remainingAmount < 0">
          <div v-html="Icons.check" />
          <h2 class="-title-6">You selected enough</h2>
        </div>
        <KitBalance
          v-if="remainingAmount > 0"
          class="-body-6"
          :unit="stateStore.balanceDisplayMode"
          :amount="remainingAmount"
          theme="neutral"
        />
      </div>
      <div v-if="expanded" class="items">
        <div class="-selected">
          <h3 class="-body-6">Amount to send</h3>
          <KitBalance
            class="-body-6"
            :unit="stateStore.balanceDisplayMode"
            :amount="amountToSend"
            theme="neutral"
          />
        </div>
        <div class="-selected">
          <h3 class="-body-6">Fee</h3>
          <KitBalance
            class="-body-6"
            :unit="stateStore.balanceDisplayMode"
            :amount="feeAmount"
            theme="neutral"
          />
        </div>
        <div class="-selected">
          <h3 class="-body-6">Total amount</h3>
          <KitBalance
            class="-body-6"
            :unit="stateStore.balanceDisplayMode"
            :amount="totalAmount"
            theme="neutral"
          />
        </div>
        <div class="-selected">
          <h3 class="-body-6">Amount selected</h3>
          <KitBalance
            class="-body-6"
            :unit="stateStore.balanceDisplayMode"
            :amount="selectedAmount"
            theme="neutral"
          />
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">

.coin-selection-total {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 0 15px 0 10px;
  background-color: var(--neutral-2);
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0 10px 5px;;
    cursor: pointer;

    .arrow {
      line-height: 0;
      ::v-deep(svg) {
        width: 14px;
        height: 14px;
      }
    }

    > h2 {
      flex-grow: 1;
      color: var(--neutral-8);
    }

    .over-amount {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 5px;

      > div {
        display: inline-block;
        background-color: var(--green);
        border-radius: 20px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;

        ::v-deep(svg) {
          width: 12px;
          height: 12px;
          color: white;
        }
      }
    }

    &:hover {
      .arrow,
      h2 {
        color: var(--primary);
      }
    }
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    gap: 5px;
    width: 100%;
    border-top: 1px solid var(--neutral-4);
    padding: 10px 10px 10px 0;

    & > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: var(--neutral-8);
    }

    .remaining {
      h3, p {
        // color: var(--neutral-7);
      }
    }
  }

  &.-over-amount {
    .header {
      h2 {
        color: var(--green);
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    
  }
}
</style>

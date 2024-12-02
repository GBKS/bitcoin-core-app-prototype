<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'transactions',
  'selected',
  'amountToSelect'
])

const stateStore = useStateStore()

const selectedAmount = computed(() => {
  let result = 0

  props.transactions.forEach(item => {
    if(props.selected.includes(item.id)) {
      result += item.amount
    }
  })

  return result
})

const remainingLabel = computed(() => {
  let amount = props.amountToSelect - selectedAmount.value
  return amount > 0 ? `Remaining to select` : `Over required amount`
})

const remainingAmount = computed(() => {
  let result = props.amountToSelect - selectedAmount.value
  return Math.abs(result)
})
</script>
<template>
    <div class="coin-selection-total">
      <div class="content">
        <div class="total">
          <h2 class="-title-5">Total selected</h2>
          <KitBalance
            class="-body-5"
            :unit="stateStore.balanceDisplayMode"
            :amount="selectedAmount"
            theme="dark"
          />
        </div>
        <div class="remaining">
          <h3 class="-body-6">{{ remainingLabel }}</h3>
          <KitBalance
            class="-body-6"
            :unit="stateStore.balanceDisplayMode"
            :amount="remainingAmount"
            theme="dark"
          />
        </div>
      </div>
    </div>
</template>
<style scoped lang="scss">
.coin-selection-total {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-top: 1px solid var(--neutral-4);
  border-bottom: 1px solid var(--neutral-4);
  padding-top: 15px;
  padding-bottom: 15px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    gap: 5px;
    width: 100%;
    max-width: 640px;
    padding-left: 20px;
    padding-right: 20px;

    & > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .remaining {
      h3, p {
        color: var(--neutral-7);
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    
  }
}
</style>

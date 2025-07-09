<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info'
])

const stateStore = useStateStore()

const fee = computed(() => {
  return props.info.fee || 375
})

const total = computed(() => {
  let total = 0

  props.info.forEach(info => {
    total += info.amount
  })
  
  return Math.abs(total) + fee.value
})
</script>

<template>
  <div class="multiple-recipients">
    <ScreensSendReviewMultipleRecipientsItem
      v-for="(info, index) in info"
      :key="index"
      :info="info"
    />
    <div class="-fee">
      <h4 class="-body-5">Fee</h4>
      <KitBalance
        class="-body-5"
        :amount="fee"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </div>
    <div class="-total">
      <h4 class="-body-4">Total amount</h4>
      <KitBalance
        class="-body-4"
        :amount="total"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.multiple-recipients {
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    border-top: 1px solid var(--neutral-3);

    h4 {
      min-width: 110px;
    }

    p {
      &.-empty {
        color: var(--neutral-4);
      }
    }

    &.-fee {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    &.-total {
      border-top-color: var(--neutral-5);
      padding-top: 15px;
      padding-bottom: 25px;
    }
  }
}

</style>

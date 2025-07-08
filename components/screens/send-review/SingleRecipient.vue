<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info'
])

const stateStore = useStateStore()

const noteClass = computed(() => {
  const c = ['-note', '-body-5']
  
  if(!props.info.note) {
    c.push('-empty')
  }

  return c
})

const note = computed(() => {
  return props.info.note || 'No note'
})

const fee = computed(() => {
  return props.info.fee || 375
})

const total = computed(() => {
  return props.info.amount + fee.value
})
</script>

<template>
  <ul class="single-recipient">
    <li>
      <h4 class="-body-5">Send to</h4>
      <KitAddress
        class="-body-5"
        :address="info.address"
        :elide="true"
      />
    </li>
    <li><h4 class="-body-5">Note</h4><p :class="noteClass">{{ note }}</p></li>
    <li>
      <h4 class="-body-5">Amount</h4>
      <KitBalance
        class="-body-5"
        :amount="info.amount"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </li>
    <li>
      <h4 class="-body-5">Fee</h4>
      <KitBalance
        class="-body-5"
        :amount="fee"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </li>
    <li class="-total">
      <h4 class="-body-4">Total amount</h4>
      <KitBalance
        class="-body-4"
        :amount="total"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">

.single-recipient {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    gap: 5px;

    h4 {
      min-width: 110px;
    }

    p {
      &.-empty {
        color: var(--neutral-4);
      }

      &.-note {
        text-align: right;
      }
    }

    &.-total {
      border-top: 1px solid var(--neutral-5);
      padding-top: 15px;
    }
  }
}

</style>

<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info'
])

const stateStore = useStateStore()

const noteClass = computed(() => {
  const c = ['-body-5']
  
  if(!props.info.note) {
    c.push('-empty')
  }

  return c
})

const note = computed(() => {
  return props.info.note || 'No note'
})
</script>

<template>
  <ul class="single-transaction">
    <li>
      <h4 class="-body-5">Send to</h4>
      <KitAddress
        class="-body-5"
        :address="info.address"
      />
    </li>
    <li>
      <h4 class="-body-5">Amount</h4>
      <KitBalance
        class="-body-5"
        :amount="info.amount"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </li>
    <li><h4 class="-body-5">Note</h4><p :class="noteClass">{{ note }}</p></li>
  </ul>
</template>

<style scoped lang="scss">

.single-transaction {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    gap: 5px;

    h4 {
      min-width: 110px;
    }

    p {
      &.-empty {
        color: var(--neutral-4);
      }
    }
  }
}

</style>

<script setup>
import { useStateStore } from "@/stores/state.js"
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()
const selected = ref([])

const transactions = computed(() => {
  return stateStore.transactions[stateStore.activeWalletId].filter(item => item.amount > 0)
})

const classObject = computed(() => {
  const c = ['coin-selection']

  return c.join(' ')
})

const amountToSelect = computed(() => {
  let result = 25000
  
  if(stateStore.send?.transactions?.length > 0) {
    result = 0
    stateStore.send.transactions.forEach(item => {
      result += item.amount
    })
  }

  return result
})

function toggleItem(id) {
  const index = selected.value.indexOf(id)
  if(index > -1) {
    selected.value.splice(index, 1)
  } else {
    selected.value.push(id)
  }

  stateStore.send.coins = selected.value
}

onMounted(() => {
  selected.value = stateStore.send?.coins || []
})
</script>

<template>
  <KitScreen :class="classObject">
    <KitTopBar
      title="Select coins"
      buttonRightLabel="Done"
      buttonRightTo="/screen/send?t=slide-down"
    />
    <ScreensCoinSelectionTotal
      :transactions="transactions"
      :selected="selected"
      :amountToSelect="amountToSelect"
    />
    <div class="items">
      <ScreensCoinSelectionItem
        v-for="item in transactions"
        :key="item.id"
        :info="item"
        :active="selected.includes(item.id)"
        @toggle="toggleItem"
      />
    </div>
  </KitScreen>
</template>
<style scoped lang="scss">
.coin-selection {
  .items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    width: 100%;
    max-width: 640px;
    padding-left: 20px;
    padding-right: 20px;

    > * {
      & + * {
        border-top: 1px solid var(--neutral-4);
      }
    }
  }
}
</style>
<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()
const elements = ref({})

const largestAmount = computed(() => {
  let result = null

  leftBoxes.value.forEach(element => {
    if(result === null || element.amount > result) {
      result = element.amount
    }
  })

  rightBoxes.value.forEach(element => {
    if(result === null || element.amount > result) {
      result = element.amount
    }
  })

  return result
})

const lowestAmount = computed(() => {
  let result = null

  leftBoxes.value.forEach(element => {
    if(result === null || element.amount < result) {
      result = element.amount
    }
  })

  rightBoxes.value.forEach(element => {
    if(result === null || element.amount < result) {
      result = element.amount
    }
  })

  return result
})

const leftBoxes = computed(() => {
  const result = stateStore.send.coins || []
  return result.sort((a, b) => b.amount - a.amount)
})

const maxColumnBoxCount = computed(() => {
  return Math.max(leftBoxes.value.length, rightBoxes.value.length)
})

const rightBoxes = computed(() => {
  const result = stateStore.send.transactions || []
  return result.sort((a, b) => {
    if(a.type == 'fee') return 1
    if(b.type == 'fee') return -1
    if(a.type == 'change') return 1
    if(b.type == 'change') return -1
    return b.amount - a.amount
  })
})

function elementMounted(id, element) {
  elements.value[id] = element
}

function createDummyData() {
  const transactions = []
  const coins = []

  // Make up inputs
  let counter = Math.random()*3 + 1
  let sendAmount = 0, transaction
  while(--counter >= 0) {
    transaction = StateHelper.transaction(null, 'receive')
    sendAmount += transaction.amount
    coins.push(transaction)
  }

  // Add some random transactions
  const outputCount = Math.ceil(Math.random()*6) + 2 
  let sendAmountToDistribute = sendAmount
  let transactionAmount
  counter = outputCount
  while(--counter >= 0) {
    transaction = StateHelper.transaction(null, 'send')

    if(counter == 0) {
      transactionAmount = sendAmountToDistribute
    } else {
      transactionAmount = sendAmountToDistribute * Math.random()
    }

    transaction.amount = transactionAmount
    sendAmountToDistribute -= transactionAmount

    if(counter == 0) {
      transaction.title = 'Fee'
      transaction.type = 'fee'
    }

    if(counter == 1) {
      transaction.title = 'Change'
      transaction.type = 'change'
    }

    transactions.push(transaction)
  }

  elements.value = {}
  stateStore.send = { transactions, coins }
}

onBeforeMount(() => {
  if(!stateStore.send) {
    createDummyData()
  }
})
</script>

<template>
  <KitScreen class="coin-flow">
    <template v-if="stateId == 'coin-flow' && state">
      <KitTopBar
        buttonRightLabel="Done"
        buttonRightTo="/screen/send-review?t=slide-down"
        title="Transaction preview"
      />
      <div class="content-wrap">
        <div class="labels">
          <h4 class="-title-5">Received from</h4>
          <KitButton
            class="-primary"
            label="Randomize"
            theme="free"
            size="small"
            @click="createDummyData"
          />
          <h4 class="-title-5">Sending to</h4>
        </div>
        <div class="boxes">
          <div class="left">
            <ScreensCoinFlowBox
              v-for="(info, index) in leftBoxes"
              :key="info.id"
              :info="info"
              direction="input"
              :maxColumnBoxCount="maxColumnBoxCount"
              @mounted="elementMounted"
            />
          </div>
          <ScreensCoinFlowGraph
            :left="leftBoxes"
            :right="rightBoxes"
            :elements="elements"
            :largestAmount="largestAmount"
            :lowestAmount="lowestAmount"
          />
          <div class="left">
            <ScreensCoinFlowBox
              v-for="(info, index) in rightBoxes"
              :key="info.id"
              :info="info"
              direction="output"
              :maxColumnBoxCount="maxColumnBoxCount"
              @mounted="elementMounted"
            />
          </div>
        </div>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.coin-flow {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  flex-grow: 1;

  .content-wrap {
    width: 100%;
    max-width: 640px;
    padding-left: 20px;
    padding-right: 20px;
  }

  ::v-deep(.content) {
    gap: 30px;
  }

  .labels {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .boxes {
    display: flex;

    .left,
    .right {
      position: relative;
      flex-basis: 10%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }

    .right {

    }
  }
}

</style>
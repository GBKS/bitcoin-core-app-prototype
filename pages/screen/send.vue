<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

definePageMeta(transition)

const reviewMode = ref(false)
const optionsVisible = ref(false)
const optionsElement = ref(null)
const stateStore = useStateStore()
const currentTransactionIndex = ref(0)
const transactions = ref([])
const customFeeEnabled = ref(false)
const locktimeEnabled = ref(false)
const feeSpeed = ref('default')
const customFeeRate = ref(5)
const replaceByFeeEnabled = ref(false)
const feeInAmountEnabled = ref(false)
const coinSelectionEnabled = ref(false)
const coins = ref([])

const props = defineProps([
  'stateId',
  'state'
])

const menuOptions = computed(() => {
  return {
    "import-psbt": {
      icon: 'file',
      label: 'Import transaction file'
    },
    "static-1": 'divider',
    "fee-in-amount": {
      label: 'Include fee in amount',
      toggle: feeInAmountEnabled.value
    },
    "replace-by-fee": {
      label: 'Enable speed up',
      toggle: replaceByFeeEnabled.value
    },
    "custom-fee": {
      label: 'Custom fee',
      toggle: customFeeEnabled.value
    },
    "static-2": 'divider',
    "coin-selection": {
      label: 'Coin selection',
      toggle: coinSelectionEnabled.value
    },
    "locktime": {
      label: 'Lock transaction until...',
      toggle: locktimeEnabled.value
    },
    "batch": {
      label: 'Multiple recipients',
      toggle: transactions.value.length > 1
    },
    "static-3": 'divider',
    "clear": {
      icon: 'cross',
      label: 'Clear all'
    }
  }
})

function toggleOptions() {
  optionsVisible.value = !optionsVisible.value

  window.emitter.emit('toggle-context-menu', {
    id: 'send-options',
    options: menuOptions.value,
    element: optionsElement.value,
    desktopPosition: 'below-right-aligned',
    mobilePosition: 'below-right-aligned'
  })
}

function onContextMenuOption(data) {
  console.log('onContextMenuOption', data)

  if(data.menuId == 'send-options') {
    switch(data.optionId) {
      case 'batch':
        if(transactions.value.length == 1) {
          addBlankTransaction()
        } else if(confirm('Are you sure you want to remove all transactions except for the first one?')) {
          transactions.value = [getBlankTransaction()]
          currentTransactionIndex.value = 0
        }
        break
      case 'custom-fee':
        customFeeEnabled.value = !customFeeEnabled.value
        break
      case 'replace-by-fee':
        replaceByFeeEnabled.value = !replaceByFeeEnabled.value
        break
      case 'locktime':
        locktimeEnabled.value = !locktimeEnabled.value
        break
      case 'fee-in-amount':
        feeInAmountEnabled.value = !feeInAmountEnabled.value
        break
      case 'locktime':
        locktimeEnabled.value = !locktimeEnabled.value
        break
      case 'coin-selection':
        coinSelectionEnabled.value = !coinSelectionEnabled.value
        break
      case 'clear':
        clearForm()
        break
    }
  }

  window.emitter.emit('update-context-menu', {
    id: 'send-options',
    options: menuOptions.value,
    element: optionsElement.value,
    desktopPosition: 'below-right-aligned',
    mobilePosition: 'below-right-aligned'
  })

  // window.emitter.emit('hide-context-menu', { id: 'send-options' })
}

function clearForm() {
  transactions.value = [getBlankTransaction()]
  currentTransactionIndex.value = 0

  reviewMode.value = false
  optionsVisible.value = false
  customFeeEnabled.value = false
  feeSpeed.value = 'default'
  customFeeRate.value = 5
  replaceByFeeEnabled.value = false
  feeInAmountEnabled.value = false
  coinSelectionEnabled.value = false
  locktimeEnabled.value = false
  coins.value = []
}

function getBlankTransaction() {
  return {
    amount: null,
    note: '',
    address: ''
  }
}

function addBlankTransaction() {
  transactions.value.push(getBlankTransaction())
}

function clickReview() {
  reviewMode.value = true
}

function clickSend() {
  reviewMode.value = false
}

function changeTransaction(data) {
  console.log('changeTransaction', data)
  const transaction = transactions.value[data.index]
  transaction.amount = data.amount
  transaction.note = data.note
  transaction.address = data.address
}

function changeCurrentTransactionIndex(index) {
  currentTransactionIndex.value = index
}

const title = computed(() => {
  let result = 'Enter transaction details'

  if(props.state.prefilled) {
    result = 'Payment request'
  } else if(reviewMode.value) {
    result = 'Review transaction'
  }

  return result
})

const currentTransaction = computed(() => {
  return transactions.value[currentTransactionIndex.value]
})

function changeFeeRate(newValue) {
  customFeeRate.value = newValue
}

function changeFeeSpeed(newValue) {
  feeSpeed.value = newValue
}

function removeCurrentTransaction() {
  transactions.value.splice(currentTransaction.value, 1)

  if(currentTransactionIndex.value >= transactions.value.length) {
    currentTransactionIndex.value = transactions.value.length - 1
  }
}

function selectFromClipboard(address) {
  transactions.value[currentTransactionIndex.value] = {
    address: address,
    amount: currentTransaction.value.amount,
    note: currentTransaction.value.note
  }
}

function selectFromRequest(request) {
  console.log('selectFromRequest', request, currentTransaction.value)
  transactions.value[currentTransactionIndex.value] = {
    address: request.address,
    amount: request.amount,
    note: request.from + ': ' + request.note
  }
}

function restoreFromState() {
  const state = stateStore.send

  if(!state) return

  console.log('restoreFromState', state)

  currentTransactionIndex.value = state.currentTransactionIndex || 0
  customFeeEnabled.value = state.customFeeEnabled || false
  locktimeEnabled.value = state.locktimeEnabled || false
  feeSpeed.value = state.feeSpeed || 'default'
  customFeeRate.value = state.customFeeRate || 5
  replaceByFeeEnabled.value = state.replaceByFeeEnabled || false
  feeInAmountEnabled.value = state.feeInAmountEnabled || false
  coinSelectionEnabled.value = state.coinSelectionEnabled || false
  transactions.value = state.transactions || [getBlankTransaction()]
  coins.value = state.coins || []
}

function updateState() {
  const sendData = {
    currentTransactionIndex: currentTransactionIndex.value,
    customFeeEnabled: customFeeEnabled.value,
    locktimeEnabled: locktimeEnabled.value,
    feeSpeed: feeSpeed.value,
    customFeeRate: customFeeRate.value,
    replaceByFeeEnabled: replaceByFeeEnabled.value,
    feeInAmountEnabled: feeInAmountEnabled.value,
    coinSelectionEnabled: coinSelectionEnabled.value,
    transactions: transactions.value,
    coins: coins.value
  }

  console.log('updateState', sendData)

  stateStore.send = sendData
}

const classObject = computed(() => {
  const c = ['send']

  if(reviewMode.value) {
    c.push('-review')
  }

  return c.join(' ')
})

onBeforeMount(() => {
  window.emitter.on('on-select-context-menu-option', onContextMenuOption)

  restoreFromState()

  if(transactions.value.length == 0) {
    addBlankTransaction()
  }

  if(props.state.prefilled) {
    // currentTransaction.value.amount = 25000
    // currentTransaction.value.address = StateHelper.address()
  }
})

onMounted(() => {
  window.emitter.emit('hide-context-menu', { id: 'send-options' })
})

onBeforeUnmount(() => {
  updateState()

  window.emitter.off('on-select-context-menu-option', onContextMenuOption)
}) 
</script>

<template>
  <KitScreen :class="classObject">
    <template v-if="stateId == 'send' && state">
      <div class="top-mobile">
        <KitTopBar
          buttonLeftLabel="Cancel"
          buttonLeftTo="/screen/activity?t=slide-down"
        />
      </div>

      <div class="form">
        <div class="form-header">
          <h5 class="-title-4">{{ title }}</h5>
          <div class="options" ref="optionsElement">
            <KitButton
              icon="ellipsis"
              theme="free"
              @click="toggleOptions"
            />
          </div>
        </div>

        <ScreensSendRequest
          v-if="state.prefilled"
          @select="selectFromRequest" 
        />

        <ScreensSendClipboard
          v-if="state.clipboard"
          @select="selectFromClipboard" 
        />

        <ScreensSendPagination
          v-if="transactions.length > 1"
          :activeIndex="currentTransactionIndex"
          :count="transactions.length"
          @change="changeCurrentTransactionIndex"
          @add="addBlankTransaction"
          @remove="removeCurrentTransaction"
        />

        <ScreensSendTransactionForm
          :key="currentTransactionIndex"
          :index="currentTransactionIndex"
          :transaction="currentTransaction"
          :addressEditable="!state.prefilled"
          @change="changeTransaction"
        />

        <ScreensSendTotals
          v-if="transactions.length > 1"
          :transactions="transactions"
        />

        <ScreensSendCoinSelection
          v-if="coinSelectionEnabled"
          :coins="coins"
        />

        <ScreensSendFeeInput
          v-if="customFeeEnabled"
          :feeRate="customFeeRate"
          @change="changeFeeRate"
        />

        <ScreensSendFeeSelector
          v-if="!customFeeEnabled"
          :feeSpeed="feeSpeed"
          @change="changeFeeSpeed"
        />

        <ScreensSendTimelockInput
          v-if="locktimeEnabled"
        />

        <ScreensSendChecks
          v-if="replaceByFeeEnabled || feeInAmountEnabled"
          :replaceByFeeEnabled="replaceByFeeEnabled"
          :feeInAmountEnabled="feeInAmountEnabled"
        />

        <div class="options">
          <KitButton
            v-if="!reviewMode"
            label="Review"
            @click="clickReview"
          />
          <KitButton
            v-if="reviewMode"
            label="Send"
            @click="clickSend"
          />
        </div>
      </div>

    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.send {
  .top-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 560px;

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    > .options {
      margin-top: 30px;
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  }

  &.-review {
    background-color: rgba(var(--blue-rgb), 0.15);
  }

  @include container(small) {
    .form {
      flex-direction: column;
      padding: 15px 15px;

      .form-header {
        margin-bottom: 15px;
      }
    }
  }

  @include container(medium-up) {
    .top-mobile {
      display: none;
    }

    .form {
      flex-wrap: wrap;
      column-gap: 40px;
      padding: 30px 20px;

      .form-header {
        margin-bottom: 30px;
      }
    }
  }
}

</style>
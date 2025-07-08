<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

definePageMeta(transition)

const reviewMode = ref(false)
const optionsVisible = ref(false)
const optionsElement = ref(null)
const feeOptionsVisible = ref(false)
let feeOptionsElement = null
const stateStore = useStateStore()
const currentTransactionIndex = ref(0)
const transactions = ref([])
const customFeeEnabled = ref(false)
const locktimeEnabled = ref(false)
const feeSpeed = ref('default')
const customFeeRate = ref(5)
const replaceByFeeEnabled = ref(false)
const feeInAmountEnabled = ref(false)
const sendMaxEnabled = ref(false)
const coinSelectionEnabled = ref(false)
// const formIsValid = ref(false)
const coins = ref([])
const renderCounter = ref(0) // Sometimes need to force re-rendering of the form

const props = defineProps([
  'stateId',
  'state'
])

const menuOptions = computed(() => {
  return {
    "send-max": {
      label: 'Send full balance',
      toggle: sendMaxEnabled.value
    },
    "replace-by-fee": {
      label: 'Enable speed up',
      toggle: replaceByFeeEnabled.value
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
    "import-psbt": {
      icon: 'file',
      label: 'Import transaction file'
    },
    "static-4": 'divider',
    "clear": {
      icon: 'cross',
      label: 'Clear form'
    }
  }
})

const feeOptions = computed(() => {
  return {
    "fast": {
      label: 'Fast <span>(10 - 20 min)</span>',
      secondaryLabel: '3,000 sats',
      radio: customFeeEnabled.value ? false : feeSpeed.value == 'fast'
    },
    "default": {
      label: 'Default <span>(20 - 30 min)</span>',
      secondaryLabel: '2,000 sats',
      radio: customFeeEnabled.value ? false : feeSpeed.value == 'default'
    },
    "slow": {
      label: 'Slow <span>(30 - 60 min)</span>',
      secondaryLabel: '1,000 sats',
      radio: customFeeEnabled.value ? false : feeSpeed.value == 'slow'
    },
    "custom-fee": {
      label: 'Custom',
      radio: customFeeEnabled.value
    },
    "static-1": 'divider',
    "fee-in-amount": {
      label: 'Include fee in amount',
      toggle: feeInAmountEnabled.value || sendMaxEnabled.value,
      disabled: sendMaxEnabled.value
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
  // console.log('onContextMenuOption', data)

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
      case 'send-max':
        sendMaxEnabled.value = !sendMaxEnabled.value
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

    window.emitter.emit('update-context-menu', {
      id: 'send-options',
      options: menuOptions.value,
      element: optionsElement.value,
      desktopPosition: 'below-right-aligned',
      mobilePosition: 'below-right-aligned'
    })
  } else if(data.menuId == 'fee-options') {
    switch(data.optionId) {
      case 'fast':
      case 'default':
      case 'slow':
        feeSpeed.value = data.optionId
        customFeeEnabled.value = false
        break
      case 'custom-fee':
        customFeeEnabled.value = !customFeeEnabled.value
        break
      case 'replace-by-fee':
        replaceByFeeEnabled.value = !replaceByFeeEnabled.value
        break
      case 'fee-in-amount':
        feeInAmountEnabled.value = !feeInAmountEnabled.value
        break
    }

    window.emitter.emit('update-context-menu', {
      id: 'fee-options',
      options: feeOptions.value,
      element: feeOptionsElement,
      desktopPosition: 'below-right-aligned',
      mobilePosition: 'below-right-aligned'
    })
  }

  // window.emitter.emit('hide-context-menu', { id: 'send-options' })
}

function toggleFeeOptions(element) {
  console.log('toggleFeeOptions', element)

  if(element) {
    feeOptionsElement = element
  }

  feeOptionsVisible.value = !feeOptionsVisible.value

  window.emitter.emit('toggle-context-menu', {
    id: 'fee-options',
    options: feeOptions.value,
    element: feeOptionsElement,
    desktopPosition: 'below-right-aligned',
    mobilePosition: 'below-right-aligned'
  })
}

function setFeeToggleElement(element) {
  feeOptionsElement = element
}

const formIsValid = computed(() => {
  let result = true

  // console.log('Send.formIsValid', transactions.value)

  transactions.value.every(transaction => {
    // console.log('transaction', transaction, transaction.amount, !!transaction.amount, transaction.address)
    if(!transaction.amountValid || !transaction.addressValid) {
      result = false
      return false
    }
    return true
  })

  // console.log('formIsValid', result)

  return result
})

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
    address: '',
    amountValid: false,
    addressValid: false
  }
}

function addBlankTransaction() {
  transactions.value.push(getBlankTransaction())
}

function clickReview(event) {
  // event.preventDefault()
  // event.stopPropagation()
  // return false;
  // reviewMode.value = true

  // const route = useRoute()
  // useRouter().push({ path: '/screen/send-review?t=slide-up' })
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
  transaction.sendMax = data.sendMax
  transaction.amountValid = data.amountValid
  transaction.addressValid = data.addressValid

  if(data.sendMax) {
    // Disable sendMax for all other transactions
    transactions.value.forEach((t, index) => {
      if(index != data.index) {
        t.sendMax = false
      }
    })
  }
}

function changeCurrentTransactionIndex(index) {
  currentTransactionIndex.value = index
}

const title = computed(() => {
  let result = 'Enter transaction details'

  if(props.state?.prefilled) {
    result = 'Payment request'
  } else if(reviewMode.value) {
    result = 'Review transaction'
  }

  return result
})

const currentTransaction = computed(() => {
  return transactions.value[currentTransactionIndex.value]
})

const remainingBalance = computed(() => {
  let balance = stateStore.wallets[stateStore.activeWalletId].balance

  transactions.value.forEach(transaction => {
    if(transaction.amount) {
      balance -= transaction.amount
    }
  })

  return balance
})

const amountToSend = computed(() => {
  let balance = 0

  transactions.value.forEach(transaction => {
    if(transaction.amount) {
      balance += transaction.amount
    }
  })

  return balance
})

const transactionSize = computed(() => {
  let size = 0

  // Fake a transaction size based on amount.
  if(amountToSend.value > 0) size = Math.min(30, amountToSend.value / 1000)

  return size
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
  sendMaxEnabled.value = state.sendMaxEnabled || false
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
    sendMaxEnabled: sendMaxEnabled.value,
    coinSelectionEnabled: coinSelectionEnabled.value,
    transactions: transactions.value,
    coins: coins.value
  }

  console.log('updateState', sendData)

  stateStore.send = sendData
}

function enableSendMax() {
  sendMaxEnabled.value = !sendMaxEnabled.value
}

function toggleSendMax(data) {
  console.log('toggleSendMax', data)
}

const classObject = computed(() => {
  const c = ['send']

  if(reviewMode.value) {
    c.push('-review')
  }

  return c.join(' ')
})

const reviewButtonTo = computed(() => {
  return reviewMode.value ? '/screen/send-review?t=slide-up' : null
})

const sendMaxTransactionIndex = computed(() => {
  return transactions.value.findIndex(t => t.sendMax)
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

// For testing, switches between blank form, single recipient and multiple recipients
function toggleDummyData() {
  if(transactions.value.length > 1) {
    // Replace all transactions with a single blank one
    currentTransactionIndex.value = 0
    transactions.value = [getBlankTransaction()]
    renderCounter.value++
  } else {
    // If the current transaction has no address or amount, fill those in
    if(!currentTransaction.value.address || !currentTransaction.value.amount) {
      currentTransaction.value.address = 'bc1qtz5fl2n76wcmfdhxq9svv5q0hpyvkrew0s5kly'
      currentTransaction.value.amount = 10000
      currentTransaction.value.note = StateHelper.sendTitle()
      currentTransaction.value.amountValid = true
      currentTransaction.value.addressValid = true
      renderCounter.value++
    } else {
      // Otherwise, add a new complete transaction
      transactions.value.push({
        address: 'bc1qexampleaddress1234567890abcdefg',
        amount: 10000,
        note: StateHelper.sendTitle(),
        amountValid: true,
        addressValid: true
      })
    }
  }
}
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
          <h5 class="-title-4" @click="toggleDummyData">{{ title }}</h5>
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
          :key="currentTransactionIndex+'_'+renderCounter"
          :index="currentTransactionIndex"
          :transaction="currentTransaction"
          :addressEditable="!state.prefilled"
          :showSendMax="transactions.length > 1 && sendMaxEnabled"
          :sendMaxEnabled="sendMaxEnabled"
          :remainingBalance="remainingBalance"
          @enableSendMax="enableSendMax"
          @toggleSendMax="toggleSendMax"
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
          @toggleOptions="toggleFeeOptions"
          @setToggleElement="setFeeToggleElement"
        />

        <ScreensSendFeeSelector
          v-if="!customFeeEnabled"
          :feeSpeed="feeSpeed"
          :transactionSize="transactionSize"
          @toggleFeeOptions="toggleFeeOptions"
          @setToggleElement="setFeeToggleElement"
        />

        <ScreensSendTimelockInput
          v-if="locktimeEnabled"
        />

        <ScreensSendChecks
          v-if="replaceByFeeEnabled || feeInAmountEnabled || sendMaxEnabled"
          :replaceByFeeEnabled="replaceByFeeEnabled"
          :feeInAmountEnabled="feeInAmountEnabled"
          :sendMaxEnabled="sendMaxEnabled"
          :topBorder="true"
        />

        <div class="options">
          <KitButton
            v-if="!reviewMode"
            label="Review"
            :disabled="!formIsValid"
            to="/screen/send-review?t=slide-up"
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
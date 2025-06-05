<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'index',
  'transaction',
  'unit',
  'addressEditable',
  'showSendMax',
  'sendMaxEnabled',
  'remainingBalance'
])

const emit = defineEmits([
  'change',
  'toggleSendMax'
])

watch(() => props.transaction, (newValue) => {
  amountValue.value = newValue.amount
  noteValue.value = newValue.note
  addressValue.value = newValue.address
  sendMaxValue.value = newValue.sendMax
})

const stateStore = useStateStore()
const amountValue = ref(null)
const noteValue = ref('')
const addressValue = ref(null)
const addressInput = ref(null)
const sendMaxValue = ref(null)
const amountValidation = ref({ value: null, isValid: false, error: null })
const addressValidation = ref({ value: null, isValid: false, error: null })
const showValidation = ref(false)

function changeAmountValue(newValue) {
  const adjustedAmount = stateStore.balanceDisplayMode == 'satoshi' ? newValue : newValue * 100000000
  console.log('changeAmountValue', newValue, adjustedAmount)
  amountValue.value = adjustedAmount
  emitChange()
}

function changeNoteValue(newValue) {
  noteValue.value = newValue
  emitChange()
}

function changeAddress(newValue) {
  addressValue.value = newValue.split(' ').join('')
  emitChange()
}

function emitChange() {
  // console.log('TransactionForm emitChange', addressValidation.value, amountValidation.value)
  emit('change', {
    index: props.index,
    amount: amountValue.value,
    note: noteValue.value,
    address: addressValue.value,
    sendMax: sendMaxValue.value,
    addressValid: addressValidation.value.isValid,
    amountValid: amountValidation.value.isValid
  })
}

function toggleSendMax(value) {
  sendMaxValue.value = value
  emitChange()
  // emit('toggleSendMax', {
  //   index: props.index,
  //   value
  // })
}

function validateAmount(validation) {
  // console.log('TransactionForm validateAmount', validation)
  amountValidation.value = validation

  emitChange()
}

function validateAddress(validation) {
  // console.log('TransactionForm validateAddress', validation)
  addressValidation.value = validation

  emitChange()
}

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})

onBeforeMount(() => {
  amountValue.value = props.transaction.amount
  noteValue.value = props.transaction.note
  addressValue.value = props.transaction.address
  sendMaxValue.value = props.transaction.sendMax
})
</script>

<template>
    <div class="transaction-form">
      <ScreensSendAddressInput
        :address="addressValue"
        :editable="addressEditable"
        @validate="validateAddress"
        @change="changeAddress"
      />
      <ScreensSendMaxAmount
        v-if="sendMaxEnabled && !showSendMax"
        :balance="walletData.balance"
      />
      <ScreensSendAmountInput
        v-if="!sendMaxEnabled || showSendMax"
        label="Amount"
        :amount="sendMaxValue ? remainingBalance : amountValue"
        :unit="unit"
        :balance="walletData.balance"
        required="true"
        :disabled="sendMaxValue"
        :showSendMax="showSendMax"
        :sendMaxEnabled="sendMaxValue"
        :remainingBalance="remainingBalance"
        @validate="validateAmount"
        @toggleSendMax="toggleSendMax"
        @change="changeAmountValue"
      />
      <ScreensReceiveNoteInput
        label="Note to self"
        :text="noteValue"
        placeholder="Enter private note..."
        @change="changeNoteValue"
      />
    </div>
</template>

<style scoped lang="scss">

.transaction-form {
  > * + * {
    border-top: 1px solid var(--neutral-3);
  }
}

</style>

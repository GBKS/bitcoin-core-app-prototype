<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'index',
  'transaction',
  'unit',
  'addressEditable'
])

const emit = defineEmits([
  'change'
])

watch(() => props.transaction, (newValue) => {
  amountValue.value = newValue.amount
  noteValue.value = newValue.note
  addressValue.value = newValue.address
})

const stateStore = useStateStore()
const amountValue = ref(null)
const noteValue = ref('')
const addressValue = ref(null)
const addressInput = ref(null)

function changeAmountValue(newValue) {
  const adjustedAmount = stateStore.balanceDisplayMode == 'satoshi' ? newValue : newValue * 100000000
  amountValue.value = adjustedAmount
  emitChange()
}

function changeNoteValue(newValue) {
  noteValue.value = newValue
  emitChange()
}

function changeAddress(newValue) {
  addressValue.value = newValue
  emitChange()
}

function onAddressInput(event) {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  let value = this.value.replace(/\s/g, '');
  let formattedValue = '';
  let cursorOffset = 0;

  for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
          if (i < start) cursorOffset++;
      }
      formattedValue += value[i];
  }

  this.value = formattedValue.trim();
  
  // Adjust cursor position
  addressInput.value.setSelectionRange(start + cursorOffset, end + cursorOffset);

  emitChange()
}

function emitChange() {
  emit('change', {
    index: props.index,
    amount: amountValue.value,
    note: noteValue.value,
    address: addressValue.value
  })
}

onBeforeMount(() => {
  amountValue.value = props.transaction.amount
  noteValue.value = props.transaction.note
  addressValue.value = props.transaction.address
})
</script>

<template>
    <div class="transaction-form">
      <ScreensReceiveAmountInput
        label="Amount"
        :amount="amountValue"
        :unit="unit"
        @change="changeAmountValue"
      />
      <ScreensReceiveNoteInput
        label="Note to self"
        :text="noteValue"
        placeholder="Enter private note..."
        @change="changeNoteValue"
      />
      <ScreensSendAddressInput
        :address="addressValue"
        :editable="addressEditable"
        @change="changeAddress"
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

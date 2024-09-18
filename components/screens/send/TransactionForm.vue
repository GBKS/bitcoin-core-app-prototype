<script setup>
const props = defineProps([
  'index',
  'transaction',
  'unit'
])

const emit = defineEmits([
  'change',
  'changeUnit'
])

watch(() => props.transaction, (newValue) => {
  amountValue.value = newValue.amount
  noteValue.value = newValue.note
  addressValue.value = newValue.address
})

const amountValue = ref(null)
const noteValue = ref('')
const addressValue = ref(null)
const addressInput = ref(null)

function changeAmountValue(newValue) {
  amountValue.value = newValue
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

function changeUnitValue(newValue) {
  emit('changeUnit', newValue)
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

  console.log('onbeforemount', props.transaction)
})

// const addressClasses = computed(() => {
//   const c = ['-body-5']
//   c.push('-chunks-' + addressChunks.value.length)

//   if(addressGenerated.value) {
//     c.push('-address-generated')
//   }

//   return c.join(' ')
// })
</script>

<template>
    <div class="transaction-form">
      <ScreensReceiveAmountInput
        label="Amount"
        :amount="amountValue"
        :unit="unit"
        @change="changeAmountValue"
        @changeUnit="changeUnitValue"
      />
      <ScreensReceiveInput
        label="Note to self"
        :text="noteValue"
        placeholder="Enter private note..."
        @change="changeNoteValue"
      />
      <ScreensSendAddressInput
        :address="addressValue"
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

<script setup>
import StateHelper from '@/helpers/state-helper.js'

const emit = defineEmits([
  'select'
])

const requestData = {
  from: 'Robert',
  note: 'Please pay me rent for December.',
  amount: 25000,
  address: StateHelper.address()
}

const dismissed = ref(false)

const shortenedAddress = computed(()  => {
  return requestData.address.substring(0, 6) + '...' + requestData.address.substring(requestData.address.length - 6)
})

const formattedAmount = computed(() => {
  return requestData.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' sats'
})

function pressUse() {
  emit('select', requestData)
  dismissed.value = true
}
</script>

<template>
  <div class="payment-request" v-if="!dismissed">
    <p class="-body-6"><b>From:</b> {{ requestData.from }}</p>
    <p class="-body-6"><b>Note:</b> {{ requestData.note }}</p>
    <p class="-body-6"><b>Amount:</b> {{ formattedAmount }}</p>
    <p class="-body-6"><b>Address:</b> {{ shortenedAddress }}</p>
    <div class="options">
      <KitButton
        label="Dismiss"
        size="small"
        theme="outline"
        @click="dismissed = true"
        />
        <KitButton
        label="Use"
        size="small"
        @click="pressUse"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-request {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: rgba(var(--blue-rgb), 0.1);
  border-radius: 5px;
  padding: 15px 15px;

  p {
    color: var(--blue);

    b {
      font-weight: 500;
    }
  }

  & + .transaction-form {
    margin-top: 15px;
  }

  .options {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    ::v-deep(button) {
      min-width: 120px;
    }
  }
}
</style>

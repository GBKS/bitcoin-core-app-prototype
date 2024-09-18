<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

definePageMeta(transition)

const reviewMode = ref(false)
const unitValue = ref('sats')
const optionsVisible = ref(false)
const optionsElement = ref(null)
const state = useStateStore()
const currentTransactionIndex = ref(0)
const transactions = ref([])
const customFeeEnabled = ref(false)
const feeSpeed = ref('default')
const customFeeRate = ref(5)
const replaceByFeeEnabled = ref(false)

const props = defineProps([
  'stateId',
  'state'
])

function changeUnit(newValue) {
  unitValue.value = newValue
}

function toggleOptions() {
  optionsVisible.value = !optionsVisible.value

  const menuOptions = {
    "batch": {
      label: 'Multiple recipients'
    },
    "custom-fee": {
      label: 'Custom fee'
    },
    "replace-by-fee": {
      icon: replaceByFeeEnabled.value ? 'check' : '',
      indent: !replaceByFeeEnabled.value,
      label: 'Replace by fee'
    }
  }

  window.emitter.emit('toggle-context-menu', {
    id: 'send-options',
    options: menuOptions,
    element: optionsElement.value
  })
}

function onContextMenuOption(data) {
  console.log('onContextMenuOption', data)

  if(data.menuId == 'send-options') {
    switch(data.optionId) {
      case 'batch':
        addBlankTransaction()
        break
      case 'custom-fee':
        customFeeEnabled.value = !customFeeEnabled.value
        break
      case 'replace-by-fee':
        replaceByFeeEnabled.value = !replaceByFeeEnabled.value
        break
    }
  }

  window.emitter.emit('hide-context-menu', { id: 'send-options' })
  console.log('aa', transactions.value)
}

function getBlankTransaction() {
  return {
    amount: 0,
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
  return reviewMode.value ? 'Review transaction' : 'Enter transaction details'
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

onBeforeMount(() => {
  window.emitter.on('on-select-context-menu-option', onContextMenuOption)

  addBlankTransaction()
})

onBeforeUnmount(() => {
  window.emitter.off('on-select-context-menu-option', onContextMenuOption)
}) 
</script>

<template>
  <KitScreen class="send">
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
          @change="changeTransaction"
          @changeUnit="changeUnit"
        />

        <ScreensSendTotals
          v-if="transactions.length > 1"
          :transactions="transactions"
          :unit="unitValue"
        />

        <ScreensSendFeeInput
          v-if="customFeeEnabled"
          :feeRate="customFeeRate"
          :unit="unitValue"
          @change="changeFeeRate"
        />

        <ScreensSendFeeSelector
          v-if="!customFeeEnabled"
          :feeSpeed="feeSpeed"
          :unit="unitValue"
          @change="changeFeeSpeed"
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

  @include container(small) {
    .form {
      flex-direction: column;
      align-items: center;
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
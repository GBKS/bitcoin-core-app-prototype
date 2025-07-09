<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'subStateId',
  'state'
])

const stateStore = useStateStore()
const transactions = ref(null)
const isSent = ref(false)

watch(() => props.subStateId, (newValue, oldValue) => {
  updateSubState()
})

function send() {
  isSent.value = true
}

onMounted(() => {
  const state = stateStore.send
  if(state && state.transactions) {
    transactions.value = state.transactions
  } else {
    updateSubState()
  }
})

function getDummyTransaction() {
  const transaction = StateHelper.transaction(null, 'send')
  transaction.note = transaction.title
  return transaction
}

function updateSubState() {
  if(props.state.recipients == 1) {
    transactions.value = [getDummyTransaction()]
  } else if(props.state.recipients == 2) {
    if(!transactions.value) transactions.value = []

    let counter = Math.random() * 4 + 1
    while(counter-- > 0) {
      transactions.value.push(getDummyTransaction())
    }
  }

  console.log('Updated transactions:', props.state, transactions.value)
}
</script>

<template>
  <KitScreen class="send-review">
    <KitTopBar
      buttonLeftLabel="Edit"
      buttonLeftTo="/screen/send?t=slide-down"
    />
    <template v-if="stateId == 'send-review' && state">
      <Transition mode="out-in" name="fade">
        <div class="content-wrap" v-if="!isSent">
          <div class="info">
            <h3>Review transaction</h3>
            <p v-if="transactions?.length > 1">There are {{ transactions.length }} recipients.</p>

            <template v-if="transactions && transactions.length == 1">
              <ScreensSendReviewSingleRecipient
                :info="transactions[0]"
              />
            </template>

            <template v-if="transactions && transactions.length > 1">
              <ScreensSendReviewMultipleRecipients
                :info="transactions"
              />
            </template>

            <ScreensSendChecks
              :visualPreview="true"
            />
          </div>
          <div class="bottom">
            <KitButton
              label="Send"
              @click="send"
            />
          </div>
        </div>
        <ScreensSendReviewSentConfirmation
          v-else
        />
      </Transition>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.send-review {
  .content-wrap {
    width: 100%;
    max-width: 560px;

    .info {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      width: 100%;
      max-width: 600px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;
    }

    .bottom {
      max-width: 600px;
    }
  }

  @include container(small) {
    .content-wrap {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .bottom {
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-end;
      }
    }
  }
}

</style>
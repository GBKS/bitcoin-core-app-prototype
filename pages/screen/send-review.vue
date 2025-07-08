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
const transactions = ref(null)
const isSent = ref(false)

function send() {
  isSent.value = true
}

onMounted(() => {
  const state = stateStore.send
  if(state && state.transactions) {
    transactions.value = state.transactions
  } else {
    transactions.value = [getDummyTransaction()]
  }
})

function getDummyTransaction() {
  const transaction = StateHelper.transaction(null, 'send')
  transaction.note = transaction.title
  return transaction
}

// For testing, switches between single recipient and multiple recipients
function toggleDummyData() {
  if(transactions.value.length > 1) {
    transactions.value = [getDummyTransaction()]
  } else {
    transactions.value.push(getDummyTransaction())
  }
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
        <div class="content" v-if="!isSent">
          <div class="info">
            <h3 @click="toggleDummyData">Review transaction</h3>
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
  .content {
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
      flex-direction: row;
      max-width: 600px;

      ::v-deep(> *) {
        flex-grow: 1;
      }
    }
  }
}

</style>
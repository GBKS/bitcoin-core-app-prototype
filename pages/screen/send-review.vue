<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"

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
  console.log('balls', state)
  if(state && state.transactions) {
    transactions.value = state.transactions
  }
})
</script>

<template>
  <KitScreen class="send-review">
    <template v-if="stateId == 'send-review' && state">
      <Transition mode="out-in" name="fade">
        <div class="content" v-if="!isSent">
          <div class="info">
            <h3>Review transaction</h3>
            <ScreensSendReviewSingleTransaction
              v-for="(transaction, index) in transactions"
              :key="index"
              :info="transaction"
            />
          </div>
          <div class="bottom">
            <KitButton
              label="Edit"
              theme="outline"
              to="/screen/send?t=slide-down"
            />
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
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 

  .info {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .bottom {
    flex-direction: row;
    max-width: 600px;

    ::v-deep(> *) {
      flex-grow: 1;
    }
  }
}

</style>
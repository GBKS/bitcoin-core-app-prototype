<script setup>
import { useStateStore } from "@/stores/state.js"
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()

const balanceContent = computed(() => {
  return props.state.title
})

const wallets = computed(() => {
  return stateStore.wallets
})

const transactions = computed(() => {
  return stateStore.transactions[stateStore.activeWalletId]
})

const classObject = computed(() => {
  const c = ['activity']

  if(stateStore.showWalletModal) {
    c.push('-modal-active')
  }

  return c.join(' ')
})

function toggleModal() {
  stateStore.showWalletModal = !stateStore.showWalletModal
}

function setActiveWalletId(value) {
  stateStore.activeWalletId = value

  stateStore.showWalletModal = false
}

onBeforeUnmount(() => {
  stateStore.showWalletModal = false
})
</script>

<template>
  <KitScreen :class="classObject">
    <template v-if="stateId == 'activity'">
      <div class="cover" @click="toggleModal" />
      <div class="top-mobile">
        <NavMobileBlockClock
        />
        <NavMobileWallet />
        <KitButton
          icon="gear"
          size="big"
          theme="free"
          to="/screen/settings?t=slide-left"
        />
      </div>
      <ScreensActivityButtons
        icon="roundedArrowUp"
        label="Send"
        to="/screen/send?t=slide-up"
      />
      <div class="list-header" v-if="!state.empty">
        <h5 class="-title-5">Activity</h5>
        <KitButton
          icon="search"
          theme="free"
        />
      </div>
      <template v-if="state.empty">
        <p class="empty-note -body-5">Your transactions will show up here once you start sending and receiving.</p>
      </template>
      <div class="list -dividers" v-if="!state.empty">
        <KitTransactionItem
          v-for="(item, index) in transactions"
          :key="index"
          :title="item.title"
          :description="item.description"
          :amount="item.amount"
          :address="item.address"
          to="/screen/transaction?t=slide-left"
        />
      </div>
    </template>
  </KitScreen>
</template>


<style scoped lang="scss">

.activity {
  .top-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    max-width: 640px;
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    max-width: 640px;
    padding-left: 20px;
    padding-right: 20px;

    > * {
      border-top: 1px solid var(--neutral-2);
      width: 100%;
      max-width: 600px;
    }

    &.-dividers {
      > * + * {
        border-top: 1px solid var(--neutral-2);
      }
    }
  }

  p.empty-note {
    text-align: center;
    padding: 40px 20px;
  }

  @include container(small) {
    position: relative;

    .cover {
      display: block;
      content: '';
      position: fixed;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      background-color: var(--neutral-9);
      transition: opacity 400ms $ease;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
      // pointer-events: none;
    }

    &.-modal-active {
      .cover {
        width: 100%;
        height: 100%;
        opacity: 0.5;
        pointer-events: auto;
      }
    }
  }

  @include container(medium-up) {
    .top-mobile {
      display: none;
    }

    .list-header {
      padding-top: 30px;

      h5 {
        font-size: 21px;
      }
    }
  }
}

</style>
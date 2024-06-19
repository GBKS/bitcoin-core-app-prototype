<script setup>
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

const stateStore = useStateStore()

function setActiveWalletId(value) {
  stateStore.activeWalletId = value

  stateStore.wallets[value].lastOpen = Date.now()

  stateStore.showWalletModal = false
}

function removeWallet(id) {
  stateStore.activeWalletId = null

  delete stateStore.wallets[id]
  delete stateStore.transactions[id]

  if(Object.keys(stateStore.wallets).length == 0) {
    stateStore.showWalletModal = false
  }
}

function closeWallet(id) {
  stateStore.activeWalletId = null

  // stateStore.showWalletModal = false
}

function closeModal() {
  stateStore.showWalletModal = false
}

function addDummyWallet() {
  const walletId = StateHelper.addWallet()
}

const sortedWalletIds = computed(() => {
  return Object.keys(stateStore.wallets).sort((a, b) => {
    return stateStore.wallets[b].lastOpen - stateStore.wallets[a].lastOpen
  })
})

const classObject = computed(() => {
  const c = ['wallet-modal']

  if(stateStore.showWalletModal) c.push('-active')

  return c.join(' ')
})
</script>

<template>
  <div :class="classObject">
    <div class="content">
      <div class="drag-indicator" />
      <h5 class="-title-6 -title-4-mobile" @click="addDummyWallet">Your wallets</h5>
      <div class="list">
        <UiWalletModalItem
          v-for="id in sortedWalletIds"
          :key="id"
          :id="id"
          @select="setActiveWalletId"
          @remove="removeWallet"
          @close="closeWallet"
        />
      </div>
      <KitButton
        icon="plus"
        iconPosition="left"
        label="Add wallet"
        theme="free-subtle"
        size="small"
        to="/screen/add-wallet?t=slide-up"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.wallet-modal {
  background-color: var(--neutral-0);
  display: flex;
  align-items: stretch;
  gap: 5px;
  z-index: 2;

  .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;

    h5 {
      text-align: center;
    }

    .list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      max-height: 300px;
      overflow-y: scroll;
    }
  }

  @include container(small) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid var(--neutral-4);
    border-top-left-radius: var(--corner-radius);
    border-top-right-radius: var(--corner-radius);
    transform: translateY(100%);
    transition: all 400ms $ease;

    .content {
      margin-top: 10px;
      flex-basis: 100%;
      gap: 10px;
      padding: 10px 15px 30px 15px;

      .drag-indicator {
        width: 50px;
        height: 5px;
        border-radius: 5px;
        background-color: var(--neutral-3);
        align-self: center;
      }

      .list {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    &.-active {
      transform: translateY(0%);
    }
  }

  @include container(medium-up) {
    position: absolute;
    top: calc(100% + 3px);
    left: 5px;
    border-radius: var(--corner-radius);
    border: 1px solid var(--neutral-4);

    .content {      
      padding: 15px 5px 10px 5px;

      .drag-indicator {
        display: none;
      }

      .list {
        margin-top: 5px;
        margin-bottom: 5px;
      }

      &:after {
        display: block;
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        width: 14px;
        height: 14px;
        background-color: var(--neutral-0);
        border-top: 1px solid var(--neutral-4);
        border-right: 1px solid var(--neutral-4);
        border-top-right-radius: 3px;
        transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg);
      }
    }
  }
}

</style>

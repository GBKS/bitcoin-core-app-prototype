<script setup>
import { useStateStore } from "@/stores/state.js"

import Icons from '@/helpers/icons.js'

const props = defineProps([
  'activeId'
])

const stateStore = useStateStore()

const classObject = computed(() => {
  const c = ['nav-mobile-wallet']

  if(stateStore.showWalletModal) {
    c.push('-modal-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return Icons[walletData.value.icon]
})

function toggleModal() {
  window.emitter.emit('toggle-wallet-modal')
}

function toggleBalanceMode() {
  let mode = 'bitcoin'
  switch(stateStore.balanceDisplayMode) {
    case 'bitcoin':
      mode = 'satoshi'
      break
    case 'satoshi':
      mode = 'hide'
      break
  }
  stateStore.balanceDisplayMode = mode
}

function changeActiveWalletId(value) {
  stateStore.activeWalletId = value

  window.emitter.emit('hide-wallet-modal')
}

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})
</script>

<template>
  <div
    v-if="stateStore.activeWalletId"
    :class="classObject"
  >
    <div class="top" @click="toggleModal">
      <div
        v-if="false"
        class="icon"
        v-html="icon"
      />
      <p class="-title-4">{{ walletData.name }}</p>
    </div>
    <KitBalance
      v-if="!stateStore.walletIsLoading"
      class="balance -body-3"
      :amount="walletData.balance"
      :unit="stateStore.balanceDisplayMode"
      theme="dark"
      @click="toggleBalanceMode"
    />
    <NavMobileWalletSkeleton
      v-if="stateStore.walletIsLoading"
    />
  </div>
</template>

<style scoped lang="scss">

.nav-mobile-wallet {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  cursor: pointer;
  margin: 50px 5px 5px 5px;
  padding: 0 10px 0 5px;
  transition: all 150ms $ease;

  .top {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 3px 15px 3px 6px;
    border-radius: 100px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      color: var(--neutral-7);

      ::v-deep(svg) {
        width: 20px;
        height: 20px;
      }
    }
  }

  .balance {
    border-radius: 100px;
    padding: 5px 15px;
  }

  &.-active {

  }

  @include container(medium-up) {
    .top {
      &:hover {
        background-color: var(--neutral-2);
      }
    }

    .balance {
      &:hover {
        background-color: var(--neutral-2);
      }
    }
  }
}

</style>

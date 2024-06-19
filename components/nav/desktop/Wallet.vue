<script setup>
import { useStateStore } from "@/stores/state.js"

import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()
const active = ref(false)

const classObject = computed(() => {
  const c = []

  if(active.value) {
    c.push('-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return walletData.value ? Icons[walletData.value.icon] : null
})

function click(event) {
  if(event.shiftKey) {
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
    
    event.preventDefault()
    event.stopPropagation()
  } else {
    stateStore.toggleWalletModal()
  }
}

function toggleModal() {
  stateStore.toggleWalletModal()
}

function changeActiveWalletId(value) {
  stateStore.activeWalletId = value

  stateStore.showWalletModal = false
}

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})

const hasWallets = computed(() => {
  return Object.keys(stateStore.wallets).length > 0
})
</script>

<template>
  <div class="nav-desktop-wallet">
    <KitButton
      v-if="!stateStore.activeWalletId && !hasWallets"
      class="add-wallet"
      to="/screen/add-wallet?t=slide-up"
      icon="plus"
      icon-position="left"
      label="Add wallet"
      theme="free-subtle"
      size="small"
    />

    <KitButton
      v-if="!stateStore.activeWalletId && hasWallets"
      class="open-wallet"
      icon="wallet"
      title="Open wallet"
      theme="free-subtle"
      size="medium"
      @click="toggleModal"
    />
    
    <NavDesktopActiveWallet 
      v-if="stateStore.activeWalletId && hasWallets"
      @select="toggleModal"
    />
    <UiWalletModal
      v-if="stateStore.showWalletModal"
    />
  </div>
</template>

<style scoped lang="scss">

.nav-desktop-wallet {
  display: flex;
  align-items: stretch;
  padding: 5px;

  ::v-deep(.add-wallet) {
    height: auto;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }

  ::v-deep(.open-wallet) {
    height: auto;
    width: 59px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
}

</style>

<script setup>
import { useStateStore } from "@/stores/state.js"

import Icons from '@/helpers/icons.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const activeWalletElement = ref(null)
const stateStore = useStateStore()

const classObject = computed(() => {
  const c = ['nav-desktop-wallet']

  if(props.loading) {
    c.push('-loading')
  }

  return c
})

const icon = computed(() => {
  return walletData.value ? Icons[walletData.value.icon] : null
})

function toggleModal() {
  const element = document.getElementById('nav-open-wallet-button')
  window.emitter.emit('toggle-wallet-modal', { element })
}

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

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})

const hasWallets = computed(() => {
  return Object.keys(stateStore.wallets).length > 0
})
</script>

<template>
  <div :class="classObject">
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
      id="nav-open-wallet-button"
      :active="stateStore.showWalletModal"
      @click="toggleModal"
    />
    
    <NavDesktopActiveWallet 
      v-if="stateStore.activeWalletId && hasWallets"
      :loading="loading"
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

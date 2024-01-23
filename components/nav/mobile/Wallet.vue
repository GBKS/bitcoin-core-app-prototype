<script setup>
import { useStateStore } from "@/stores/state.js"

import Icons from '@/helpers/icons.js'

const props = defineProps([
  'activeId'
])

const stateStore = useStateStore()
const active = ref(false)

const classObject = computed(() => {
  const c = ['wallet']

  if(stateStore.showWalletModal) {
    c.push('-modal-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return Icons[walletData.value.icon]
})

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
</script>

<template>
  <div
    :class="classObject"
    @click="toggleModal"
  >
    <div class="top">
      <div
        class="icon"
        v-html="icon"
      />
      <p class="-title-4">{{ walletData.name }}</p>
    </div>
    <KitBalance
      class="balance -body-3"
      :amount="walletData.balance"
    />
  </div>
  <UiWalletModal
    :active="stateStore.showWalletModal"
    :info="stateStore.wallets"
    :activeId="stateStore.activeWalletId"
    @change="changeActiveWalletId"
  />
</template>

<style scoped lang="scss">

.wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 50px 5px 5px 5px;
  padding: 0 10px 0 5px;
  transition: all 150ms $ease;

  .top {
    display: flex;
    align-items: center;

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
    ::v-deep(.-nz) {
      color: var(--neutral-7);
    }
  }

  &:hover {
    background-color: var(--neutral-2);
    border-radius: var(--corner-radius);

    p,
    p ::v-deep(.-nz),
    .icon {
      color: var(--primary);
    }
  }

  &.-active {

  }
}

</style>

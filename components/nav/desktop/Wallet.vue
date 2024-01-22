<script setup>
import { useStateStore } from "@/stores/state.js"

import Icons from '@/helpers/icons.js'

const props = defineProps([
  'activeId'
])

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
  return Icons.keyFilled
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
    class="wallet"
    @click="toggleModal"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <div class="copy">
      <p class="-title-7">{{ walletData.name }}</p>
      <KitBalance
        class="-body-5"
        :amount="walletData.balance"
      />
    </div>
  </div>
  <UiWalletModal
    v-if="stateStore.showWalletModal"
  />
</template>

<style scoped lang="scss">

.wallet {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  padding: 0 10px 0 5px;
  transition: all 150ms $ease;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    color: var(--neutral-7);

    ::v-deep(svg) {
      width: 22px;
      height: 22px;
    }
  }

  .copy {
    p {
      ::v-deep(.-nz) {
        color: var(--neutral-7);
      }
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

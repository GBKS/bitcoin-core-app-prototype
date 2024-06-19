<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()

const emit = defineEmits(['select'])

const icon = computed(() => {
  return Icons[walletData.value.icon]
})

const walletData = computed(() => {
  return stateStore.wallets[stateStore.activeWalletId]
})

function toggleModal() {
  emit('toggleModal')
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

function select(event) {
  if(event.shiftKey) {
    toggleBalanceMode()
  } else {
    emit('select')
  }
}
</script>

<template>
  <button
    class="wallet"
    @click="select"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <div class="copy">
      <p class="-title-7">{{ walletData.name }}</p>
      <KitBalance
        class="-body-5"
        :unit="stateStore.balanceDisplayMode"
        :amount="walletData.balance"
        theme="dark"
      />
    </div>
  </button>
</template>

<style scoped lang="scss">

.wallet {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px 0 5px;
  transition: all 150ms $ease;
  text-align: left;

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

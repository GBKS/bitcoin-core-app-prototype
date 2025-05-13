<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const stateStore = useStateStore()

const canvas = ref(null)
const emit = defineEmits(['select'])

const classObject = computed(() => {
  const c = ['nav-desktop-active-wallet']

  if(props.loading) {
    c.push('-loading')
  }

  return c
})

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
    // emit('select')
    window.emitter.emit('toggle-wallet-modal', { element: canvas.value })
  }
}
</script>

<template>
  <button
    :class="classObject"
    ref="canvas"
    @click="select"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <div class="copy" v-if="!loading">
      <p class="-title-7">{{ walletData.name }}</p>
      <KitBalance
        class="-body-5"
        :unit="stateStore.balanceDisplayMode"
        :amount="walletData.balance"
        theme="dark"
      />
    </div>
    <NavDesktopWalletSkeleton
      v-if="loading"
    />
  </button>
</template>

<style scoped lang="scss">

.nav-desktop-active-wallet {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  padding: 0 10px 0 5px;
  transition: all 150ms $ease;
  text-align: left;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    flex-shrink: 0;
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

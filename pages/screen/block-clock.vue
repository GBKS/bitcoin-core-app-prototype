<script setup>
import { useStateStore } from "@/stores/state.js"
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const state = useStateStore()

const showWalletButton = computed(() => {
  return !state.activeWalletId
})

function walletClick() {
  window.emitter.emit('toggle-wallet-modal')
}
</script>

<template>
  <KitScreen class="block-clock">
    <template v-if="stateId == 'block-clock' && state">
      <div class="top">
        <KitTopBar
          v-if="!showWalletButton"
          buttonRightIcon="caretRight"
          buttonRightTo="/screen/activity?t=slide-left"
        />
        <KitTopBar
          v-if="showWalletButton"
          buttonLeftIcon="wallet"
          @leftClick="walletClick"
          buttonRightIcon="gear"
          buttonRightTo="/screen/settings?t=slide-left"
        />
      </div>
      <h1>Block clock</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.block-clock {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  }
  
  .top {
    width: 100%;
  }

  @include container(medium-up) {
    .top {
      display: none;
    }
  }
}

</style>
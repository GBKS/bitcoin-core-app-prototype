<script setup>
import { useStateStore } from "@/stores/state.js"

const stateStore = useStateStore()
</script>

<template>
  <div class="top">
    <div class="left">
      <NavDesktopWallet />
    </div>
    <NavDesktopTabs v-if="stateStore.activeWalletId" />
    <div class="right">
      <UiNetworkIndicator
        label="Testnet"
        color="green"
        :small="true"
      />
      <NavDesktopBlockClock />
      <NavDesktopOptions />
    </div>
  </div>
</template>

<style scoped lang="scss">

.top {
  display: flex;
  gap: 5px;
  align-items: stretch;
  position: relative;
  border-bottom: 1px solid var(--neutral-4);
  height: 60px;
  padding-right: 15px;
  width: 100%;

  .left,
  .right {
    display: flex;
    flex-grow: 1;
    gap: 5px;
    flex-basis: 10%;
  }

  .left {
    align-items: stretch;
  }

  .right {
    justify-content: flex-end;
    align-items: center;
  }

  @include container(small) {
    display: none;
  }
}

</style>

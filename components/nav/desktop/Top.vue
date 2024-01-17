<script setup>
const props = defineProps([

])

const activeId = ref(null)
</script>

<template>
  <div class="top">
    <div class="left">
      <NavDesktopWallet
        :activeId="activeId"
      />
    </div>
    <NavDesktopTabs 
      :activeId="activeId" 
    />
    <div class="right">
      <UiNetworkIndicator
        label="Testnet"
        color="green"
        :small="true"
      />
      <NavDesktopBlockClock />
      <NavDesktopOptions 
        :activeId="activeId" 
      />
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

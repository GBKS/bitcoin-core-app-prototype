<script setup>
import { useStateStore } from "@/stores/state.js"

const stateStore = useStateStore()

function setActiveWalletId(value) {
  stateStore.activeWalletId = value

  stateStore.showWalletModal = false
}

function closeModal() {
  stateStore.showWalletModal = false
}

const classObject = computed(() => {
  const c = ['wallet-modal']

  if(stateStore.showWalletModal) c.push('-active')

  return c.join(' ')
})
</script>

<template>
  <div :class="classObject">
    <div class="content">
      <div class="drag-indicator" />
      <h5>Wallets</h5>
      <div class="list">
        <UiWalletModalItem
          v-for="(item, id) in stateStore.wallets"
          :key="id"
          :id="id"
          :info="item"
          :activeId="stateStore.activeWalletId"
          @click="setActiveWalletId(id)"
        />
      </div>
      <KitButton
        icon="plus"
        iconPosition="left"
        label="Add wallet"
        theme="free"
        size="small"
        to="/screen/add-wallet?t=slide-up"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.wallet-modal {
  background-color: var(--neutral-0);
  display: flex;
  align-items: stretch;
  gap: 5px;
  z-index: 2;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 10px 15px;

    .list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
  }

  @include container(small) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid var(--neutral-4);
    border-top-left-radius: var(--corner-radius);
    border-top-right-radius: var(--corner-radius);
    transform: translateY(100%);
    transition: all 400ms $ease;

    .content {
      margin-top: 10px;
      flex-basis: 100%;
      gap: 10px;
      padding-bottom: 30px;

      .drag-indicator {
        width: 50px;
        height: 5px;
        border-radius: 5px;
        background-color: var(--neutral-3);
      }

      h5 {
        
      }

      .list {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    &.-active {
      transform: translateY(0%);
    }
  }

  @include container(medium-up) {
    position: absolute;
    top: calc(100% + 3px);
    left: 5px;
    border-radius: var(--corner-radius);
    border: 1px solid var(--neutral-4);

    .content {      
      .drag-indicator,
      h5 {
        display: none;
      }

      .list {
        margin-bottom: 5px;
      }

      &:after {
        display: block;
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        width: 14px;
        height: 14px;
        background-color: var(--neutral-0);
        border-top: 1px solid var(--neutral-4);
        border-right: 1px solid var(--neutral-4);
        border-top-right-radius: 3px;
        transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg);
      }
    }
  }
}

</style>

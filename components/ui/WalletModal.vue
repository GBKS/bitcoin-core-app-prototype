<script setup>
const props = defineProps([
  'activeId',
  'info'
])

const emit = defineEmits(['change'])

function setActiveWalletId(value) {
  emit('change', value)
}
</script>

<template>
  <div class="wallet-modal">
    <div class="content">
      <div class="list">
        <UiWalletModalItem
          v-for="(item, id) in info"
          :key="id"
          :id="id"
          :info="item"
          :activeId="activeId"
          @click="setActiveWalletId(id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.wallet-modal {
  background-color: var(--neutral-0);
  position: absolute;
  top: calc(100% + 3px);
  left: 5px;
  transform: translate(0, 0);
  display: flex;
  align-items: stretch;
  gap: 5px;
  border-radius: var(--corner-radius);
  border: 1px solid var(--neutral-4);
  z-index: 1;

  .content {
    position: relative;
    padding: 10px 15px;

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

    .list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
  }
}

</style>

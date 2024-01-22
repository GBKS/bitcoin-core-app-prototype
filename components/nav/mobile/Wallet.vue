<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'activeId'
])

const active = ref(false)
const showModal = ref(false)
const activeWalletId = ref('savings')

const classObject = computed(() => {
  const c = ['wallet']

  if(showModal.value) {
    c.push('-modal-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return Icons.keyFilled
})

function toggleModal() {
  showModal.value = !showModal.value
}

function changeActiveWalletId(value) {
  activeWalletId.value = value
}

const walletData = computed(() => {
  return wallets[activeWalletId.value]
})

const wallets = {
  savings: {
    name: 'Savings',
    balance: 0.00167930,
    icon: 'keyFilled'
  },
  family: {
    name: 'Family',
    balance: 0.03421765,
    icon: 'twoKeys'
  },
  cold: {
    name: 'Cold storage',
    balance: 0.17000000,
    icon: 'eye'
  }
}
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
    :active="showModal"
    :info="wallets"
    :activeId="activeWalletId"
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

  @include container(small) {
    position: relative;

    &:before {
      display: block;
      content: '';
      position: fixed;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      background-color: var(--neutral-9);
      transition: opacity 400ms $ease;
      opacity: 0;
      z-index: 1;
      pointer-events: none;
    }

    &.-modal-active {
      &:before {
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
    }
  }
}

</style>

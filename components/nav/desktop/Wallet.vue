<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'activeId'
])

const active = ref(false)
const showModal = ref(false)
const activeWalletId = ref('savings')

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
    v-if="showModal"
    :info="wallets"
    :activeId="activeWalletId"
    @change="changeActiveWalletId"
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

<script setup>
import { useStateStore } from "@/stores/state.js"
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()

const hasWallets = computed(() => {
  return Object.keys(stateStore.wallets).length > 0
})

const backButtonId = computed(() => {
  let result = 'buttonBack'
  const isDefault = props.state.name == 'Default'

  if(isDefault && !hasWallets.value) {
    result = 'buttonBackNoWallets'
  }

  return result
})

const backButtonLabel = computed(() => {
  return props.state[backButtonId.value].label
})

const backButtonIcon = computed(() => {
  return props.state[backButtonId.value].icon
})

const backButtonTo = computed(() => {
  return props.state[backButtonId.value].to
})
</script>

<template>
  <KitScreen class="add-wallet">
    <template v-if="stateId == 'add-wallet' && state">
      <KitTopBar
        :buttonLeftLabel="backButtonLabel"
        :buttonLeftIcon="backButtonIcon"
        :buttonLeftTo="backButtonTo"
      />
      <div class="illustration" />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="bottom">
        <KitButton
          :label="state.buttonOne.label"
          :to="state.buttonOne.to"
        />
        <KitButton
          :label="state.buttonTwo.label"
          :to="state.buttonTwo.to"
          theme="outline"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.add-wallet {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-image: var(--wallet-illustration);
    background-size: cover;

    @include retina() {
      background-image: var(--wallet-illustration-2x);
    }
  }
}

</style>
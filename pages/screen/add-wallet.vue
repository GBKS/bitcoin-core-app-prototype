<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="add-wallet">
    <template v-if="stateId == 'add-wallet' && state">
      <KitTopBar
        :buttonLeftLabel="state.buttonBack.label"
        :buttonLeftIcon="state.buttonBack.icon"
        :buttonLeftTo="state.buttonBack.to"
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
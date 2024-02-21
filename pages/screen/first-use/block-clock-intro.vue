<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="block-clock-intro">
    <template v-if="stateId == 'first-use/block-clock-intro' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/strengthen-bitcoin?t=slide-right"
      />
      <div class="illustration" />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="bottom">
        <KitButton
          :label="state.button.label"
          :to="state.button.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.block-clock-intro {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-image: var(--block-clock-illustration);
    background-size: cover;

    @include retina() {
      background-image: var(--block-clock-illustration-2x);
    }
  }
}

</style>
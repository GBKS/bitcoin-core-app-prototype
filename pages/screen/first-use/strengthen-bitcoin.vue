<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="strengthen-bitcoin">
    <template v-if="stateId == 'first-use/strengthen-bitcoin' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/cover?t=slide-right"
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

.strengthen-bitcoin {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-image: var(--network-illustration);
    background-size: cover;

    @include retina() {
      background-image: var(--network-illustration-2x);
    }
  }
}

</style>
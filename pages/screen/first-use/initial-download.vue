<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="initial-download">
    <template v-if="stateId == 'first-use/initial-download' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/storage-amount?t=slide-right"
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
          theme="free"
        />
        <KitButton
          :label="state.buttonTwo.label"
          :to="state.buttonTwo.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.initial-download {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-image: var(--initial-download-illustration);
    background-size: cover;

    @include retina() {
      background-image: var(--initial-download-illustration-2x);
    }
  }
}

</style>
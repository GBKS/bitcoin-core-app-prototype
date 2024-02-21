<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="notification-permission">
    <template v-if="stateId == 'first-use/notification-permission' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/initial-download?t=slide-right"
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

.notification-permission {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-image: var(--notification-illustration);
    background-size: cover;

    @include retina() {
      background-image: var(--notification-illustration-2x);
    }
  }
}

</style>
<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="success">
    <template v-if="stateId == 'create/success' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/create/backup?t=slide-right"
      />
      <KitHeader
        icon="check"
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

.single-key-info {

}

</style>
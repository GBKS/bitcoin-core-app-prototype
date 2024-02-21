<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="backup">
    <template v-if="stateId == 'create/backup' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/create/password?t=slide-right"
      />
      <KitHeader
        icon="file"
        iconColor="blue"
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

.single-key-info {

}

</style>
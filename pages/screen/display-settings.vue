<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="display-settings">
    <template v-if="stateId == 'display-settings' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/settings?t=slide-right"
      />
      <KitHeader
        :title="state.title"
      />
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.display-settings {

}

</style>
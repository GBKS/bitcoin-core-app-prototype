<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="proxy-settings">
    <template v-if="stateId == 'proxy-settings' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/initial-download-options?t=slide-right"
      />
      <KitHeader
        :title="state.title"
      />
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.proxy-settings {

}

</style>
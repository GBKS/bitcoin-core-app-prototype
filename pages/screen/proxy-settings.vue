<script setup>
const route = useRoute()
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
        v-if="state.onboarding"
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/connection-settings?t=slide-right"
      />
      <KitTopBar
        v-if="!state.onboarding"
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/settings?t=slide-right"
        :title="state.title"
      />
      <KitHeader
        v-if="state.onboarding"
        :title="state.title"
      />
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.proxy-settings {

}

</style>
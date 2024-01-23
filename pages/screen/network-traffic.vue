<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="network-traffic">
    <template v-if="stateId == 'network-traffic' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftLabel="Back"
        buttonLeftTo="/screen/settings?t=slide-right"
      />
      <h1>Network traffic</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.network-traffic {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  }
}

</style>
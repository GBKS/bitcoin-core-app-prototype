<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="peers">
    <template v-if="stateId == 'peers' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftLabel="Back"
        buttonLeftTo="/screen/settings?t=slide-right"
      />
      <h1>Peers</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.peers {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
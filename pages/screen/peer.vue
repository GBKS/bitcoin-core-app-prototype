<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="peer">
    <template v-if="stateId == 'peer' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftLabel="Back"
        buttonLeftTo="/screen/peers?t=slide-right"
      />
      <h1>Peer</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.peer {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
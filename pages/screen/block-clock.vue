<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="block-clock">
    <template v-if="stateId == 'block-clock' && state">
      <h1>Block clock</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.block-clock {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
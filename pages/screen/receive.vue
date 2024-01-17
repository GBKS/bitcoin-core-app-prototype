<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="receive">
    <template v-if="stateId == 'receive' && state">
      <h1>Receive</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.receive {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
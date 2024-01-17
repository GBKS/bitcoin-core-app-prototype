<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="send">
    <template v-if="stateId == 'send' && state">
      <h1>Send</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.send {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="transaction">
    <template v-if="stateId == 'transaction' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/activity?t=slide-right"
      />
      <h1>Transaction</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.transaction {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
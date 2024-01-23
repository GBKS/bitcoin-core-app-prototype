<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="payment-request">
    <template v-if="stateId == 'payment-request' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftLabel="Back"
        buttonLeftTo="/screen/receive?t=slide-right"
      />
      <h1>Payment request</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.payment-request {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
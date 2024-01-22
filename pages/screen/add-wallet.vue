<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="add-wallet">
    <template v-if="stateId == 'add-wallet' && state">
      <KitTopBar
        buttonLeftLabel="Cancel"
        buttonLeftTo="/screen/activity?t=slide-down"
      />
      <h1>Add wallet</h1>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.add-wallet {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
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
      <div class="top-mobile">
        <KitTopBar
          buttonLeftLabel="Cancel"
          buttonLeftTo="/screen/activity?t=slide-down"
        />
      </div>
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
  
  .top-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  @include container(medium-up) {
    .top-mobile {
      display: none;
    }
  }
}

</style>
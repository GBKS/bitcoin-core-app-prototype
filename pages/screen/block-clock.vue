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
      <div class="top">
        <KitTopBar
          buttonRightIcon="caretRight"
          buttonRightTo="/screen/activity?t=slide-left"
        />
      </div>
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
  
  .top {
    width: 100%;
  }

  @include container(medium-up) {
    .top {
      display: none;
    }
  }
}

</style>
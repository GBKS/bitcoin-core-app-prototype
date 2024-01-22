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
      <div class="top-mobile">
        <KitTopBar
          buttonLeftLabel="Cancel"
          buttonLeftTo="/screen/activity?t=slide-down"
        />
      </div>
      <h1>Send</h1>
      <div class="bottom">
        <KitButton
          label="Review"
          to="/screen/send-review?t=slide-left"
        />
      </div>
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
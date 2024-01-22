<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="send-review">
    <template v-if="stateId == 'send-review' && state">
      <KitTopBar
        buttonLeftIcon="caretLeft"
        buttonLeftLabel="Back"
        buttonLeftTo="/screen/send?t=slide-right"
      />
      <h1>Send review</h1>
      <div class="bottom">
        <KitButton
          label="Send"
          to="/screen/activity?t=slide-down"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.send-review {
  h1 {
    text-align: center;
    padding: 50px 0px;
    color: var(--neutral-5);
  } 
}

</style>
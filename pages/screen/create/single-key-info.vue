<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="single-key-info">
    <template v-if="stateId == 'create/single-key-info' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/add-wallet?t=slide-right"
      />
      <KitHeader
        icon="alert"
        :title="state.title"
      />

      <div class="copy">
        <p class="-body-5">You can fully control it in this application.</p>
        <p class="-body-5">Wallet data will be stored locally on your hard drive.</p>
        <p class="-body-5">You can optionally protect it with a password.</p>
      </div>

      <div class="bottom">
        <KitButton
          :label="state.button.label"
          :to="state.button.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.single-key-info {
  .content {
    .copy {
      padding: 0 10px;

      > p {
        text-align: center;
        padding: 10px 0;

        &:first-of-type {
          margin-top: 20px;
        }

        & + p {
          border-top: 1px solid var(--neutral-4);
        }
      }
    }
  }
}

</style>
<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="name">
    <template v-if="stateId == 'create/name' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/add-wallet?t=slide-right"
        :title="state.title"
      />

      <div class="list">
        <KitItemFrame>
          <KitItemLeft
            title="Choose a wallet name"
            description="Name..."
          />
        </KitItemFrame>
        <p class="-body-6" v-html="state.description" />
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

.name {
  .list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 450px;
    padding: 30px 20px;

    > p {
      border-top: 1px solid var(--neutral-2);
      padding: 15px 0;
    }
  }
}

</style>
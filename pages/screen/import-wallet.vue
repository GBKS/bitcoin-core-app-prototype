<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="import-wallet">
    <template v-if="stateId == 'import-wallet' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/add-wallet?t=slide-right"
      />
      <KitHeader
        icon="wallet"
        iconColor="blue"
        :title="state.title"
      />

      <div class="wrap">
        <KitButton
          :label="state.buttonOne.label"
          :to="state.buttonOne.to"
        />

        <p class="or"><span>or</span></p>

        <div class="text-wrap">
          <div class="input-wrap">
            <textarea class="-body-5" placeholder="Enter wallet information..." />
          </div>

          <p class="-body-6" v-html="state.description" />
          
          <KitButton
            class="button"
            :label="state.buttonTwo.label"
            :to="state.buttonTwo.to"
            theme="outline"
            :disabled="true"
          />
        </div>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.import-wallet {
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 30px;
    width: 100%;
    max-width: 490px;
    padding: 30px 20px;

    p.or {
      position: relative;
      text-align: center;

      span {
        background-color: var(--neutral-0);
        padding: 0 30px;
        position: relative;
      }

      &:before {
        display: block;
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        right: 0;
        border-top: 1px dotted var(--neutral-4);
      }
    }

    .text-wrap {
      .input-wrap {
        textarea {
          box-sizing: border-box;
          height: auto;
          width: 100%;
          appearance: none;
          border-radius: 5px;
          background-color: var(--neutral-2);
          border-width: 0;
          padding: 20px 15px;
        }
      }

      > p {
        margin-top: 15px;
        text-align: center;
      }

      ::v-deep(.button) {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
}

</style>
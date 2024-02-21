<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="password">
    <template v-if="stateId == 'create/password' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/add-wallet?t=slide-right"
        :title="state.title"
        buttonRightLabel="Skip"
        :buttonRightTo="state.button.to"
      />

      <div class="wrap">
        <p class="-body-6" v-html="state.description" />

        <div class="list">
          <KitItemFrame>
            <KitItemLeft
              title="Choose a password"
              description="Password..."
            />
            <KitItemRight
              icon="eye"
            />
          </KitItemFrame>
          <KitItemFrame>
            <KitItemLeft
              title="Confirm password"
              description="Password..."
            />
            <KitItemRight
              icon="eye"
            />
          </KitItemFrame>
          <KitItemFrame>
            <KitItemLeft
              description="I wrote down this password, and understand that if I lose it, I might lose access to the bitcoin stored in this wallet."
            />
            <KitItemRight
              :toggle="true"
            />
          </KitItemFrame>
        </div>
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

.password {
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    max-width: 450px;
    padding: 30px 20px;

    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
}

</style>
<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="about">
    <template v-if="stateId == 'about' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/cover?t=slide-right"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="list">
        <KitItemFrame url="https://bitcoincore.org">
          <KitItemLeft
            title="Website"
          />
          <KitItemRight
            title="bitcoincore.org"
            icon="link"
          />
        </KitItemFrame>
        <KitItemFrame url="https://github.com/bitcoin/bitcoin">
          <KitItemLeft
            title="Source code"
          />
          <KitItemRight
            title="github.com/bitcoin/bitcoin"
            icon="link"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="License"
          />
          <KitItemRight
            title="MIT"
            icon="link"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Version"
          />
          <KitItemRight
            title="v22.99.0-1e7564eca8a6"
            icon="link"
          />
        </KitItemFrame>
        <KitItemFrame to="/screen/developer-options?t=slide-left">
          <KitItemLeft
            title="Developer options"
            description="Only use these if you have development experience."
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="About QT"
          />
          <KitItemRight
            icon="link"
          />
        </KitItemFrame>
      </div>
    </template>
  </KitScreen>
</template>


<style scoped lang="scss">

.about {
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
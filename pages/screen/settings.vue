<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="settings">
    <template v-if="stateId == 'settings' && state">
      <div class="top-mobile">
        <KitTopBar
          buttonLeftIcon="caretLeft"
          :title="state.title"
          buttonLeftTo="/screen/activity?t=slide-right"
        />
      </div>
      <div class="top-desktop">
        <KitHeader
          title="Settings"
        />
      </div>
      <div class="list">
        <KitItemFrame>
          <KitItemLeft
            title="About"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Display"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Storage"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Connection"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Peers"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Network traffic"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
        <KitItemFrame to="/screen/snapshot?t=slide-left">
          <KitItemLeft
            title="Snapshot"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.settings {
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

  @include container(small) {
    .top-desktop {
      display: none;
    }
  }
}

</style>
<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const darkModeActive = ref(false)
</script>

<template>
  <KitScreen class="developer-options">
    <template v-if="stateId == 'developer-options' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/about?t=slide-right"
      />
      <KitHeader
        :title="state.title"
      />
      <div class="list">
        <KitItemFrame url="https://bitcoincore.org">
          <KitItemLeft
            title="Developer documentation"
          />
          <KitItemRight
            icon="linkBox"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Database cache size"
          />
          <KitItemRight
            title="450 MiB"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Script verification threads"
          />
          <KitItemRight
            title="0"
            :editable="true"
          />
        </KitItemFrame>
        <KitItemFrame @select="darkModeActive = !darkModeActive">
          <KitItemLeft
            title="Dark mode"
          />
          <KitItemRight
            :toggle="true"
            :active="darkModeActive"
          />
        </KitItemFrame>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.developer-options {
  .list {
    margin-top: 30px;
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
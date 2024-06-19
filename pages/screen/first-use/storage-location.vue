<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const activeId = ref('default')
</script>

<template>
  <KitScreen class="storage-location">
    <template v-if="stateId == 'first-use/storage-location' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/storage-amount?t=slide-right"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="list">
        <KitItemFrame
          :frame="true"
          :active="!state.folder"
        >
          <KitItemLeft
            title="Default"
            description="Your application directory. 35 GB available."
          />
          <KitItemRight
            :icon="!state.folder ? 'check' : null"
          />
        </KitItemFrame>
        <KitItemFrame
          :frame="true"
          :active="state.folder"
        >
          <KitItemLeft
            title="Custom"
            description="Choose the directory and storage device."
            :folder="state.folder"
          />
          <KitItemRight
            :icon="state.folder ? 'check' : null"
          />
        </KitItemFrame>
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

.storage-location {
  .list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    width: 100%;
    max-width: 450px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
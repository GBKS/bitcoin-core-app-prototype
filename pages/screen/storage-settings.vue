<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const recentBlocksActive = ref(false)
</script>

<template>
  <KitScreen class="storage-settings">
    <template v-if="stateId == 'storage-settings' && state">
      <KitTopBar
        buttonRightLabel="Done"
        buttonRightTo="/screen/first-use/storage-amount?t=slide-down"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="list">
        <KitItemFrame @select="recentBlocksActive = !recentBlocksActive">
          <KitItemLeft
            title="Store recent blocks only"
          />
          <KitItemRight
            :toggle="true"
            :active="recentBlocksActive"
          />
        </KitItemFrame>
        <KitItemFrame>
          <KitItemLeft
            title="Storage limit (GB)"
          />
          <KitItemRight
            title="2"
          />
        </KitItemFrame>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.storage-settings {
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
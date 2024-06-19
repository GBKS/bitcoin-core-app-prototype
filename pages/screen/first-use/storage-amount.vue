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
  <KitScreen class="storage-amount">
    <template v-if="stateId == 'first-use/storage-amount' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/block-clock-intro?t=slide-right"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="list">
        <KitItemFrame
          :frame="true"
          :active="activeId == 'default'"
          @select="activeId = 'default'"
        >
          <KitItemLeft
            title="Reduce storage"
            description="Uses about 2GB. For regular wallet use."
          />
          <KitItemRight
            :icon="activeId == 'default' ? 'check' : null"
          />
        </KitItemFrame>
        <KitItemFrame
          :frame="true"
          :active="activeId == 'all'"
          @select="activeId = 'all'"
        >
          <KitItemLeft
            title="Store all data"
            description="Uses about 440GB. Support the network."
          />
          <KitItemRight
            :icon="activeId == 'all' ? 'check' : null"
          />
        </KitItemFrame>
      </div>
      <div class="bottom">
        <KitButton
          :label="state.buttonTwo.label"
          :to="state.buttonTwo.to"
          theme="free"
        />
        <KitButton
          :label="state.buttonOne.label"
          :to="state.buttonOne.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.storage-amount {
  .list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 450px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
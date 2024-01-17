<script setup>
const props = defineProps([
  'info',
  'activeId',
  'activeStateId'
])
</script>

<template>
  <div class="list">
    <template
      v-for="(item, itemId) in info"
      :key="itemId"
    >
      <ProtoNavItem
        :id="itemId"
        :info="item"
        :activeId="activeId"
      />
      <template
        v-if="itemId == activeId && Object.keys(item.states).length > 1"
      >
        <ProtoNavItem
          v-for="(state, stateId) in item.states"
          :key="stateId"
          :id="stateId"
          :info="state"
          :indent="true"
          :activeId="activeStateId"
        />
      </template>
    </template>
  </div>
</template>

<style scoped lang="scss">

.list {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  gap: 3px;
  padding: 10px;
}

</style>

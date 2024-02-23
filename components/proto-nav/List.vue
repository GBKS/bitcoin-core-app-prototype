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
      <h5 v-if="item.category">{{ item.category }}</h5>
      <ProtoNavItem
        :id="itemId"
        :info="item"
        :activeId="activeId"
      />
      <template v-if="itemId == activeId && Object.keys(item.states).length > 1">
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

  h5 {
    font-size: 12px;
    font-weight: 600;
    color: var(--neutral-6);
    // text-transform: uppercase;
    // border-top: 1px solid var(--neutral-4);
    margin: 0 10px;
    padding: 15px 0 0 0;
  }

  @include media-query(medium-up) {
    flex-basis: 10%;
    flex-grow: 1;
    overflow-y: scroll;
  }
}

</style>

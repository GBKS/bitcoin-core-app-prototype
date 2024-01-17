<script setup>
const props = defineProps([
  'activeId'
])

const info = {
  activity: {
    name: 'Activity',
    to: '/screen/activity'
  },
  send: {
    name: 'Send',
    to: '/screen/send'
  },
  receive: {
    name: 'Receive',
    to: '/screen/receive'
  }
}
</script>

<template>
  <div class="tabs">
    <NavDesktopTab
      v-for="(item, id) in info"
      :key="id"
      :id="id"
      :info="item"
      :activeId="activeId"
    />
  </div>
</template>

<style scoped lang="scss">

.tabs {
  flex-basis: 240px;
  flex-shrink: 1;
  display: flex;
  align-items: stretch;
}

</style>

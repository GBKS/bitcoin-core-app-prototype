<script setup>
const props = defineProps([
  'activeId'
])

const info = {
  // activity: {
  //   name: 'Activity',
  //   icon: 'home',
  //   to: '/screen/activity'
  // },
  send: {
    name: 'Send',
    icon: 'roundedArrowUp',
    to: '/screen/send?t=slide-up'
  },
  receive: {
    name: 'Receive',
    icon: 'roundedArrowDown',
    to: '/screen/receive?t=slide-up'
  }
}
</script>

<template>
  <div class="tabs">
    <NavMobileTab
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
  border-top: 1px solid var(--neutral-4);
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  height: 90px;
  padding-bottom: 25px;
  width: 100%;
  align-self: flex-end;

  @include container(medium-up) {
    display: none;
  }
}

</style>

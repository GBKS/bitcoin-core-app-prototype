<script setup>
const props = defineProps([
  'activeId'
])

const info = {
  settings: {
    icon: 'gear',
    to: '/screen/settings'
  }
}

</script>

<template>
  <div class="options">
    <NavDesktopOption
      v-for="(item, id) in info"
      :key="id"
      :id="id"
      :info="item"
      :activeId="activeId"
    />
  </div>
</template>

<style scoped lang="scss">

.options {
  display: flex;
  align-items: stretch;
  align-self: stretch;
}

</style>

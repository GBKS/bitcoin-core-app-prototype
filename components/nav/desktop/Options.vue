<script setup>
const props = defineProps([

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

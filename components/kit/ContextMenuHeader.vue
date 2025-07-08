<script setup>
const props = defineProps([
  'id',
  'info'
])
</script>

<template>
  <h4 class="context-menu-header -title-6 -title-5-mobile">
    {{ info.title }}
  </h4>
</template>

<style scoped lang="scss">

.context-menu-header {
  padding: 5px 0 1px 5px;
  color: var(--neutral-9);
}

</style>
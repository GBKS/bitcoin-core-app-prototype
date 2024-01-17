<script setup>
const props = defineProps([
  'title',
  'description',
  'folder'
])

</script>

<template>
  <div class="left">
    <h6 v-if="title" class="-body-5">{{ title }}</h6>
    <p v-if="description" class="description -body-6">{{ description }}</p>
    <p v-if="folder" class="folder -body-7">{{ folder }}</p>
  </div>
</template>

<style scoped lang="scss">

.left {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .folder {
    margin-top: 10px;
    padding: 6px 7px;
    background-color: var(--neutral-2);
    border-radius: var(--corner-radius);
  }
}

</style>

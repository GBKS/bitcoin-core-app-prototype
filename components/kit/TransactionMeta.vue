<script setup>
const props = defineProps([
  'description',
  'tags',
  'error'
])
</script>

<template>
  <div class="transaction-meta">
    <p class="-body-6" v-if="description">{{ description }}</p>
    <p class="-error -body-6" v-if="error">{{ error }}</p>
    <KitTags v-if="tags" :tags="tags" />
  </div>
</template>

<style scoped lang="scss">

.transaction-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 15px 0;

  p {
    color: var(--neutral-7);

    &.-error {
      color: var(--red);
    }
  }
}

</style>
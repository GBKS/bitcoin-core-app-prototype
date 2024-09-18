<script setup>
const props = defineProps([
  'activeIndex',
  'count'
])

const emit = defineEmits([
  'change',
  'add',
  'remove'
])

const title = computed(() => {
  return `Transaction ${props.activeIndex + 1} of ${props.count}`
})

function previousTransaction() {
  emit('change', props.activeIndex - 1)
}

function nextTransaction() {
  emit('change', props.activeIndex + 1)
}
</script>

<template>
  <div class="pagination">
    <h4 class="-title-5">{{ title }}</h4>
    <div class="options">
      <KitButton
        icon="caretLeft"
        theme="free"
        size="small"
        :disabled="activeIndex === 0"
        @click="previousTransaction"
      />
      <KitButton
        icon="caretRight"
        theme="free"
        size="small"
        :disabled="activeIndex === count - 1"
        @click="nextTransaction"
      />
      <KitButton
        icon="plus"
        theme="free"
        size="small"
        @click="$emit('add')"
      />
      <KitButton
        icon="cross"
        theme="free"
        size="small"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--neutral-4);

  .options {
    display: flex;
    gap: 2px;
  }
}

</style>

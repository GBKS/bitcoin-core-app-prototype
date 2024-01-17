<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'title',
  'description',
  'icon',
  'toggle',
  'active',
  'editable'
])

const icon = computed(() => {
  return Icons[props.icon]
})
</script>

<template>
  <div class="right">
    <div 
      v-if="title || description"
      class="copy" 
    >
      <h6 
        v-if="title" 
        class="-body-5"
        :contenteditable="editable ? 'true' : null"
      >{{ title }}</h6>
      <p
        v-if="description" 
        class="-body-6"
      >{{ description }}</p>
    </div>
    <div 
      v-if="icon" 
      class="icon" 
      v-html="icon"
    />
    <KitToggle
      v-if="toggle"
      :active="active"
      size="small"
    />
  </div>
</template>

<style scoped lang="scss">

.right {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  color: var(--neutral-7);

  .copy {

  }

  .icon {
    display: flex;
    align-items: center;

    ::v-deep(svg) {
      width: 16px;
      height: 16px;
    }
  }
}

</style>

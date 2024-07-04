<script setup>
const props = defineProps([
  'title',
  'buttonLeftLabel',
  'buttonLeftIcon',
  'buttonLeftTo',
  'buttonRightLabel',
  'buttonRightIcon',
  'buttonRightTo'
])

const emit = defineEmits(['leftClick', 'rightClick'])

function leftClick() {
  emit('leftClick')
}

function rightClick() {
  emit('rightClick')
}
</script>

<template>
  <div class="top-bar">
    <div class="left">
      <KitButton
        v-if="buttonLeftLabel || buttonLeftIcon"
        :label="buttonLeftLabel"
        :icon="buttonLeftIcon"
        :to="buttonLeftTo"
        iconPosition="left"
        theme="free"
        @click="leftClick"
      />
    </div>
    <h2 v-if="title" class="-title-5">{{ title }}</h2>
    <div class="right">
      <KitButton
        v-if="buttonRightLabel || buttonRightIcon"
        :label="buttonRightLabel"
        :icon="buttonRightIcon"
        :to="buttonRightTo"
        theme="free"
        @click="rightClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.top-bar {
  display: flex;
  gap: 5px;
  justify-content: stretch;
  align-items: center;
  position: relative;
  width: 100%;
  height: 46px;
  // margin-left: calc(-1 * var(--screen-side-padding) + 5px);
  // margin-right: calc(-1 * var(--screen-side-padding) + 5px);

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
    color: var(--neutral-9);
  }

  .left,
  .right {
    flex-basis: 5%;
    flex-grow: 1;
    display: flex;
  }

  .right {
    justify-content: flex-end;
  }
}

</style>

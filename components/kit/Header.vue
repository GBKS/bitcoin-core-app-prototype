<script setup>
const props = defineProps([
  'icon',
  'iconSize', 
  'iconColor',
  'title',
  'description',
  'buttonLabel',
  'buttonIcon',
  'buttonTo',
  'buttonClick',
  'big'
])

</script>

<template>
  <div class="header">
    <div class="top">
      <KitIconInCircle
        v-if="icon"
        :icon="icon"
        :size="iconSize || 'huge'"
        :color="iconColor || 'green'"
        theme="light"
      />
      <h1 
        v-if="title" 
        :class="big ? '-title-1' : '-title-2'"
      >{{ title }}</h1>
      <p 
        v-if="description" 
        v-html="description" 
        :class="big ? '-body-3' : '-body-5'"
      />
    </div>
    <KitButton
      v-if="buttonLabel || buttonIcon"
      :label="buttonLabel"
      :icon="buttonIcon"
      :to="buttonTo"
      @click="buttonClick"
    />
  </div>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;

  .top {
    padding-top: 25px;
    display: flex;
    flex-direction: column;

    h1 {
      color: var(--neutral-9);
      text-wrap: balance;
    }

    p {
      color: var(--neutral-7);
      text-wrap: balance;
    }
  }

  .icon-in-circle + h1 { margin-top: 20px; }
  .icon-in-circle + p { margin-top: 20px; }
  h1 + p { margin-top: 10px; }
  .top + .button { margin-top: 25px; }

  &.-stretch {
    flex-grow: 1;
    padding-bottom: var(--screen-padding-bottom);

    .top {
      flex-grow: 1;
    }
  }

  .button {
    width: 100%;
  }

  &.-align-left {
    
  }

  &:not(.-align-left) {
    .top {
      align-items: center;

      h1,
      p {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;

        text-align: center;
      }
    }
  }
}

</style>

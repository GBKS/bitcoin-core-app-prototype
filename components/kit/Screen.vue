<script setup>
import Icons from '@/helpers/icons.js'

</script>

<template>
  <div class="screen">
    <div class="wrap">
      <div class="top">
        <p>22:03</p>
        <div class="magic-island" />
        <div class="icons">
          <div v-html="Icons.signal" />
          <div v-html="Icons.wifi" />
          <div v-html="Icons.battery" />
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="home-indicator" />
    </div>
  </div>
</template>

<style scoped lang="scss">

.screen {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;  
  width: 100%;

  .wrap {
    // position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box; 
    width: 100%;
  }

  .top {
    display: flex;
    padding: 8px;
    gap: 5px;
    align-items: center;
    width: 100%;

    p {
      flex-basis: 5%;
      flex-grow: 1;
      text-align: center;
      font-weight: 600;
      color: var(--neutral-3);
    }

    .magic-island {
      width: 135px;
      height: 37px;
      border-radius: 100px;
      background-color: var(--neutral-2);
    }

    .icons {
      flex-basis: 5%;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      gap: 5px;

      ::v-deep(svg) {
        width: 18px;
        height: 18px;
        color: var(--neutral-3);
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    
    &.-gap-25 {
      gap: 25px;
    }
  }

  ::v-deep(.list) {
    &.-gap-15 {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  .home-indicator {
    width: 135px;
    height: 5px;
    border-radius: 100px;
    background-color: var(--neutral-3);
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  ::v-deep(.bottom) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  @include media-query(small) {
    .top,
    .home-indicator {
      display: none;
    }
  }

  @include container(small) {
    ::v-deep(.bottom) {
      position: relative;
      padding-bottom: var(--screen-padding-bottom);
      flex-grow: 1;
      justify-content: flex-end;
    }
  }

  @include container(medium-up) {
    .top,
    .home-indicator {
      display: none;
    }

    ::v-deep(.bottom) {
      padding-top: 20px;
      max-width: 340px;
    }
  }
}

</style>

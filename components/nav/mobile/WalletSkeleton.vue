<template>
  <div class="nav-mobile-wallet-skeleton">
    <div />
  </div>
</template>

<style scoped lang="scss">

.nav-mobile-wallet-skeleton {
  padding: 7px 10px;

  > div {
    background-color: var(--neutral-1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 30px;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      content: '';
      display: block;
      background: linear-gradient(-60deg, var(--neutral-1) 0%, var(--neutral-2) 30%, var(--neutral-1) 60%);
      animation: skeleton-animation 2000ms infinite linear;
    }
  }
}

@keyframes skeleton-animation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 200px 0;
  }
}

</style>

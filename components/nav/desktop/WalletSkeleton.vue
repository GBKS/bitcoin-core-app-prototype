<template>
  <div class="nav-desktop-wallet-skeleton">
    <div />
    <div />
  </div>
</template>

<style scoped lang="scss">

.nav-desktop-wallet-skeleton {
  width: 100%;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  > div {
    background-color: var(--neutral-1);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    height: 14px;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 150px;
      height: 100%;
      content: '';
      display: block;
      background: linear-gradient(-60deg, var(--neutral-1) 0%, var(--neutral-2) 30%, var(--neutral-1) 60%);
      animation: skeleton-animation 2500ms infinite linear;
    }

    &:nth-child(1) {
      width: 50px;
    }

    &:nth-child(2) {
      width: 100px;
      height: 18px;
    }
  }
}

@keyframes skeleton-animation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 150px 0;
  }
}

</style>

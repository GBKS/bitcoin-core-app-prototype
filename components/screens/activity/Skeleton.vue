<template>
  <div class="activity-skeleton">
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.activity-skeleton {
  position: relative;
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  padding-right: 20px;
  
  > div {
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: 15px;
    height: 22px;

    &:nth-child(2) { opacity: 80%; }
    &:nth-child(3) { opacity: 60%; }

    > div {
      background-color: var(--neutral-1);
      border-radius: 3px;
      overflow: hidden;
      position: relative;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 600px;
        height: 100%;
        content: '';
        display: block;
        background: linear-gradient(-60deg, var(--neutral-1) 0%, var(--neutral-2) 30%, var(--neutral-1) 60%);
        animation: skeleton-animation-1 2500ms infinite linear;
      }

      &:nth-child(1) {
        width: 12px;
        height: 12px;
      }

      &:nth-child(2) {
        flex-basis: 10px;
        flex-grow: 1;
        height: 22px;
        background-position: -20px 0;

        &:after {
          background-position: -25px 0;
          animation-name: skeleton-animation-2;
        }
      }

      &:nth-child(3) {
        flex-basis: 80px;
        height: 22px;

        &:after {
          background-position: -382px 0;
          animation-name: skeleton-animation-3;
        }
      }

      &:nth-child(4) {
        flex-basis: 125px;
        height: 22px;

        &:after {
          background-position: -475px 0;
          animation-name: skeleton-animation-4;
        }
      }
    }
  }
}

@keyframes skeleton-animation-1 {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 640px 0;
  }
}

@keyframes skeleton-animation-2 {
  0% {
    background-position: -25 0;
  }

  100% {
    background-position: 615px 0;
  }
}

@keyframes skeleton-animation-3 {
  0% {
    background-position: -382 0;
  }

  100% {
    background-position: 258px 0;
  }
}

@keyframes skeleton-animation-4 {
  0% {
    background-position: -475px 0;
  }

  100% {
    background-position: 165px 0;
  }
}

</style>

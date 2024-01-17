<script setup>
const canvas = ref('canvas')

function draw() {
  const startAngle = -90
  const startRadians = startAngle / 180 * Math.PI
  const endAngle = 45
  const endRadians = endAngle / 180 * Math.PI

  const context = canvas.value.getContext('2d')
  context.strokeStyle = "#F9CD21"
  context.lineWidth = 3
  context.lineCap = "round"
  context.beginPath()
  context.arc(18, 18, 16.5, startRadians, endRadians)
  context.stroke()
}

onMounted(() => {
  draw()
})

</script>

<template>
  <NuxtLink
    class="block-clock"
    to="/screen/block-clock"
  >
    <div class="wrap">
      <div class="dot" />
      <div class="line" />
      <div class="line" />
      <canvas
        ref="canvas"
        width="36"
        height="36"
      />
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">

.block-clock {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  width: 34px;

  &:before {
    display: block;
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--primary);
    opacity: 0;
  }

  .wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    justify-content: center;
    align-items: center;

    canvas {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      transform: translate(-50%, -50%);
    }

    &:before {
      position: absolute;
      display: block;
      content: '';
      border-radius: 100px;
      width: 36px;
      height: 36px;
      transform: scale(0.5);
      box-shadow: inset 0px 0px 0px 3px var(--neutral-2);
    }

    .dot {
      width: 2px;
      height: 2px;
      border-radius: 100px;
      background-color: var(--neutral-9);
    }

    .line {
      width: 8px;
      height: 1.5px;
      border-radius: 100px;
      background-color: var(--neutral-9);

      &:last-of-type {
        width: 4px;
      }
    }
  }

  &:hover {
    background-color: var(--neutral-1);
  }

  &.-active,
  &.router-link-active {
    color: var(--primary);

    &:before {
      opacity: 1;
    }
  }
}

</style>

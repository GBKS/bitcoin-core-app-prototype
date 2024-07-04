<script setup>
const canvas = ref('canvas')
const size = 45
const lineWidth = 3

function draw() {
  const startAngle = -90
  const startRadians = startAngle / 180 * Math.PI
  const endAngle = 45
  const endRadians = endAngle / 180 * Math.PI

  const context = canvas.value.getContext('2d')
  context.strokeStyle = "#F9CD21"
  context.lineWidth = lineWidth
  context.lineCap = "round"
  context.beginPath()
  context.arc(size/2, size/2, (size-lineWidth)/2, startRadians, endRadians)
  context.stroke()
}

const wrapStyle = computed(() => {
  return {
    gap: lineWidth/2 + 'px'
  }
})

const outlineStyle = computed(() => {
  return {
    width: size + 'px',
    height: size + 'px',
    boxShadow: 'inset 0px 0px 0px '+size/12+'px var(--neutral-2)'
  }
})

const dotStyle = computed(() => {
  return {
    width: size/18 + 'px',
    height: size/18 + 'px'
  }
})

const lineOneStyle = computed(() => {
  return {
    width: size*0.222 + 'px',
    height: lineWidth/2 + 'px'
  }
})

const lineTwoStyle = computed(() => {
  return {
    width: size*0.111 + 'px',
    height: lineWidth/2 + 'px'
  }
})

const canvasStyle = computed(() => {
  return {
    width: size/2 + 'px',
    height: size/2 + 'px'
  }
})

onMounted(() => {
  draw()
})
</script>

<template>
  <NuxtLink
    class="block-clock"
    to="/screen/block-clock?t=slide-right"
  >
    <div class="wrap" :style="wrapStyle">
      <div class="outline" :style="outlineStyle" />
      <div class="dot" :style="dotStyle" />
      <div class="line" :style="lineOneStyle" />
      <div class="line" :style="lineTwoStyle" />
      <canvas
        ref="canvas"
        :style="canvasStyle"
        :width="size"
        :height="size"
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
  width: 60px;
  height: 60px;

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
      transform: translate(-50%, -50%);
    }

    .outline {
      position: absolute;
      display: block;
      content: '';
      border-radius: 100px;
      transform: scale(0.5);
    }

    .dot {
      border-radius: 100px;
      background-color: var(--neutral-9);
    }

    .line {
      border-radius: 100px;
      background-color: var(--neutral-9);
    }
  }

  @include container(medium-up) {
    &:hover {
      background-color: var(--neutral-1);
    }
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

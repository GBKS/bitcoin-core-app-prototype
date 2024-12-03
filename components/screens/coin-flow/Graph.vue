<script setup>
const props = defineProps([
  'left',
  'right',
  'elements',
  'largestAmount',
  'lowestAmount'
])

const canvasElement = ref()
const canvasWidth = 50
const totalStrokeWidth = 7
const canvasSize = ref(null)
let resizeIndex = 0

const classObject = computed(() => {
  const c = ['coin-flow-graph']

  // if(props.active) c.push('-active')

  return c.join(' ')
})

const resizeObserver = new ResizeObserver((entries) => {
  resizeIndex++
  setTimeout(() => {
    resizeIndex++
    updateCanvasSize()
  }, 100)
  updateCanvasSize()
})

function updateCanvasSize() {
  canvasSize.value = {
    width: canvasElement.value.offsetWidth,
    height: canvasElement.value.offsetHeight
  }
}

const styleObject = computed(() => {
  return {
    width: canvasWidth + 'px'
  }
})

const viewBox = computed(() => {
  return canvasSize.value ? '0 0 ' + canvasSize.value.width + ' ' + canvasSize.value.height : null
})

const paths = computed(() => {
  const result = []

  let strokeWidths = 0
  props.left.forEach(item => {
    // Filter the element from the props.elements object that has the key element.id 
    const element = props.elements[item.id]

    // console.log('item', item)
    // console.log('element', element)

    if(element) {
      const strokeWidth = (item.amount - props.lowestAmount) / (props.largestAmount - props.lowestAmount) * totalStrokeWidth

      const canvasWidth = canvasSize.value.width
      const canvasHeight = canvasSize.value.height

      const x1 = 0
      const y1 = element.offsetTop + element.offsetHeight / 2

      const x2 = canvasWidth / 2
      const y2 = canvasHeight / 2 - totalStrokeWidth / 2 + strokeWidths + strokeWidth / 2

      const curveX1 = canvasWidth / 4
      const curveY1 = y1

      const curveX2 = canvasWidth / 4
      const curveY2 = y2

      const className = '-input'

      const deltaY = Math.abs(y2 - y1)
      const direction = (y2 - y1) > 0 ? 1 : -1

      let path
      if(deltaY < canvasWidth / 4) {
        path = 'M ' + x1 + ' ' + y1 + ' C ' + curveX1 + ' ' + curveY1 + ', ' + curveX2 + ' ' + curveY2 + ', ' + x2 + ' ' + y2
      } else {
        path = [
          'M ' + x1 + ' ' + y1 + ' Q ' + curveX1 + ' ' + curveY1 + ' ' + curveX1 + ' ' + (curveY1 + canvasWidth / 4 * direction),
          'L' + curveX1 + ' ' + (curveY2 - canvasWidth / 4 * direction),
          'Q' + curveX1 + ' ' + curveY2 + ' ' + x2 + ' ' + y2
        ].join(' ')
      }

      result.push({
        path, 
        className, 
        strokeWidth: Math.max(1, strokeWidth)
      })

      strokeWidths += strokeWidth
    }
  })

  strokeWidths = 0
  props.right.forEach(item => {
    // Filter the element from the props.elements object that has the key element.id 
    const element = props.elements[item.id]

    // console.log('item', item)
    // console.log('element', element)

    if(element) {
      const strokeWidth = (item.amount - props.lowestAmount) / (props.largestAmount - props.lowestAmount) * totalStrokeWidth

      const canvasWidth = canvasSize.value.width
      const canvasHeight = canvasSize.value.height

      const x1 = canvasWidth / 2
      const y1 = canvasHeight / 2 - totalStrokeWidth / 2 + strokeWidths + strokeWidth / 2

      const x2 = canvasWidth
      const y2 = element.offsetTop + element.offsetHeight / 2

      const curveX1 = canvasWidth / 4 * 3
      const curveY1 = y1

      const curveX2 = canvasWidth / 4 * 3
      const curveY2 = y2

      const className = '-' + (item.type || 'output')

      const deltaY = Math.abs(y2 - y1)
      const direction = (y2 - y1) > 0 ? 1 : -1

      let path
      if(deltaY < canvasWidth / 2) {
        path = 'M ' + x1 + ' ' + y1 + ' C ' + curveX1 + ' ' + curveY1 + ', ' + curveX2 + ' ' + curveY2 + ', ' + x2 + ' ' + y2
      } else {
        path = [
          'M ' + x1 + ' ' + y1 + ' Q ' + curveX1 + ' ' + curveY1 + ' ' + curveX1 + ' ' + (curveY1 + canvasWidth / 4 * direction),
          'L' + curveX1 + ' ' + (curveY2 - canvasWidth / 4 * direction),
          'Q' + curveX1 + ' ' + curveY2 + ' ' + x2 + ' ' + y2
        ].join(' ')
      }

      result.push({
        path, 
        className, 
        strokeWidth: Math.max(1, strokeWidth)
      })

      strokeWidths += strokeWidth
    }
  })

  return result.reverse()
})

const circles = computed(() => {
  const result = []

  props.left.forEach(item => {
    // Filter the element from the props.elements object that has the key element.id 
    const element = props.elements[item.id]

    // console.log('item', item)
    // console.log('element', element)

    if(element && result.length == 0) {
      const canvasWidth = canvasSize.value.width
      const canvasHeight = canvasSize.value.height

      const x1 = 0
      const y1 = element.offsetTop + element.offsetHeight / 2

      const x2 = canvasWidth / 2
      const y2 = canvasHeight / 2

      const curveX1 = canvasWidth / 4
      const curveY1 = y1

      const curveX2 = canvasWidth / 4
      const curveY2 = y2

      // result.push({
      //   x: x1,
      //   y: y1
      // })

      // result.push({
      //   x: x2,
      //   y: y2
      // })

      // result.push({
      //   x: curveX1,
      //   y: curveY1
      // })

      // result.push({
      //   x: curveX2,
      //   y: curveY2
      // })
    }
  })

  return result
})

onMounted(() => {
  resizeObserver.observe(canvasElement.value)
})
</script>

<template>
    <div :class="classObject" :style="styleObject" ref="canvasElement">
      <svg
        v-if="canvasElement && canvasSize"
        :viewBox="viewBox" 
        :key="'key_' + resizeIndex"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purple-to-orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #B85FDA;" />
            <stop offset="75%" style="stop-color: #F7931A;" />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="purple-to-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #B85FDA;" />
            <stop offset="75%" style="stop-color: #4A6FF5;" />
          </linearGradient>
        </defs>
        <path
          v-for="(item, index) in paths"
          :key="index"
          :d="item.path"
          :class="item.className"
          :stroke-width="item.strokeWidth"
        />
        <circle
          v-for="(item, index) in circles"
          :key="index"
          :cx="item.x"
          :cy="item.y"
          r="5" 
        />
      </svg>
    </div>
</template>

<style scoped lang="scss">

.coin-flow-graph {
  // background-color: rgba(var(--blue-rgb), 0.1);
  position: relative;

  // &:before,
  // &:after {
  //   display: block;
  //   content: '';
  //   position: absolute;
  // }

  // &:before {
  //   top: 50%;
  //   left: 0;
  //   width: 100%;
  //   height: 1px;
  //   background-color: rgba(pink, 0.75);
  //   z-index: 1000;
  // }

  // &:after {
  //   top: 0;
  //   left: 50%;
  //   width: 1px;
  //   height: 100%;
  //   background-color: rgba(pink, 0.75);
  //   z-index: 1000;
  // }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    path {
      stroke: var(--purple);
      position: relative;

      &.-output {
        stroke: var(--orange);
        stroke: url(#purple-to-orange);
      }

      &.-fee {
        stroke: var(--blue);
        stroke: url(#purple-to-blue);
      }
    }

    circle {
      stroke: blue;

      &:nth-of-type(2n) {
        stroke: orange;
      }

      &:nth-of-type(3n) {
        stroke: purple;
      }

      &:nth-of-type(4n) {
        stroke: green;
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    
  }
}

</style>

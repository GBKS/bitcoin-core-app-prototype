
<script setup>
import Icons from '@/helpers/icons.js'

const TOOLTIP_EVENTS = {
  SHOW: 'show-tooltip',
  HIDE: 'hide-tooltip',
}

const stateStore = useStateStore()
const active = ref(false)
const activeId = ref(null)
const options = ref(null)
const position = ref(null)

const classObject = computed(() => {
  const c = [
    'tooltip',
    '-body-5',
    '-' + (options.value?.size || 'medium'),
    '-' + (options.value?.theme || 'default')
  ]

  return c.join(' ')
})

const content = computed(() => {
  let result = ''

  if(options.value?.icon) result = Icons[options.value.icon]
  if(options.value?.label) result += options.value.label

  return result
})

function show(data) {
  if(!active.value || activeId.value != data.id) {
    activeId.value = data.id
    active.value = true
    options.value = data.options

    stateStore.showTooltip = true

    updatePosition(data.element)

    window.emitter.emit('on-show-tooltip', activeId.value)
  }
}

function hide(data) {
  if(active.value && activeId.value == data.id) {
    active.value = false
    activeId.value = null
    options.value = null

    stateStore.showTooltip = false

    window.emitter.emit('on-hide-tooltip', data.id)
  }
}

function updatePosition(element) {
  const container = document.getElementById('prototype-container')
  const containerRectangle = container.getBoundingClientRect()

  const rectangle = element.getBoundingClientRect()

  const isMobile = containerRectangle.width < 640

  position.value = {
    left: containerRectangle.left + rectangle.width / 2,
    bottom: containerRectangle.bottom - rectangle.top + 5
  }

  // Update to define position based on where the anchor element is
  // Menu should just never touch or go beyond the screen edge
  // if(isMobile) {
  //   position.value = {
  //     right: containerRectangle.right - rectangle.right,
  //     bottom: containerRectangle.bottom - rectangle.top + 5
  //   }
  // } else {
  //   position.value = {
  //     top: rectangle.top,
  //     left: rectangle.right - containerRectangle.left + 5
  //   }
  // }
}

const styleObject = computed(() => {
  let result = {}

  if(!options.value?.theme || options.value?.theme == 'default') {
    result.backgroundColor = 'var(--'+(options.value?.color || 'green')+')'
  }

  if(position.value) {
    for(const key in position.value) {
      result[key] = Math.round(position.value[key]) + 'px'
    }
  }

  return result
})

onMounted(() => {
  window.emitter.on(TOOLTIP_EVENTS.SHOW, show)
  window.emitter.on(TOOLTIP_EVENTS.HIDE, hide)
})
</script>

<template>
  <Transition name="fade" appear>
    <div
      v-if="active"
      :class="classObject"
      :style="styleObject"
      v-html="content"
    />
  </Transition>
</template>

<style scoped lang="scss">

.tooltip {
  position: absolute;
  z-index: 10;
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-4);
  border-radius: var(--corner-radius);
  color: white;
  line-height: 1;
  transform: translateX(-50%);

  ::v-deep(svg) {
    width: 16px;
    height: 16px;
  }

  @include container(small) {
    padding: 3px 8px;
  }

  @include container(medium-up) {
    padding: 5px 10px;
  }
}

</style>

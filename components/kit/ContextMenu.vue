<script setup>
import { useStateStore } from "@/stores/state.js"

const stateStore = useStateStore()
const active = ref(false)
const activeId = ref(null)
const options = ref(null)
const position = ref(null)
const ignoreNextDocumentClick = ref(false)
const mobilePosition = ref(null)
const desktopPosition = ref(null)

const CONTEXT_MENU_EVENTS = {
  SHOW: 'show-context-menu',
  UPDATE: 'update-context-menu',
  HIDE: 'hide-context-menu',
  TOGGLE: 'toggle-context-menu'
}

const CONTEXT_MENU_POSITIONS = {
  ABOVE_RIGHT_ALIGNED: 'above-right-aligned',
  RIGHT_TOP_ALIGNED: 'right-top-aligned',
  BELOW_RIGHT_ALIGNED: 'below-right-aligned',
  LEFT_TOP_ALIGNED: 'left-top-aligned'
}

function selectItem(id) {
  window.emitter.emit('on-select-context-menu-option', id)
}

function show(data) {
  if(!active.value || activeId.value != data.id) {
    activeId.value = data.id
    active.value = true
    options.value = data.options
    mobilePosition.value = data.mobilePosition
    desktopPosition.value = data.desktopPosition

    stateStore.showMenu = true

    updatePosition(data.element)

    window.emitter.emit('on-show-context-menu', activeId.value)

    ignoreNextDocumentClick.value = true
    document.addEventListener('click', documentClick)
  }
}

function update(data) {
  if(active.value && activeId.value == data.id) {
    options.value = data.options
    updatePosition(data.element)

    window.emitter.emit('on-update-context-menu', activeId.value)
  }
}

function hide(data) {
  if(active.value && activeId.value == data.id) {
    active.value = false
    activeId.value = null
    options.value = null

    stateStore.showMenu = false

    window.emitter.emit('on-hide-context-menu', data.id)

    document.removeEventListener('click', documentClick)
  }
}

function toggle(data) {
  if(active.value) {
    if(activeId.value == data.id) {
      hide(data)
    } else {
      show(data)
    }
  } else {
    show(data)
  }
}

function selectOption(id) {
  window.emitter.emit('on-select-context-menu-option', {
    menuId: activeId.value, 
    optionId: id
  })
}

function updatePosition(element) {
  const container = document.getElementById('prototype-container')
  const containerRectangle = container.getBoundingClientRect()

  const rectangle = element.getBoundingClientRect()

  const isMobile = containerRectangle.width < 640

  let positionName

  if(isMobile) {
    positionName = mobilePosition.value || CONTEXT_MENU_POSITIONS.ABOVE_RIGHT_ALIGNED
  } else {
    positionName = desktopPosition.value || CONTEXT_MENU_POSITIONS.RIGHT_TOP_ALIGNED
  }

  // Update to define position based on where the anchor element is
  // Menu should just never touch or go beyond the screen edge
  if(positionName == CONTEXT_MENU_POSITIONS.ABOVE_RIGHT_ALIGNED) {
    // console.log(CONTEXT_MENU_POSITIONS.ABOVE_RIGHT_ALIGNED)
    // Right edge, above the element
    position.value = {
      right: containerRectangle.right - rectangle.right,
      bottom: containerRectangle.bottom - rectangle.top + 5
    }
  } else if(positionName == CONTEXT_MENU_POSITIONS.RIGHT_TOP_ALIGNED){
    // console.log(CONTEXT_MENU_POSITIONS.RIGHT_TOP_ALIGNED)
    // Top edge, to the right of the element
    position.value = {
      top: rectangle.top,
      left: rectangle.right - containerRectangle.left + 5
    }
  } else if(positionName = CONTEXT_MENU_POSITIONS.BELOW_RIGHT_ALIGNED) {
    // console.log(CONTEXT_MENU_POSITIONS.BELOW_RIGHT_ALIGNED)
    // Right edge, below the element
    position.value = {
      right: containerRectangle.right - rectangle.right,
      top: rectangle.bottom - containerRectangle.top + 5
    }
  } else if(positionName = CONTEXT_MENU_POSITIONS.LEFT_TOP_ALIGNED) {
    // console.log(CONTEXT_MENU_POSITIONS.LEFT_TOP_ALIGNED)
    // Top edge, to the left of the element
    position.value = {
      top: rectangle.top,
      right: containerRectangle.right - rectangle.left + 5
    }
  }

}

function documentClick(event) {
  if(ignoreNextDocumentClick.value) {
    ignoreNextDocumentClick.value = false
  } else if(active.value) {
    if(!event.target.closest('.context-menu')) {
      hide({ id: activeId.value })
    }
  }
}

const styleObject = computed(() => {
  let result = null

  if(position.value) {
    result = {}

    for(const key in position.value) {
      result[key] = Math.round(position.value[key]) + 'px'
    }
  }

  return result
})

onMounted(() => {
  window.emitter.on(CONTEXT_MENU_EVENTS.SHOW, show)
  window.emitter.on(CONTEXT_MENU_EVENTS.UPDATE, update)
  window.emitter.on(CONTEXT_MENU_EVENTS.HIDE, hide)
  window.emitter.on(CONTEXT_MENU_EVENTS.TOGGLE, toggle)
})
</script>

<template>
  <Transition name="context-menu-transition" appear>
    <div
      v-if="active"
      class="context-menu" 
      :style="styleObject"
    >
        <template v-for="(item, id) in options">
          <div 
            v-if="item == 'divider'"
            class="divider"
          />
          <KitContextMenuItem
            v-else
            :key="id"
            :id="id"
            :info="item"
            @select="selectOption"
          />
      </template>
    </div>
  </Transition>
</template>

<style scoped lang="scss">

.context-menu {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: stretch;
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-4);
  border-radius: var(--corner-radius);

  .divider {
    background-color: var(--neutral-4);
    height: 1px;
    margin-left: 10px;
    margin-right: 10px;
  }

  @include container(small) {
    padding: 10px;
    // transform: translate(-100%, -100%);
  }

  @include container(medium-up) {
    padding: 7px;
  }

  &.context-menu-transition-enter-active,
  &.context-menu-transition-leave-active {
    transition: all 0.4s $ease;
  }

  &.context-menu-transition-enter-from,
  &.context-menu-transition-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
}

</style>
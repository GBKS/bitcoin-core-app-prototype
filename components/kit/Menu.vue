<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'options'
])

const emit = defineEmits(['selectOption'])
const stateStore = useStateStore()
const active = ref(false)
const activeId = ref(null)
const options = ref(null)
const position = ref(null)
const ignoreNextDocumentClick = ref(false)

function selectItem(id) {
  window.emitter.emit('on-select-menu-option', id)
}

function show(data) {
  if(!active.value) {
    activeId.value = data.id
    active.value = true
    options.value = data.options

    stateStore.showMenu = true

    updatePosition(data.element)

    window.emitter.emit('on-show-menu', activeId.value)

    ignoreNextDocumentClick.value = true
    document.addEventListener('click', documentClick)
  }
}

function hide(data) {
  if(active.value && activeId.value == data.id) {
    active.value = false
    activeId.value = null
    options.value = null

    stateStore.showMenu = false

    window.emitter.emit('on-hide-menu', data.id)

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
  window.emitter.emit('on-select-menu-option', {
    menuId: activeId.value, 
    optionId: id
  })
}

function updatePosition(element) {
  const container = document.getElementById('prototype-container')
  const containerRectangle = container.getBoundingClientRect()

  const rectangle = element.getBoundingClientRect()

  const isMobile = containerRectangle.width < 640

  // Update to define position based on where the anchor element is
  // Menu should just never touch or go beyond the screen edge
  if(isMobile) {
    position.value = {
      right: containerRectangle.right - rectangle.right,
      bottom: containerRectangle.bottom - rectangle.top + 5
    }
  } else {
    position.value = {
      top: rectangle.top,
      left: rectangle.right - containerRectangle.left + 5
    }
  }

}

function documentClick(event) {
  if(ignoreNextDocumentClick.value) {
    ignoreNextDocumentClick.value = false
  } else if(active.value) {
    if(!event.target.closest('.menu')) {
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
  window.emitter.on('show-menu', show)
  window.emitter.on('hide-menu', hide)
  window.emitter.on('toggle-menu', toggle)
})
</script>

<template>
  <div
    v-if="active"
    class="menu" 
    :style="styleObject"
  >
    <KitMenuItem
      v-for="(item, id) in options"
      :key="id"
      :id="id"
      :info="item"
      @select="selectOption"
    />
  </div>
</template>

<style scoped lang="scss">

.menu {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: stretch;
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-4);
  border-radius: var(--corner-radius);

  @include container(small) {
    padding: 10px;
    // transform: translate(-100%, -100%);
  }

  @include container(medium-up) {
    padding: 7px;
  }
}

</style>
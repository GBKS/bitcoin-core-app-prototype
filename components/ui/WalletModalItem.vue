<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()

const emit = defineEmits(['select'])

const menuActive = ref(false)
const optionsButton = ref(null)

const props = defineProps([
  'id'
])

const menuOptions = computed(() => {
  const result = {
    rename: {
      label: 'Rename',
      icon: 'pencil'
    }
  }

  if(isActive.value) {
    result.close = {
      label: 'Close',
      icon: 'cross'
    }
  }

  result.remove =  {
    label: 'Remove',
    icon: 'trash'
  }
  
  return result
})

const isActive = computed(() => {
  return stateStore.activeWalletId == props.id
})

const info = computed(() => {
  return stateStore.wallets[props.id]
})

const classObject = computed(() => {
  const c = ['wallet-modal-item']

  if(isActive.value) {
    c.push('-active')
  }

  if(menuActive.value) {
    c.push('-menu-active')
  }

  return c.join(' ')
})

const ariaLabel = computed(() => {
  return 'Select wallet: ' + info.value.name
})

function clickSelect() {
  emit('select', props.id)
}

const menuId = computed(() => {
  return 'wallet-modal-item-' + props.id
})

function clickOptions() {
  toggleMenu()
}

function toggleMenu() {
  window.emitter.emit('toggle-context-menu', {
    id: menuId.value,
    options: menuOptions.value,
    element: optionsButton.value
  })
}

function renameWallet() {
  const newName = prompt('Enter the new name for the wallet:', info.value.name)
  if(newName) {
    info.value.name = newName

    window.emitter.on('hide-context-menu', { id: menuId.value })
  }
}

function closeWallet() {
  if(confirm('Are you sure you want to close this wallet?')) {
    doCloseWallet()
  }
}

function doCloseWallet() {
  stateStore.activeWalletId = null

  // Navigate to the node page
  const router = useRouter()
  router.push({ path: '/screen/block-clock' })

  window.emitter.emit('hide-context-menu', { id: menuId.value })
}

function removeWallet() {
  if(confirm('Are you sure you want to remove this wallet?')) {
    if(isActive.value) {
      doCloseWallet()
    }

    delete stateStore.wallets[props.id]
    delete stateStore.transactions[props.id]

    if(Object.keys(stateStore.wallets).length == 0) {
      window.emitter.emit('hide-wallet-modal')
    }
  }
}

function onShowMenu(id) {
  menuActive.value = id == menuId.value
}

function onHideMenu(id) {
  if(id == menuId.value) {
    menuActive.value = false
  }
}

function onSelectMenuOption(data) {
  if(data.menuId == menuId.value) {
    switch(data.optionId) {
      case 'rename':
        renameWallet()
        break
      case 'close':
        closeWallet()
        break
      case 'remove':
        removeWallet()
        break
    }
  }
}

onMounted(() => {
  window.emitter.on('on-show-context-menu', onShowMenu)
  window.emitter.on('on-hide-context-menu', onHideMenu)
  window.emitter.on('on-select-context-menu-option', onSelectMenuOption)
})

onBeforeUnmount(() => {
  window.emitter.off('on-show-context-menu', onShowMenu)
  window.emitter.off('on-hide-context-menu', onHideMenu)
  window.emitter.off('on-select-context-menu-option', onSelectMenuOption)

  window.emitter.emit('hide-context-menu', { id: menuId.value })
})
</script>

<template>
  <div :class="classObject">
    <button
      class="-title-6 -title-5-mobile"
      :aria-label="ariaLabel"
      @click="clickSelect"
    >{{ info.name }}</button>
    <div class="options">
      <button
        aria-label="View wallet options"
        title="View wallet options"
        v-html="Icons.ellipsis"
        ref="optionsButton"
        @click="clickOptions"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.wallet-modal-item {
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: var(--corner-radius);

  > button {
    width: 100%;
    padding: 7px 42px 7px 12px;
    min-width: 200px;
    color: var(--neutral-7);
    text-align: left;
    cursor: pointer;
    border-radius: var(--corner-radius);

    &:focus-visible {
      outline: 2px solid var(--purple);
    }
  }

  .options {
    button {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: var(--neutral-7);
      border-radius: 5px;

      ::v-deep(svg) {
        width: 14px;
        height: 14px;
      }

      &:active {
        color: var(--neutral-9);
        background-color: var(--neutral-1);
      }

      &:focus-visible {
        outline: 2px solid var(--purple);
      }
    }
  }

  &.-active {    
    > button {
      color: var(--primary);
    }
  }

  &.-menu-active {
    .options {
      button {
        color: var(--primary);
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    &:hover {
      background-color: var(--neutral-2);

      > button {
        color: var(--neutral-9);
      }
    }
    
    &:not(.-menu-active) .options {
      visibility: hidden;

      button {
        &:hover:not(:active) {
          color: var(--neutral-9);
        }
      }
    }

    &:hover {
      .options {
        visibility: visible;
      }
    }
  }
}

</style>
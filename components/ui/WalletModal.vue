<script setup>
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'

const stateStore = useStateStore()
const position = ref(null)
const ignoreNextDocumentClick = ref(false)

function show(data) {
  if(!stateStore.showWalletModal) {
    updatePosition(data)

    stateStore.showWalletModal = true

    ignoreNextDocumentClick.value = true
    document.addEventListener('click', documentClick)
  }
}

function hide(data) {
  if(stateStore.showWalletModal) {
    stateStore.showWalletModal = false

    document.removeEventListener('click', documentClick)
  }
}

function toggle(data) {
  if(stateStore.showWalletModal) {
    hide(data)
  } else {
    show(data)
  }
}

function setActiveWalletId(value) {
  // This logic does not quite feel right on mobile yet.
  // Needs to be revisited.
  const route = useRoute()
  if(route.path == '/screen/block-clock') {
    useRouter().push({ path: '/screen/activity' })
  }

  stateStore.activeWalletId = value

  stateStore.wallets[value].lastOpen = Date.now()

  hide()
}

function updatePosition(data) {
  if(data && data.element) {
    const container = document.getElementById('prototype-container')
    const containerRectangle = container.getBoundingClientRect()

    const rectangle = data.element.getBoundingClientRect()

    position.value = {
      top: rectangle.bottom + 8,
      left: rectangle.left - containerRectangle.left
    }
  } else {
    position.value = null
  }
}

function addDummyWallet() {
  const walletId = StateHelper.addWallet()
}

function documentClick(event) {
  if(ignoreNextDocumentClick.value) {
    ignoreNextDocumentClick.value = false
  } else if(stateStore.showWalletModal && !stateStore.showMenu) {
    const clickeModal = event.target.closest('.wallet-modal')
    const clickedMenu = event.target.closest('.menu')
    if(!clickeModal && !clickedMenu) {
      hide()
    }
  }
}

const sortedWalletIds = computed(() => {
  return Object.keys(stateStore.wallets).sort((a, b) => {
    return stateStore.wallets[b].lastOpen - stateStore.wallets[a].lastOpen
  })
})

const classObject = computed(() => {
  const c = ['wallet-modal']

  if(stateStore.showWalletModal) c.push('-active')

  return c.join(' ')
})

const coverClass = computed(() => {
  const c = ['cover']

  if(stateStore.showWalletModal) c.push('-active')

  return c.join(' ')
})

const styleObject = computed(() => {
  let result = null

  if(position.value) {
    result = {
      top: position.value.top + 'px',
      left: position.value.left + 'px'
    }
  }

  return result
})

onMounted(() => {
  window.emitter.on('show-wallet-modal', show)
  window.emitter.on('hide-wallet-modal', hide)
  window.emitter.on('toggle-wallet-modal', toggle)
})
</script>

<template>
  <div 
    :class="coverClass" 
    @click="hide"
  />
  <div
    :class="classObject" 
    :style="styleObject"
  >
    <div class="content">
      <div class="drag-indicator" />
      <h5 class="-title-6 -title-4-mobile" @click="addDummyWallet">Your wallets</h5>
      <div class="list">
        <UiWalletModalItem
          v-for="id in sortedWalletIds"
          :key="id"
          :id="id"
          @select="setActiveWalletId"
        />
      </div>
      <KitButton
        class="add-button"
        icon="plus"
        iconPosition="left"
        label="Add wallet"
        theme="free-subtle"
        size="small"
        to="/screen/add-wallet?t=slide-up"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

@include container(small) {
  .cover {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    background-color: var(--neutral-2);
    transition: opacity 400ms $ease;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    // pointer-events: none;

    &.-active {
      width: 100%;
      height: 100%;
      opacity: 0.85;
      pointer-events: auto;
    }
  }
}

.wallet-modal {
  background-color: var(--neutral-0);
  display: flex;
  align-items: stretch;
  gap: 5px;
  z-index: 2;

  .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;

    h5 {
      text-align: center;
    }

    .list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      max-height: 300px;
      overflow-y: scroll;
    }
  }

  @include container(small) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // border-top: 1px solid var(--neutral-4);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    transform: translateY(100%);
    transition: all 400ms $ease;

    .content {
      margin-top: 10px;
      flex-basis: 100%;
      gap: 10px;
      padding: 10px 15px 30px 15px;

      .drag-indicator {
        width: 50px;
        height: 5px;
        border-radius: 5px;
        background-color: var(--neutral-3);
        align-self: center;
      }

      .list {
        width: 100%;
        margin-bottom: 10px;
      }

      ::v-deep(.add-button) {
        min-height: 39px;
        font-size: 18px;
      }
    }

    &.-active {
      transform: translateY(0%);
    }
  }

  @include container(medium-up) {
    display: none;
    position: absolute;
    border-radius: var(--corner-radius);
    border: 1px solid var(--neutral-4);

    .content {      
      padding: 15px 10px 10px 10px;

      .drag-indicator {
        display: none;
      }

      .list {
        margin-top: 5px;
        margin-bottom: 5px;
      }

      &:after {
        display: block;
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        width: 14px;
        height: 14px;
        background-color: var(--neutral-0);
        border-top: 1px solid var(--neutral-4);
        border-right: 1px solid var(--neutral-4);
        border-top-right-radius: 3px;
        transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg);
      }
    }

    &.-active {
      display: block;
    }
  }
}

</style>

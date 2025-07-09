<script setup>
import { useStateStore } from "@/stores/state.js"
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()
const selected = ref([])
const optionsVisible = ref(false)
const optionsElement = ref(null)
const selectionMode = ref('mode-all')
const sortingMode = ref('sorting-date')
const groupByAddressEnabled = ref(false)
const showLockedCoins = ref(false)

const transactions = computed(() => {
  return stateStore.transactions[stateStore.activeWalletId].filter(item => item.amount > 0)
})

const classObject = computed(() => {
  const c = ['coin-selection']

  return c.join(' ')
})

const amountToSelect = computed(() => {
  let result = 25000
  
  if(stateStore.send?.transactions?.length > 0) {
    result = 0
    stateStore.send.transactions.forEach(item => {
      result += item.amount
    })
  }

  return result
})

function toggleItem(id) {
  const index = selected.value.indexOf(id)
  if(index > -1) {
    selected.value.splice(index, 1)
  } else {
    selected.value.push(id)
  }

  stateStore.send.coins = selected.value
}

const menuOptions = computed(() => {
  return {
    "mode-header": {
      type: 'header',
      title: 'Mode',
    },
    "mode-all": {
      label: 'Send full balance',
      icon: selectionMode.value == 'mode-all' ? 'check' : null,
      indent: selectionMode.value !== 'mode-all'
    },
    "mode-fee": {
      label: 'Lowest fee',
      icon: selectionMode.value == 'mode-fee' ? 'check' : null,
      indent: selectionMode.value !== 'mode-fee'
    },
    "mode-privacy": {
      label: 'Best privacy',
      icon: selectionMode.value == 'mode-privacy' ? 'check' : null,
      indent: selectionMode.value !== 'mode-privacy'
    },
    "static-1": 'divider',
    "mode-sorting": {
      type: 'header',
      title: 'Sorting',
    },
    "sorting-date": {
      label: 'Date received',
      icon: sortingMode.value == 'sorting-date' ? 'check' : null,
      indent: sortingMode.value !== 'sorting-date'
    },
    "sorting-amount": {
      label: 'Amount',
      icon: sortingMode.value == 'sorting-amount' ? 'check' : null,
      indent: sortingMode.value !== 'sorting-amount'
    },
    "sorting-label": {
      label: 'Label',
      icon: sortingMode.value == 'sorting-label' ? 'check' : null,
      indent: sortingMode.value !== 'sorting-label'
    },
    "static-2": 'divider',
    "group": {
      label: 'Group by address',
      toggle: groupByAddressEnabled.value
    },
    "showLocked": {
      label: 'Show locked coins',
      toggle: showLockedCoins.value
    }
  }
})

function onContextMenuOption(data) {
  console.log('onContextMenuOption', data)

  if(data.menuId == 'coin-selection-options') {
    switch(data.optionId) {
      case 'mode-all':
      case 'mode-fee':
      case 'mode-privacy':
        selectionMode.value = data.optionId
        break
      case 'sorting-all':
      case 'sorting-amount':
      case 'sorting-label':
        sortingMode.value = data.optionId
        break
      case 'group':
        groupByAddressEnabled.value = !groupByAddressEnabled.value
        break
      case 'showLocked':
        showLockedCoins.value = !showLockedCoins.value
        break
    }

    window.emitter.emit('update-context-menu', {
      id: 'coin-selection-options',
      options: menuOptions.value,
      element: optionsElement.value,
      desktopPosition: 'below-right-aligned',
      mobilePosition: 'below-right-aligned'
    })
  }
}

function toggleOptions() {
  optionsVisible.value = !optionsVisible.value

  window.emitter.emit('toggle-context-menu', {
    id: 'coin-selection-options',
    options: menuOptions.value,
    element: optionsElement.value,
    desktopPosition: 'below-right-aligned',
    mobilePosition: 'below-right-aligned'
  })
}

onBeforeMount(() => {
  window.emitter.on('on-select-context-menu-option', onContextMenuOption)
})

onMounted(() => {
  selected.value = stateStore.send?.coins || []
})

onBeforeUnmount(() => {
  window.emitter.off('on-select-context-menu-option', onContextMenuOption)
})
</script>

<template>
  <KitScreen :class="classObject">
    <KitTopBar
      buttonRightLabel="Done"
      buttonRightTo="/screen/send?t=slide-down"
    />
    <div class="wrap">
      <div class="header">
        <h5 class="-title-4">Select coins</h5>
        <div class="options" ref="optionsElement">
          <KitButton
            icon="ellipsis"
            theme="free"
            @click="toggleOptions"
          />
        </div>
      </div>
      <ScreensCoinSelectionTotal
        :transactions="transactions"
        :selected="selected"
        :amountToSelect="amountToSelect"
      />
      <div class="items">
        <ScreensCoinSelectionItem
          v-for="item in transactions"
          :key="item.id"
          :info="item"
          :active="selected.includes(item.id)"
          @toggle="toggleItem"
        />
      </div>
    </div>
  </KitScreen>
</template>
<style scoped lang="scss">
.coin-selection {
  .wrap {
    width: 100%;
    max-width: 640px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .items {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      flex-grow: 1;
      width: 100%;

      > * {
        & + * {
          border-top: 1px solid var(--neutral-4);
        }
      }
    }
  }
}
</style>
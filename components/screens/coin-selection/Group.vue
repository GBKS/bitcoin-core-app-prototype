<script setup>

const props = defineProps([
  'info',
  'selected',
  'remainingAmount'
])

const emit = defineEmits(['toggleItem', 'toggleItems'])

function toggleAll() {
  emit('toggleItems', props.info.transactions.map(item => item.id), !allSelected.value)
}

function toggleItem(id) {
  emit('toggleItem', id)
}

const formattedAddress = computed(() => {
  const chunks = props.info.address.match(/.{1,4}/g);

  return chunks[0] + ' ' + chunks[1] + ' ... ' + props.info.address.slice(-4)
})

const allSelected = computed(() => {
  return props.info.transactions.every(item => props.selected.includes(item.id))
})

const headerClass = computed(() => {
  const c = ['header']

  if(allSelected.value) c.push('-active')

  return c.join(' ')
})
</script>

<template>
  <div class="coin-selection-group">
    <button :class="headerClass" @click="toggleAll">
      <div class="toggle" />
      <h4 class="-body-6">{{ formattedAddress }}</h4>
    </button>
    
    <div class="items">
      <ScreensCoinSelectionItem
        v-for="item in info.transactions"
        :key="item.id"
        :info="item"
        :active="selected.includes(item.id)"
        :remainingAmount="remainingAmount"
        @toggle="toggleItem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.coin-selection-group {
  .header {
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    
    .toggle {
      width: 12px;
      height: 12px;
      border-radius: 3px;
      border: 1px solid var(--neutral-9);
      flex-shrink: 0;
    }

    &.-active {
      .toggle {
        background-color: var(--neutral-9);
      }
    }
  }

  .items {
    padding-left: 25px;

    & > * {
        border-top: 1px solid var(--neutral-4);
    }
  }

  &:not(:first-child) {
    // border-top: 1px solid var(--neutral-4);
  }
}

</style>

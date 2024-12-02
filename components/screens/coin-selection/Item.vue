<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info',
  'active'
])

const stateStore = useStateStore()
const emit = defineEmits(['toggle'])

const secondary = computed(() => {
  let result =  props.info.title

  if(!result || result.length == 0) {
    const chunks = props.info.address.match(/.{1,4}/g);

    result = chunks[0] + ' ' + chunks[1] + ' ... ' + props.info.address.slice(-4)
  }

  return result
})

const classObject = computed(() => {
  const c = ['coin-selection-item']

  if(props.active) c.push('-active')

  return c.join(' ')
})

function toggle() {
  emit('toggle', props.info.id)
}
</script>

<template>
    <div
      :class="classObject"
      role="button"
      :aria-selected="active"
      :aria-label="active ? 'Deselect' : 'Select'"
      @click="toggle"
    >
      <div class="toggle" />
      <div class="content">
        <KitBalance
          class="-body-5"
          :unit="stateStore.balanceDisplayMode"
          :amount="props.info.amount"
          theme="dark"
        />
        <div class="info">
          <p class="-body-5">{{ secondary }}</p>
          <KitButton
            theme="free"
            size="small"
            icon="infoCircle"
          />
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">

.coin-selection-item {
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;

    .toggle {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid var(--neutral-9);
      flex-shrink: 0;
    }

    .content {
      display: flex;

      .info {
        display: flex;
        gap: 2px;
        align-items: center;
      }
    }

    &:hover {
      .toggle {
        border-color: var(--primary);
      }
    }

    &.-active {
      .toggle {
        background-color: var(--neutral-9);
      }

      &:hover {
        .toggle {
          background-color: var(--primary);
        }
      }
    }

    @include container(small) {
      .content {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @include container(medium-up) {
      .content {
        gap: 20px;
        align-items: center;
      }
    }
}

</style>

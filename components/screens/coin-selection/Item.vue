<script setup>
import { useStateStore } from "@/stores/state.js"
import Toolbox from '@/helpers/toolbox.js'
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'info',
  'active',
  'remainingAmount'
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

const formattedDate = computed(() => {
  return Toolbox.formatRelativeDate(Math.round(props.info.timestamp/1000)+'', true)
})

const percentageStyle = computed(() => {
  const percentage = Math.min(1, props.info.amount/Math.abs(props.remainingAmount)) * 100
  return { width: percentage + '%' }
})

const tintPercentageStyle = computed(() => {
  const percentage = Math.min(1, props.info.amount/Math.abs(props.remainingAmount)) * 100
  return {
    width: percentage + '%',
    opacity: percentage/100
  }
})

function toggle() {
  emit('toggle', props.info.id)
}

function onLinkClick(event) {
  event.stopPropagation()
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
    <div
      class="center"
    >
      <p class="-note -body-6">{{ secondary }}</p>
      <p class="-date -body-6">{{ formattedDate }}</p>
      <div class="percentage">
        <div class="bar" :style="percentageStyle" />
        <div class="bar" :style="tintPercentageStyle" />
      </div>
      <KitBalance
        class="-body-6"
        :unit="stateStore.balanceDisplayMode"
        :amount="props.info.amount"
        theme="neutral"
      />
    </div>
    <KitButton
      class="link"
      icon="caretRight"
      to="/screen/transaction?t=slide-up"
      theme="free"
      size="small"
      @click="onLinkClick"
    />
  </div>
</template>

<style scoped lang="scss">

.coin-selection-item {
  padding-top: 10px;
  padding-bottom: 10px;
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

  .center {
    display: flex;
    align-items: center;
    flex-grow: 1;
    gap: 10px;

    p {
      &.-note {
        color: var(--neutral-9);
      }

      &.-date {
        color: var(--neutral-7);
      }
    }
  }

  .percentage {
    width: 25px;
    height: 8px;
    border-radius: 3px;
    background-color: var(--neutral-4);
    position: relative;
    overflow: hidden;

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: width 150ms $ease;

      &:first-child { background-color: var(--neutral-9); }
      &:nth-child(2) { background-color: var(--green); }
    }
  }

  ::v-deep(.link) {
    width: 26px;
    height: 26px;
    flex-basis: 26px;

    svg {
      width: 14px !important;
      height: 14px !important;
      color: var(--neutral-7);
    }

    &:hover {
      background-color: var(--neutral-2) !important;

      svg {
        color: var(--primary);
      }
    }
  }

  &:hover {
    // background-color: var(--neutral-1);

    .left {
      .toggle {
        // border-color: var(--primary);
      }

      .info {
        p {
          &:first-child {
            // color: var(--primary);
          }

          &:nth-child(2) {
            // color: var(--primary);
          }
        }
      }

      ::v-deep(.balance) {
        // color: var(--primary) !important;

        .-nz {
          // color: var(--primary) !important;
        }
      }
    }
  }

  &.-active {
    .toggle {
      background-color: var(--neutral-9);
    }

    .percentage {
      background-color: var(--neutral-9);

      .bar {
        opacity: 0 !important;
      }
    }

    &:hover {
      .toggle {
        // background-color: var(--primary);
        }
    }
  }

  @include container(small) {
    .center {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      p {
        &.-date {
          order: 3;
        }
      }
    }
  }

  @include container(medium-up) {
    display: flex;

    .center {
      p {
        &.-date {
        }
      }

      .percentage {
        margin-left: auto;
      }

      .balance {
        min-width: 110px;
        text-align: right;
      }
    }
  }
}

</style>

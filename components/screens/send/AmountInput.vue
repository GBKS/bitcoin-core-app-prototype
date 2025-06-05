<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'label',
  'amount',
  'balance',
  'required',
  'disabled',
  'showSendMax',
  'sendMaxEnabled',
  'remainingBalance'
])

const emit = defineEmits([
  'change',
  'toggleSendMax',
  'validate'
])

const stateStore = useStateStore()
const amountValue = ref(null)
const hasFocus = ref(false)
const error = ref(null)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

watch(() => props.amount, (newValue) => {
  updateAmountValue(newValue)
})

watch(() => stateStore.balanceDisplayMode, (newValue) => {
  updateAmountValue(props.amount)
})

function updateAmountValue(newValue) {
  let adjustedValue = newValue

  if(stateStore.balanceDisplayMode !== 'satoshi' && newValue !== 0) {
    adjustedValue = trimEndChar((newValue / 100000000).toFixed(8), '0')

    if(adjustedValue.endsWith('.')) {
      adjustedValue = adjustedValue.slice(0, -1) // Remove trailing dot if it exists
    }

    if(adjustedValue === '0') {
      adjustedValue = ''
    }
  }

  amountValue.value = adjustedValue
}

function trimEndChar(str, charToTrim) {
  // Escape special regex characters
  const escapedChar = charToTrim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Create regex that matches one or more of the char at the end
  const regex = new RegExp(`${escapedChar}+$`);
  // Replace matches with empty string
  return str.replace(regex, '');
}

const placeholder = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? '0' : '0.00 000 000'
})

function changeValue(event) {
  console.log('changeValue', event.target.value, parseFloat(event.target.value))
  emit('change', parseFloat(event.target.value))
}

function toggleUnit() {
  stateStore.balanceDisplayMode = stateStore.balanceDisplayMode == 'satoshi' ? 'bitcoin' : 'satoshi'
}

const toggleLabel = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? 'sats' : '₿' 
})

function setFocus() {
  hasFocus.value = true
}

function removeFocus() {
  hasFocus.value = false

  validate()
}

function validate() {
  let amount = amountValue.value
  if(stateStore.balanceDisplayMode !== 'satoshi' && amount !== null) {
    amount = parseFloat(amount) * 100000000
  } else {
    amount = parseFloat(amount)
  }

  const result = {
    value: props.balance,
    isValid: true,
    error: null
  }

  let newError = error.value

  if(props.balance) {
    if(amount > props.balance) {
      newError = 'insufficient-funds'

      result.isValid = false
      result.error = 'insufficient-funds'
    } else {
      newError = null
    }
  }

  // console.log('validate', amount, props.balance, newError)

  error.value = newError

  emit('validate', result)
}

const hasContent = computed(() => {
  return amountValue.value !== null
})

const classObject = computed(() => {
  const c = ['send-amount-input']

  if(hasContent.value) {
    c.push('-has-content')
  }

  if(hasFocus.value) {
    c.push('-has-focus')
  }

  if(props.disabled) {
    c.push('-disabled')
  }

  return c
})

const step = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? '1' : '0.00000001'
})

function sendMax() {
  emit('toggleSendMax', true)
}

function toggleSendMax() {
  emit('toggleSendMax', !props.sendMaxEnabled)
}

onBeforeMount(() => {
  updateAmountValue(props.amount)
})
</script>

<template>
    <div :class="classObject">
      <div class="content">
        <div class="left">
          <label
              class="-body-5"
              :for="uniqueId"
              :disabled="disabled"
          >{{ label }}</label>
          <input
              class="-body-5"
              type="number"
              :id="uniqueId"
              :value="amountValue"
              :placeholder="placeholder"
              :step="step"
              :required="required"
              :disabled="disabled"
              @focus="setFocus"
              @blur="removeFocus"
              @change="changeValue"
          />
        </div>
        <button
          class="toggle"
          @click="toggleUnit"
        >
          <p class="-body-5">{{ toggleLabel }}</p>
          <div v-html="Icons.flip" />
        </button>
      </div>
      <div class="send-max" v-if="showSendMax">
        <button
          class="-body-6"
          @click="toggleSendMax"
        >
          <KitToggle
            size="tiny" 
            tag="span" 
            :active="sendMaxEnabled"
          /> Use remaining balance
        </button>
      </div>
      <div class="error" v-if="error">
        <span class="icon" v-html="Icons.alert" />
        <template v-if="error == 'insufficient-funds'">
          <p class="-body-6">Balance: <KitBalance 
            :amount="balance" 
            theme="light"
            tag="span"
            :unit="stateStore.balanceDisplayMode"
          />.</p>
          <button
            class="-body-6"
            @click="sendMax"
          >Send max</button>.
        </template>
      </div>
    </div>
</template>

<style scoped lang="scss">

.send-amount-input {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &:not(.-disabled) {
      .content {
        .left {
          label {
            &:hover {
              input {
                color: var(--primary);
              }
            }
          }
        }
      }
    }

    .content {
      display: flex;
      gap: 5px;

      .left {
        display: flex;
        gap: 5px;
        flex-basis: 10px;
        flex-grow: 1;
        min-width: 0;

        label {
          color: var(--neutral-9);
          width: 110px;
        }

        input {
          appearance: none;
          border-width: 0;
          background-color: transparent;
          padding: 0;
          -moz-appearance: textfield;
          color: var(--neutral-9);
          box-sizing: border-box;
          min-width: 0;
          flex: 1;

          &::placeholder {
            color: var(--neutral-5);
          }

          /* Chrome, Safari, Edge, Opera */
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &:focus-visible {
              outline: none;
          }

          &:disabled {
            color: var(--neutral-7);
          }
        }
      }

      .toggle {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--neutral-7);
        flex: 0 0 auto;
        padding: 3px 9px;
        border-radius: 5px;

        > * {
          flex-shrink: 0;
        }

        > div {
          line-height: 0;

          ::v-deep(svg) {
            width: 18px;
            height: 18px;
          }
        }

        &:hover {
          color: var(--primary);
          cursor: pointer;
          background-color: var(--neutral-1);

          p {
            color: var(--primary);
          }
        }
      }
    }

    .send-max {
      padding-top: 5px;

      button {
        color: var(--neutral-7);

        ::v-deep(> span) {
          display: inline-block;
          vertical-align: middle;

          &:first-child {
            margin-right: 8px;
          }
        }
      }
    }

    .error {
      display: flex;
      align-items: center;
      // gap: 10px;

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--red);
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 10px;

        ::v-deep(svg) {
          width: 8px;
          height: 8px;
          color: white;
        }
      }

      p {
        color: var(--red);

        span {
          color: var(--red);
        }
      }

      button {
        margin-left: 5px;
        text-decoration: underline;
        color: var(--red);

        &:hover {
          color: var(--primary);
          cursor: pointer;
        }
      }
    }

    &.-has-content,
    &.-has-focus {
      .content {
          .left label {
              // color: var(--neutral-7);
          }
        }
    }

    @include container(small) {
      .content {
        .left {
          flex-direction: column;
        }
      }
    }

    @include container(medium-up) {
      .content {
        .left {
          align-items: center;
        }
      }

      .error {
        padding-left: 110px;
      }

      .send-max {
        padding-left: 115px;
      }
    }
}

</style>

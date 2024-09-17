<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'
import QRCode from "qrcode";

definePageMeta(transition)

const amountValue = ref(null)
const unitValue = ref('bitcoin')
const nameValue = ref('')
const messageValue = ref('')
const noteValue = ref('')
const addressValue = ref(null)
const optionsVisible = ref(false)
const optionsElement = ref(null)
const state = useStateStore()
const addressGenerated = ref(false)
const qrCodeCanvas = ref(null)
const browserShareAvailable = ref(true)
const copyPaymentRequestButtonElement = ref(null)
const paymentRequestCounter = ref(10)

const props = defineProps([
  'stateId',
  'state'
])

function changeAmountValue(newValue) {
  amountValue.value = newValue
  saveState()
  renderCodeTimeout()
}

function changeUnitValue(newValue) {
  unitValue.value = newValue
  saveState()
  renderCodeTimeout()
}

function changeNameValue(newValue) {
  nameValue.value = newValue
  saveState()
  renderCodeTimeout()
}

function changeMessageValue(newValue) {
  messageValue.value = newValue
  saveState()
  renderCodeTimeout()
}

function changeNoteValue(newValue) {
  noteValue.value = newValue
  saveState()
  renderCodeTimeout()
}

function generateAddress() {
  paymentRequestCounter.value++

  addressValue.value = StateHelper.address()

  addressGenerated.value = true

  setTimeout(() => {
    renderCode()
  }, 50)
}

function saveState() {
  state.paymentRequest = {
    amount: amountValue.value,
    unit: unitValue.value,
    name: nameValue.value,
    message: messageValue.value,
    note: noteValue.value,
    address: StateHelper.address()
  }
}

const bitcoinUrl = computed(() => {
  return "bitcoin://" + addressValue.value + "?amount=" + amountValue.value + "&message=" + messageValue.value + "&label=" + nameValue.value
})

function sharePaymentRequest() {
  const data = {
    title: 'Payment request for ' + amountValue.value + ' ' + unitValue.value,
    text: messageValue.value,
    url: bitcoinUrl.value
  }
  
  navigator.share(data)
}

function renderCodeTimeout() {
  setTimeout(() => {
    renderCode()
  }, 50)
}

function renderCode() {
  QRCode.toCanvas(qrCodeCanvas.value, bitcoinUrl.value, {
    margin: 0,
    color: {
      dark: state.theme == 'dark' ? '#000000' : '#FFFFFF',
      light: state.theme == 'dark' ? '#FFFFFF' : '#000000'
    }
  })
}

function toggleOptions() {
  optionsVisible.value = !optionsVisible.value

  const menuOptions = {
    "address-type": {
      label: 'Show address type'
    },
    "request-history": {
      label: 'View payment request history'
    },
    "address-history": {
      label: 'View address history'
    }
  }

  window.emitter.emit('toggle-context-menu', {
    id: 'receive-options',
    options: menuOptions,
    element: optionsElement.value
  })
}

function clearRequest() {
  addressGenerated.value = false
  amountValue.value = null
  noteValue.value = ''
  messageValue.value = ''
  nameValue.value = ''
}

const copyPaymentRequest = (event) => {
  window.emitter.emit('show-tooltip', {
    id: 'receive-copy',
    element: event.target,
    options: {
      label: 'Copied',
      icon: 'check'
    }
  })

  setTimeout(() => {
    window.emitter.emit('hide-tooltip', {
      id: 'receive-copy'
    })
  }, 2000)
}

const copyAddress = (event) => {
  window.emitter.emit('show-tooltip', {
    id: 'receive-copy',
    element: event.target,
    options: {
      label: 'Copied',
      icon: 'check'
    }
  })

  setTimeout(() => {
    window.emitter.emit('hide-tooltip', {
      id: 'receive-copy'
    })
  }, 2000)
}

const addressChunks = computed(() => {
  return addressValue.value ? addressValue.value.match(/.{1,4}/g) : []
})

const formattedAddress = computed(() => {
  return '<span>' + addressChunks.value.join('</span><span>') + '</span>'
})

const addressClasses = computed(() => {
  const c = ['-body-5']
  c.push('-chunks-' + addressChunks.value.length)

  if(addressGenerated.value) {
    c.push('-address-generated')
  }

  return c.join(' ')
})

const title = computed(() => {
  return addressGenerated.value ? 'Payment request #' + paymentRequestCounter.value : 'Request a payment'
})

onBeforeMount(() => {
  addressValue.value = StateHelper.address()
})

onBeforeUnmount(() => {
  saveState()
})  

onMounted(() => {
  if(process.client) {
    browserShareAvailable.value = !!navigator.share
  }
})
</script>

<template>
  <KitScreen class="receive">
    <template v-if="stateId == 'receive' && state">
      <div class="top-mobile">
        <KitTopBar
          buttonLeftLabel="Cancel"
          buttonLeftTo="/screen/activity?t=slide-down"
        />
      </div>

      <div class="form">
        <div class="form-header">
          <h5 class="-title-4">{{ title }}</h5>
          <div class="options" ref="optionsElement">
            <KitButton
              icon="ellipsis"
              theme="free"
              @click="toggleOptions"
            />
          </div>
        </div>

        <div class="qr-code">
          <Transition name="fade" appear>
            <canvas
              v-if="addressGenerated"
              ref="qrCodeCanvas"
            />
          </Transition>
        </div>

        <div class="form-fields">
          <ScreensReceiveAmountInput
            label="Amount"
            :amount="amountValue"
            :unit="unitValue"
            @change="changeAmountValue"
            @changeUnit="changeUnitValue"
          />
          <ScreensReceiveInput
            label="Your name"
            :text="nameValue"
            placeholder="Enter name..."
            @change="changeNameValue"
          />
          <ScreensReceiveInput
            label="Message"
            :text="messageValue"
            placeholder="Enter message..."
            @change="changeMessageValue"
          />
          <ScreensReceiveInput
            label="Note to self"
            :text="noteValue"
            placeholder="Enter private note..."
            @change="changeNoteValue"
          />

          <Transition name="fade" appear>
            <div class="field -address">
              <div class="info">
                <h4 class="-body-5">Address</h4>
                <button
                  class="-body-5" 
                  :disabled="!addressGenerated"
                  @click="(event) => copyAddress(event)"
                >Copy</button>
              </div>
              <p
                :class="addressClasses"
                v-html="formattedAddress"
              />
            </div>
          </Transition>

          <div class="options">
            <KitButton
              v-if="!addressGenerated"
              label="Create bitcoin address"
              @click="generateAddress"
            />
            <KitButton
              v-if="addressGenerated && browserShareAvailable"
              label="Share"
              @click="sharePaymentRequest"
            />
            <KitButton
              v-if="addressGenerated && !browserShareAvailable"
              label="Copy payment request"
              @click="(event) => copyPaymentRequest(event)"
            />
            <KitButton
              v-if="addressGenerated"
              label="Clear"
              theme="outline"
              @click="clearRequest"
            />
          </div>
        </div>
      </div>

    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.receive {
  .top-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  .form {
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 700px;

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .qr-code {
      background-color: var(--neutral-2);

      canvas {
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 1;
      }
    }

    .form-fields {
      & > * {
        border-top: 1px solid var(--neutral-3);

        &:first-child,
        &:last-child {
          border-top-width: 0;
        }
      }

      .options {
        margin-top: 30px;
        display: flex;
        gap: 20px;
        flex-direction: column;
      }

      .field {
        &.-address {
          padding: 15px 0;
          display: flex;
          align-items: flex-start;
          gap: 5px;

          .info {
            display: flex;
            flex-direction: column;
            flex-basis: 110px;
            flex-shrink: 0;

            button {
              padding: 0;
              color: var(--primary);
              text-align: left;

              &:disabled {
                color: var(--neutral-4);
              }
            }
          }

          p {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            font-family: monospace;
            font-size: 18px;

            ::v-deep(span) {
              color: transparent;
              transition: all 150ms $ease;
            }

            &:not(.-address-generated) {
              ::v-deep(span) {
                background-color: var(--neutral-2);
                border-radius: 3px;
              }
            }

            &.-address-generated {
              ::v-deep(span) {
                color: var(--neutral-9);

                &:nth-child(2n) {
                  color: var(--neutral-7);
                }
              }
            }
          }
        }
      }
    }
  }

  &.-show-qr {
    .form {
      .qr-code {
        background-color: transparent;
      }
    }
  }

  @include container(small) {
    .form {
      flex-direction: column;
      align-items: center;
      padding: 15px 15px;

      .form-header {
        margin-bottom: 15px;
      }

      .qr-code {
        width: 250px;
        height: 250px;
      }

      .form-fields {
        margin-top: 15px;
      }
    }
  }

  @include container(medium-up) {
    .top-mobile {
      display: none;
    }

    .form {
      flex-wrap: wrap;
      column-gap: 40px;
      padding: 30px 20px;

      .form-header {
        margin-bottom: 30px;
      }

      .form-fields {
        order: 2;
        flex-basis: 20%;
        flex-grow: 1;
      }

      .qr-code {
        order: 3;
        width: 150px;
        height: 150px;
      }
    }
  }
}

</style>
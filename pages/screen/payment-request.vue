<script setup>
import transition from '@/helpers/transition.js'
import { useStateStore } from "@/stores/state.js"
import StateHelper from '@/helpers/state-helper.js'
import QRCode from "qrcode";

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const state = useStateStore()

const qrCodeCanvas = ref(null)
const showQRCode = ref(false)
const isMobile = ref(false)
const noteModel = ref('')
const nameModel = ref('')
const amountModel = ref('')
const messageModel = ref('')
const browserShareAvailable = ref(true)

if(state.paymentRequest?.note) {
  noteModel.value = state.paymentRequest.note
}

if(state.paymentRequest?.amount) {
  amountModel.value = state.paymentRequest.amount
}

if(state.paymentRequest?.message) {
  messageModel.value = state.paymentRequest.message
}

const formattedAmount = computed(() => {
  const amount = state.paymentRequest?.amount || '25000'
  const unit = state.paymentRequest?.unit || 'sats'
  return amount
    ? amount + ' ' + unit
    : ''
})

const address = computed(() => {
  let address = state.paymentRequest?.address
  if(!address) address = StateHelper.address()
  return address
})

const addressChunks = computed(() => {
  return address.value.match(/.{1,4}/g)
})

const formattedAddress = computed(() => {
  return '<span>' + addressChunks.value.join('</span><span>') + '</span>'
})

const note = computed(() => {
  return state.paymentRequest?.note || ''
})

const message = computed(() => {
  return state.paymentRequest?.message || ''
})

const name = computed(() => {
  return state.paymentRequest?.name || ''
})

const addressClasses = computed(() => {
  const c = ['-body-5']
  c.push('-chunks-' + addressChunks.value.length)
  return c.join(' ')
})

function clickShare() {
  const data = {
    title: 'Payment request',
    url: 'bitcoin://' + address.value + '?amount=' + amountModel.value + '&message=' + messageModel.value
  }
  console.log('nav', navigator)
  // navigator.share(data)
}

function clickCopy() {

}

function toggleQRCode() {
  showQRCode.value = !showQRCode.value
  if(showQRCode.value) {
    setTimeout(() => {
      renderCode()
    }, 25)
  }
}

function updateIsMobile() {
  const container = document.getElementById('prototype-container')
  const containerRectangle = container.getBoundingClientRect()

  isMobile.value = containerRectangle.width < 640
}

function renderCode() {
  const url = "bitcoin://" + address.value

  QRCode.toCanvas(qrCodeCanvas.value, url, {
    margin: 0,
    color: {
      dark: state.theme == 'dark' ? '#000000' : '#FFFFFF',
      light: state.theme == 'dark' ? '#FFFFFF' : '#000000'
    }
  })
}

onMounted(() => {
  updateIsMobile()
  
  if(isMobile.value) {
    showQRCode.value = true
    renderCode()
  }

  if(process.client) {
    browserShareAvailable.value = !!navigator.share
  }
})
</script>

<template>
  <KitScreen class="payment-request">
    <template v-if="stateId == 'payment-request' && state">
      <KitTopBar
        buttonLeftLabel="Done"
        buttonLeftTo="/screen/receive?t=slide-down"
        title="Payment request #1"
        buttonRightIcon="ellipsis"
      />

      <div v-if="showQRCode" class="qr-code">
        <canvas
          ref="qrCodeCanvas"
        />
      </div>

      <div class="info">
        <div class="field -address">
          <h4 class="-title-6">Address</h4>
          <p
            :class="addressClasses"
            v-html="formattedAddress"
          />
          <div class="options">
            <button @click="clickCopy">Copy</button>
            <button v-if="!isMobile" @click="toggleQRCode">QR code</button>
          </div>
        </div>
        <div class="field -note">
          <h4 class="-title-6">Note to self</h4>
          <p class="-body-5" v-html="note" />
          <input
            type="text"
            v-model="noteModel"
            placeholder="Enter note..."
          />
        </div>
        <div class="field -amount">
          <h4 class="-title-6">Amount</h4>
          <p class="-body-5" v-html="formattedAmount" />
        </div>
        <div class="field -name">
          <h4 class="-title-6">Your name</h4>
          <input
            type="text"
            v-model="nameModel"
            placeholder="Enter name..."
          />
        </div>
        <div class="field -message">
          <h4 class="-title-6">Message</h4>
          <input
            type="text"
            v-model="messageModel"
            placeholder="Enter message..."
          />
        </div>
      </div>

      <div class="bottom">
        <KitButton
          v-if="browserShareAvailable"
          label="Share"
          theme="outline"
          @click="clickShare"
        />
        <KitButton
          label="Copy"
          theme="outline"
          @click="clickCopy"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.payment-request {
  .qr-code {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    canvas {
      width: 100% !important;
      height: auto !important;
      max-width: 200px;
      aspect-ratio: 1;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 490px;
    padding: 30px 20px;
    gap: 20px;

    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;

      h4 {
        color: var(--neutral-7);
      }

      p {
        color: var(--neutral-9);
      }

      &.-address {
        p {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          font-family: monospace;
          font-size: 18px;

          ::v-deep(span) {
            color: var(--neutral-9);

            &:nth-child(2n) {
              color: var(--neutral-7);
            }
          }
        }

        .options {
          display: flex;
          gap: 10px;

          button {
            color: var(--primary);
          }
        }
      }
    }
  }

  .bottom {
    flex-direction: row;
    max-width: 490px;
    padding: 30px 20px;

    ::v-deep(*) {
      flex-grow: 1;
    } 
  }
}

</style>
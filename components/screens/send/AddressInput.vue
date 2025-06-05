<script setup>
/**

AddressInput component is used to input a Bitcoin address. It provides validation and formatting of the address.

Props:
  - address: The address to be displayed in the input field
  - editable: Whether the input field is editable or not

Emits:
  - change: When the address is changed
  - validate: When the address is validated

Usage:
  <AddressInput
    :address="address"
    :editable="editable"
    @change="onAddressChange"
    @validate="onAddressValidate"
  />

**/

import { ADDRESS_TYPES, AddressHelper} from '@/helpers/address.js';
import StateHelper from '@/helpers/state-helper.js'

const props = defineProps([
  'address',
  'editable'
])

const emit = defineEmits([
  'change',
  'validate'
])

watch(() => props.address, (newValue) => {
  applyFormattedAddress(newValue)
  // console.log('AddressInput watch address', newValue)
  // validate()
})

const addressValue = ref('')
const addressInput = ref(null)
const validationError = ref(null)

const addressType = ref(null)
const addressInfo = ref()
const validationResult = ref(null)
const bech32FixableErrors = ref(null)
const bech32IncorrectCharacters = ref(null)

function applyFormattedAddress(address) {
  const start = addressInput.value.selectionStart;
  const end = addressInput.value.selectionEnd;
  let value = address.replace(/\s/g, '');
  let formattedValue = '';
  let cursorOffset = 0;

  for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
          if (i < start) cursorOffset++;
      }
      formattedValue += value[i];
  }

  const newValue = formattedValue.trim();

  if(newValue !== addressValue.value) {
    addressValue.value = formattedValue.trim();
    
    addressInput.value.setSelectionRange(start + cursorOffset, end + cursorOffset)
  }
}

function onAddressInput(event) {
  // console.log('AddressInput.onAddressInput', event.target.value)

  applyFormattedAddress(event.target.value)

  emit('change', addressValue.value)
}

function chunkAddress(value) {
  let newValue = value.replace(/\s/g, '');
  let formattedValue = '';
  let cursorOffset = 0;

  for (let i = 0; i < newValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
      }
      formattedValue += newValue[i];
  }

  return formattedValue.trim();
}

const styledAddress = computed(() => {
  return '<span>' + addressValue.value.split(' ').join('</span> <span>') + '</span>'
})

function clickPaste() {
  // addressValue.value = chunkAddress(StateHelper.address())
  addressValue.value = chunkAddress('bc1qtz5fl2n76wcmfdhxq9svv5q0hpyvkrew0s5kly')

  validate()
  emit('change', addressValue.value)
}

function generateAddress() {
  // addressValue.value = chunkAddress(StateHelper.address())
  addressValue.value = chunkAddress('bc1qtz5fl2n76wcmfdhxq9svv5q0hpyvkrew0s5kly')

  validate()
  emit('change', addressValue.value)
}

function onInputBlur() {
  validate()
}

function validate() {
  const address = addressValue.value.replace(/\s/g, '')
  let newValidationError = validationError.value

  console.log('AddressInput.validate', address)

  const result = {
    value: address,
    isValid: true,
    error: null
  }

  if(addressValue.value === '') {
    newValidationError = 'empty'

    result.isValid = false
    result.error = 'empty'
  } else {
    addressInfo.value = AddressHelper.getAddressInfo(address)
    validationResult.value = AddressHelper.validateBitcoinAddress(address)
    addressType.value = AddressHelper.getAddressType(address)

    if(addressType.value === ADDRESS_TYPES.BECH32_INVALID) {
      bech32FixableErrors.value = AddressHelper.tryFixingBech32Errors(address)
      bech32IncorrectCharacters.value = AddressHelper.detectIncorrectBech32Characters(address)
    } else {
      bech32FixableErrors.value = null
      bech32IncorrectCharacters.value = null
    }

    // console.log('validate', address)
    // console.log('addressInfo', addressInfo.value)
    // console.log('validationResult', validationResult.value)
    // console.log('addressType', addressType.value)
    // console.log('bech32FixableErrors', bech32FixableErrors.value)
    // console.log('bech32IncorrectCharacters', bech32IncorrectCharacters.value)

    if(!validationResult.value) {
      newValidationError = addressType.value

      result.isValid = false
      result.error = addressType.value

    } else {
      newValidationError = null
    }

    // console.log('AddressInput.validate', validationError.value, addressValue.value)
  }

  validationError.value = newValidationError

  emit('validate', result)
}

onBeforeMount(() => {
  addressValue.value = chunkAddress(props.address)
})
</script>

<template>
  <div class="address-input">
    <div class="info">
      <h4 class="-body-5" @click="generateAddress">Send to</h4>
      <button
        v-if="false && editable"
        class="-body-6" 
        @click="clickPaste"
      >Paste</button>
      <button
        v-if="false && editable"
        class="-body-6" 
      >Contacts</button>
    </div>
    <div class="right">
      <div class="input">
        <textarea
          class="-body-5"
          type="text"
          v-model="addressValue"
          ref="addressInput"
          placeholder="Enter address..."
          autocomplete="off"
          spellcheck="false"
          applyFormattedAddress="72"
          :disabled="!editable"
          @blur="onInputBlur"
          @input="onAddressInput"
        />
        <p class="-body-5" v-html="styledAddress"></p>
      </div>
      <p class="error" v-if="validationError">{{ validationError }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.address-input {
  padding: 15px 0;
  display: flex;
  align-items: flex-start;
  gap: 5px;

  .info {
    display: flex;
    flex-direction: column;

    button {
      padding: 0;
      color: var(--primary);
      text-align: left;

      &:disabled {
        color: var(--neutral-4);
      }
    }
  }

  .right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .input {
      position: relative;
      line-height: 0;

      textarea {
        width: 100%;
        form-sizing: normal;
        field-sizing: content;
        appearance: none;
        background-color: transparent;
        border-width: 0;
        resize: none;
        padding: 1px;
        color: transparent;
        // color: var(--neutral-5);
        caret-color: var(--neutral-9);
        font-family: monospace;
        letter-spacing: -0.01rem;
        font-size: 17px;
        line-height: 1.4;

        &::placeholder {
          color: var(--neutral-5);
        }

        &:focus-visible {
          outline: none;
        }
      }

      p {
        position: absolute;
        padding: 1px;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
        color: var(--neutral-7);
        font-family: monospace;
        font-size: 17px;

        ::v-deep(span) {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-last-child(2),
          &:nth-last-child(1) {
            color: var(--neutral-9);
          }
        }
      }
    }

    .error {
      color: var(--red);
    }
  }

  @include container(small) {
    flex-direction: column;
    align-items: stretch;
  }

  @include container(medium-up) {
    .info {
      flex-basis: 110px;
      flex-shrink: 0;
    }
    
    .input {
      flex-grow: 1;
    }
  }
}

</style>

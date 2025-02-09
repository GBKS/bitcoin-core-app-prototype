<script setup>
import StateHelper from '@/helpers/state-helper.js'

const props = defineProps([
  'address',
  'editable'
])

const emit = defineEmits([
  'change'
])

watch(() => props.address, (newValue) => {
  addressValue.value = newValue
})

const addressValue = ref('')
const addressInput = ref(null)

function onAddressInput(event) {
  const start = addressInput.value.selectionStart;
  const end = addressInput.value.selectionEnd;
  let value = event.target.value.replace(/\s/g, '');
  let formattedValue = '';
  let cursorOffset = 0;

  for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
          if (i < start) cursorOffset++;
      }
      formattedValue += value[i];
  }

  addressValue.value = formattedValue.trim();
  
  // Adjust cursor position
  event.target.setSelectionRange(start + cursorOffset, end + cursorOffset)

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
  addressValue.value = chunkAddress(StateHelper.address())

  emit('change', addressValue.value)
}

function generateAddress() {
  addressValue.value = chunkAddress(StateHelper.address())

  emit('change', addressValue.value)
}

onBeforeMount(() => {
  addressValue.value = chunkAddress(props.address)
})
</script>

<template>
  <div class="address-input">
    <div class="info">
      <h4 class="-body-5" @click="generateAddress">Address</h4>
      <button
        v-if="false && editable"
        class="-body-6" 
        @click="clickPaste"
      >Paste</button>
      <button
        v-if="editable"
        class="-body-6" 
      >Contacts</button>
    </div>
    <div class="input">
      <textarea
        class="-body-5"
        type="text"
        v-model="addressValue"
        ref="addressInput"
        placeholder="Enter address..."
        autocomplete="off"
        spellcheck="false"
        :disabled="!editable"
        @input="onAddressInput"
      />
      <p class="-body-5" v-html="styledAddress"></p>
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

  .input {
    position: relative;

    textarea {
      width: 100%;
      form-sizing: normal;
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
        &:nth-child(2n) {
          color: var(--neutral-9);
        }
      }
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

<script setup>
import Icons from '@/helpers/icons.js'

const mode = ref('date')
const dateValue = ref('')
const blockValue = ref(null)
const uniqueId = 'input_' + Math.round(Math.random() * 1000000)

const minDateValue = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const maxDateValue = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toISOString().split('T')[0]
})

const minBlockValue = computed(() => {
  return 0
})

const maxBlockValue = computed(() => {
  return 1000000
})

const modeName = computed(() => {
  return mode.value == 'date' ? 'Block' : 'Date'
})

function toggleMode() {
  mode.value = mode.value == 'date' ? 'block' : 'date'
}
</script>

<template>
  <div class="timelock-input">
    <label
      class="-body-5"
      :for="uniqueId"
    >Lock until</label>
    <input
      v-if="mode == 'date'"
      class="-body-5"
      type="date"
      v-model="dateValue"
      placeholder="Enter date..."
      :id="uniqueId"
      :min="minDateValue"
      :max="maxDateValue"
    />
    <input
      v-if="mode == 'block'"
      class="-body-5"
      type="number"
      v-model="blockValue"
      placeholder="Enter block height..."
      :id="uniqueId"
      :min="minBlockValue"
      :max="maxBlockValue"
    />
    <button
      class="toggle -body-5"
      @click="toggleMode"
    >
      <p class="-body-5">{{ modeName }}</p>
      <div v-html="Icons.flip" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.timelock-input {
  padding: 15px 0;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  border-top: 1px solid var(--neutral-3);

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

    &[type="date"] {
      
    }

    &[type="number"] {
      
    }

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
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--neutral-7);
    flex: 0 0 auto;

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
    }
  }

  &:hover {
    input {
      color: var(--primary);
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    justify-content: center;
    align-items: center;
  }
}
</style>

<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()

const emit = defineEmits(['close', 'remove', 'select'])

const props = defineProps([
  'id'
])

const isActive = computed(() => {
  return stateStore.activeWalletId == props.id
})

const info = computed(() => {
  return stateStore.wallets[props.id]
})

const classObject = computed(() => {
  const c = [
    '-title-6 -title-5-mobile'
  ]

  if(isActive.value) {
    c.push('-active')
  }

  return c.join(' ')
})

const ariaLabel = computed(() => {
  return 'Select wallet: ' + info.value.name
})

function clickSelect() {
  emit('select', props.id)
}

function clickClose() {
  if(confirm('Are you sure you want to close this wallet?')) {
    emit('close', props.id)
  }
}

function clickTrash() {
  if(confirm('Are you sure you want to remove this wallet?')) {
    emit('remove', props.id)
  }
}
</script>

<template>
  <div class="wallet-modal-item">
    <button
      :class="classObject"
      :aria-label="ariaLabel"
      @click="clickSelect"
    >{{ info.name }}</button>
    <div class="options">
      <button
        v-if="isActive"
        class="-close"
        aria-label="Close wallet"
        title="Close wallet"
        v-html="Icons.cross"
        @click="clickClose"
      />
      <button
        v-if="!isActive"
        class="-remove"
        aria-label="Remove wallet"
        title="Remove wallet"
        v-html="Icons.trash"
        @click="clickTrash"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.wallet-modal-item {
  position: relative;
  border-radius: var(--corner-radius);

  > button {
    width: 100%;
    padding: 7px 42px 7px 12px;
    min-width: 200px;
    color: var(--neutral-7);
    text-align: left;
    cursor: pointer;
    border-radius: var(--corner-radius);

    &.-active {    
      color: var(--primary);
    }

    &:focus-visible {
      outline: 2px solid var(--purple);
    }
  }

  .options {
    position: absolute;
    right: 0;
    top: 0;

    button {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: var(--neutral-7);
      border-radius: 5px;

      &.-remove {
        ::v-deep(svg) {
          width: 16px;
          height: 16px;
        }
      }

      &.-close {
        ::v-deep(svg) {
          width: 12px;
          height: 12px;
        }
      }

      &:active {
        color: var(--neutral-9);
        background-color: var(--neutral-1);
      }

      &:focus-visible {
        outline: 2px solid var(--purple);
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    > button {
      &:hover {
        color: var(--neutral-9);
        background-color: var(--neutral-2);
      }
    }
    
    .options {
      display: none;

      button {
        &:hover {
          color: var(--neutral-9);
          background-color: var(--neutral-2);
        }
      }
    }

    &:hover {
      .options {
        display: block;
      }
    }
  }
}

</style>
<script setup>
import StateHelper from '@/helpers/state-helper.js'

const emit = defineEmits([
  'select'
])

const dismissed = ref(false)
const address = StateHelper.address()

const shortenedAddress = computed(()  => {
  return address.substring(0, 6) + '...' + address.substring(address.length - 6)
})

function pressUse() {
  emit('select', address)
  dismissed.value = true
}
</script>

<template>
  <div class="clipboard" v-if="!dismissed">
    <div class="text">
      <h4 class="-body-6">You copied an address.</h4>
      <p class="-body-6">{{ shortenedAddress }}</p>
    </div>
    <div class="options">
      <KitButton
        label="Dismiss"
        size="small"
        theme="outline"
        @click="dismissed = true"
        />
        <KitButton
        label="Use"
        size="small"
        @click="pressUse"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.clipboard {
  display: flex;
  gap: 5px;
  padding: 15px;
  // border-top: 1px solid var(--neutral-3);
  background-color: rgba(var(--blue-rgb), 0.1);
  border-radius: 15px;

  .text {
    display: flex;
    flex-direction: column;
    gap: 2px;

    h4 {
      
    }

    p {

    }
  }

  .options {
    display: flex;
    gap: 10px;
  }

  @include container(small) {
    flex-direction: column;
  }

  @include container(medium-up) {
    align-items: center;

    .text {
      flex-grow: 1;
    }
  }
}
</style>

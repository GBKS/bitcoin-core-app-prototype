<script setup>
import { useStateStore } from "@/stores/state.js"
import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()

const props = defineProps([
  'balance'
])

function toggleUnit() {
  stateStore.balanceDisplayMode = stateStore.balanceDisplayMode == 'satoshi' ? 'bitcoin' : 'satoshi'
}

const toggleLabel = computed(() => {
  return stateStore.balanceDisplayMode == 'satoshi' ? 'sats' : '₿' 
})
</script>

<template>
  <div class="send-max">
    <div class="left">
      <h4 class="-body-5">Amount</h4>
      <p class="-body-5">Balance: <KitBalance :amount="balance" :unit="stateStore.balanceDisplayMode" theme="light" tag="span" /></p>
    </div>
    <button
      class="toggle"
      @click="toggleUnit"
    >
      <p class="-body-5">{{ toggleLabel }}</p>
      <div v-html="Icons.flip" />
    </button>
  </div>
</template>

<style scoped lang="scss">

.send-max {
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;

  .left {
    flex-grow: 1;
    display: flex;

    p {
      flex-grow: 1;
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
      background-color: var(--neutral-2);

      p {
        color: var(--primary);
      }
    }
  }

  @include container(small) {
    .left {
      flex-direction: column;
      gap: 5px;
    }
  }

  @include container(medium-up) {
    .left {
      gap: 5px;
      
      h4 {
        width: 110px;
      }
    }
  }
}

</style>

<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info'
])

const stateStore = useStateStore()
const expanded = ref(false)

const classObject = computed(() => {
  const c = ['multiple-recipients-item']
  
  if(hasNote.value) {
    c.push('-has-note')
  }

  if(expanded.value) {
    c.push('-expanded')
  }

  return c
})

const hasNote = computed(() => {
  return props.info.note?.length > 0
})

const note = computed(() => {
  return props.info.note || 'No note'
})

const fee = computed(() => {
  return props.info.fee || 375
})

const total = computed(() => {
  return props.info.amount + fee.value
})

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <div :class="classObject">
    <div class="top" @click="toggle">
      <p v-if="hasNote" class="-body-5">{{ note }}</p>
      <KitAddress
        v-if="!hasNote"
        class="-body-5"
        :address="info.address"
        :elide="!expanded"
      />
      <KitBalance
        class="-body-5"
        :amount="Math.abs(info.amount)"
        :unit="stateStore.balanceDisplayMode"
        theme="neutral"
      />
    </div>
    <KitAddress
      v-if="hasNote && expanded"
      class="-body-5"
      :address="info.address"
    />
  </div>
</template>

<style scoped lang="scss">

.multiple-recipients-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 15px;
  padding-bottom: 15px;

  .top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;

    p {
      &.-short {
        color: var(--neutral-9);
      }

      &.-empty {
        color: var(--neutral-4);
      }
    }
  }

  &.-has-note {

  }
}

</style>

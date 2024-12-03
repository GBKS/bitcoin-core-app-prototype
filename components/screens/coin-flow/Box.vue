<script setup>
import { useStateStore } from "@/stores/state.js"

const props = defineProps([
  'info',
  'direction'
])

const emit = defineEmits(['mounted'])

const stateStore = useStateStore()
const boxElement = ref()

const classObject = computed(() => {
  const c = [
    'coin-flow-box',
    '-' + props.direction
  ]

  if(props.info.type) c.push('-'+props.info.type)

  return c.join(' ')
})

const primary = computed(() => {
  let result = props.info.title

  if(!result || result.length == 0) {
    const chunks = props.info.address.match(/.{1,4}/g);

    result = chunks[0] + ' ' + chunks[1] + ' ... ' + props.info.address.slice(-4)
  }

  return result
})

const secondary = computed(() => {
  let result

  if(props.info.title) {
    const chunks = props.info.address.match(/.{1,4}/g);

    result = chunks[0] + ' ' + chunks[1] + ' ... ' + props.info.address.slice(-4)
  }

  return result
})

onMounted(() => {
  emit('mounted', props.info.id, boxElement.value)
})
</script>

<template>
    <div :class="classObject" ref="boxElement">
      <h5 class="-title-7">{{ primary }}</h5>
      <p v-if="secondary" class="-body-7">{{ secondary }}</p>
      <KitBalance
        class="-body-7"
        :unit="stateStore.balanceDisplayMode"
        :amount="info.amount"
        theme="dark"
      />
    </div>
</template>

<style scoped lang="scss">

.coin-flow-box {
  padding: 7px 12px;
  border: 1px solid rgba(var(--purple-rgb), 0.4);
  background-color: rgba(var(--purple-rgb), 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h5 {
    color: var(--purple);
  }

  &.-output {
    border-color: rgba(var(--orange-rgb), 0.4);
    background-color: rgba(var(--orange-rgb), 0.1);

    h5 {
      color: var(--orange);
    }

    &.-change {
      border-color: rgba(var(--purple-rgb), 0.4);
      background-color: rgba(var(--purple-rgb), 0.1);

      h5 {
        color: var(--purple);
      }
    }

    &.-fee {
      border-color: rgba(var(--blue-rgb), 0.4);
      background-color: rgba(var(--blue-rgb), 0.1);

      h5 {
        color: var(--blue);
      }
    }
  }

  h5,
  p {
    // word-break: break-all;
  }

  p {
    color: var(--neutral-7);
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    
  }
}

</style>

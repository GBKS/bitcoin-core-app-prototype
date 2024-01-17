<script setup>
const props = defineProps([
  'title',
  'description',
  'amount',
  'amountTwo',
  'active'
])

const classObject = computed(() => {
  const c = ['transaction-item']

  if(props.active) c.push('-active')

  if(parseFloat(props.amount) > 0) {
    c.push('-positive')
  }

  return c.join(' ')
})
</script>

<template>
  <button :class="classObject">
    <div class="left">
      <p class="-body-5">{{ title }}</p>
      <p class="-body-6" v-if="description">{{ description }}</p>
    </div>
    <div class="right" v-if="amount || amountTwo">
      <p class="-body-5" v-if="amount">{{ amount }}</p>
      <p class="-body-6" v-if="amountTwo">{{ amountTwo }}</p>
    </div>
  </button>
</template>

<style scoped lang="scss">

.transaction-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  text-align: left;
  cursor: pointer;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    gap: 0;

    p {
      margin: 0;
      color: var(--neutral-9);
      transition: all 100ms $ease;

      &:nth-child(2) {
        color: var(--neutral-7);
      }
    }
  }

  .left {
    flex-grow: 1;
  }

  .right {
    align-items: flex-end;
  }

  &.-positive {
    .right {
      p {
        &:first-child {
          color: var(--green);
        }
      }
    }
  }

  &:hover {
    .left {
      p {
        &:first-child {
          color: var(--primary);
        }
      }
    }
  }
}

</style>
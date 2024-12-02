<script setup>
const props = defineProps([
  'coins',
  'unit'
])

const buttonLabel = computed(() => {
  let result = 'Select'

  if(props.coins.length > 0) {
    result = props.coins.length + ' coin' + (props.coins.length == 1 ? '' : 's') + ' selected'
  }

  return result
})

</script>

<template>
  <div class="coin-selection">
    <h4 class="-body-5">Coins</h4>
    <NuxtLink
      to="/screen/coin-selection?t=slide-up"
      class="-body-5"
    >{{ buttonLabel }}</NuxtLink>
  </div>
</template>

<style scoped lang="scss">

.coin-selection {
  display: flex;
  gap: 5px;
  padding: 15px 0;
  border-top: 1px solid var(--neutral-3);

  h4 {
    width: 115px;
  }

  a {
    padding: 0;
    color: var(--primary);
    text-decoration: none;
  }
}

</style>

<script setup>
const props = defineProps([
  'info'
])
</script>

<template>
  <ul class="single-transaction">
    <li><h4 class="-body-5">Send to</h4><p class="-body-5">{{ info.address }}</p></li>
    <li><h4 class="-body-5">Amount</h4><p class="-body-5">{{ info.amount }}</p></li>
    <li><h4 class="-body-5">Note</h4><p class="-body-5">{{ info.note }}</p></li>
  </ul>
</template>

<style scoped lang="scss">

.single-transaction {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: none;
  padding: 0;

  li {
    display: flex;
    gap: 5px;

    h4 {
      min-width: 110px;
    }
  }
}

</style>

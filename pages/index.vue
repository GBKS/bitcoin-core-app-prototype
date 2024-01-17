<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)
</script>

<template>
  <div class="index">
    <h1 class="-title-2">Bitcoin Core App prototype</h1>
    <p class="-body-5">This is an HTML prototype for the <a href="https://bitcoincore.app/" target="_blank">Bitcoin Core App</a>, to quickly iterate on the design and interactive experience. It consists of mostly static screens and does not include any application logic. Code is <a href="https://github.com/GBKS/bitcoin-core-app-prototype" target="_blank">here</a>.<br/><br/><NuxtLink to="/screen/cover">View cover screen</NuxtLink></p>
  </div>
</template>

<style scoped lang="scss">

.index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  max-width: 600px;
}

</style>
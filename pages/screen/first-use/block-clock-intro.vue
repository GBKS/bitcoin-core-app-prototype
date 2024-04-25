<script setup>
import transition from '@/helpers/transition.js'
import lottie from 'lottie-web'
import { useStateStore } from "@/stores/state.js"

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const stateStore = useStateStore()
let lottieAnimation
const lottieCanvas = ref()
const lottieAvailable = ref(null)

const illustrationClass = computed(() => {
  const c = ['illustration']

  if(lottieAvailable.value === false) {
    c.push('-static')
  }

  return c.join(' ')
})

function lottieError() {
  lottieAvailable.value = false
}

function clickCanvas() {
  if(lottieAvailable.value === true) {
    lottieAnimation.goToAndPlay(0)
  }
}

function startAnimation() {
  if(lottie) {
    lottieAvailable.value = true

    const path = '/lottie/block-clock-' + (stateStore.theme == 'dark' ? 'light' : 'dark') + '.json'

    lottieAnimation = lottie.loadAnimation({
      name: 'onboarding-block-clock',
      container: lottieCanvas.value, // the dom element
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path,
      rendererSettings: {
        viewBoxOnly: true
      }
    })
    lottieAnimation.play()

    lottieAnimation.addEventListener('data_failed', lottieError)
  } else {
    lottieAvailable.value = false
  }
}

onMounted(() => {
  if(lottieCanvas.value) {
    startAnimation()
  } else {
    setTimeout(startAnimation, 50)
  }
})

onBeforeUnmount(() => {
  if(lottieAnimation) {
    lottieAnimation.destroy()
    lottieAnimation = null
  }
})
</script>

<template>
  <KitScreen class="block-clock-intro">
    <template v-if="stateId == 'first-use/block-clock-intro' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/strengthen-bitcoin?t=slide-right"
      />
      <div 
        :class="illustrationClass" 
        ref="lottieCanvas"
        @click="clickCanvas"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="bottom">
        <KitButton
          :label="state.button.label"
          :to="state.button.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.block-clock-intro {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-size: cover;

    &.-static {
      background-image: var(--block-clock-illustration);

      @include retina() {
        background-image: var(--block-clock-illustration-2x);
      }
    }
  }
}

</style>
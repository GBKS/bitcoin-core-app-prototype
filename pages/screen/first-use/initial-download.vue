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

function startAnimation() {
  if(lottie) {
    lottieAvailable.value = true

    const path = '/lottie/blocks-' + (stateStore.theme == 'dark' ? 'light' : 'dark') + '.json'

    lottieAnimation = lottie.loadAnimation({
      name: 'onboarding-blocks',
      container: lottieCanvas.value, // the dom element
      renderer: 'svg',
      loop: true,
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
  <KitScreen class="initial-download">
    <template v-if="stateId == 'first-use/initial-download' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/storage-amount?t=slide-right"
      />
      <div 
        :class="illustrationClass" 
        ref="lottieCanvas"
      />
      <KitHeader
        :title="state.title"
        :description="state.description"
      />
      <div class="bottom">
        <KitButton
          :label="state.buttonOne.label"
          :to="state.buttonOne.to"
          theme="free"
        />
        <KitButton
          :label="state.buttonTwo.label"
          :to="state.buttonTwo.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.initial-download {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-size: cover;

    &.-static {
      background-image: var(--initial-download-illustration-2x);

      @include retina() {
        background-image: var(--initial-download-illustration-2x);
      }
    }
  }
}

</style>
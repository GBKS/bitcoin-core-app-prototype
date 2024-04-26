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
const { theme } = storeToRefs(stateStore)
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

watch(theme, async() => {
  startAnimation()
})

function lottieError() {
  lottieAvailable.value = false
}

function startAnimation() {
  if(lottie) {
    lottieAvailable.value = true

    if(lottieAnimation) {
      lottieAnimation.destroy()
      lottieAnimation = null
    }

    const path = '/lottie/notifications-' + (stateStore.theme == 'dark' ? 'dark' : 'light') + '.json'

    lottieAnimation = lottie.loadAnimation({
      name: 'onboarding-notifications',
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
  <KitScreen class="notification-permission">
    <template v-if="stateId == 'first-use/notification-permission' && state">
      <KitTopBar
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/first-use/initial-download?t=slide-right"
        buttonRightLabel="Skip"
        buttonRightTo="/screen/activity?t=slide-left"
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
          :label="state.button.label"
          :to="state.button.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.notification-permission {
  .illustration {
    width: 200px;
    aspect-ratio: 1;
    background-size: cover;

    &.-static {
      background-image: var(--notification-illustration-2x);

      @include retina() {
        background-image: var(--notification-illustration-2x);
      }
    }
  }
}

</style>
<script setup>
import mitt from 'mitt'

import CoverScreen from '@/data/screens/cover.json'
import AboutScreen from '@/data/screens/about.json'
import DeveloperOptionsScreen from '@/data/screens/developer-options.json'
import StrengthenBitcoinScreen from '@/data/screens/strengthen-bitcoin.json'
import BlockClockIntroScreen from '@/data/screens/block-clock-intro.json'
import StorageLocationScreen from '@/data/screens/storage-location.json'
import StorageAmountScreen from '@/data/screens/storage-amount.json'
import StorageAmountOptionsScreen from '@/data/screens/storage-amount-options.json'
import InitialDownloadScreen from '@/data/screens/initial-download.json'
import InitialDownloadOptionsScreen from '@/data/screens/initial-download-options.json'
import NotificationPermissionScreen from '@/data/screens/notification-permission.json'
import ProxySettingsScreen from '@/data/screens/proxy-settings.json'
import ActivityScreen from '@/data/screens/activity.json'
import SendScreen from '@/data/screens/send.json'
import SendReviewScreen from '@/data/screens/send-review.json'
import ReceiveScreen from '@/data/screens/receive.json'
import SettingsScreen from '@/data/screens/settings.json'
import BlockClockScreen from '@/data/screens/block-clock.json'
import SnapshotScreen from '@/data/screens/snapshot.json'
import TransactionScreen from '@/data/screens/transaction.json'
import AddWalletScreen from '@/data/screens/add-wallet.json'

const Screens = {
  "cover": CoverScreen,
  "about": AboutScreen,
  "developer-options": DeveloperOptionsScreen,
  "strengthen-bitcoin": StrengthenBitcoinScreen,
  "block-clock-intro": BlockClockIntroScreen,
  "storage-location": StorageLocationScreen,
  "storage-amount": StorageAmountScreen,
  "storage-amount-options": StorageAmountOptionsScreen,
  "initial-download": InitialDownloadScreen,
  "initial-download-options": InitialDownloadOptionsScreen,
  "notification-permission": NotificationPermissionScreen,
  "proxy-settings": ProxySettingsScreen,
  "activity": ActivityScreen,
  "transaction": TransactionScreen,
  "send": SendScreen,
  "send-review": SendReviewScreen,
  "receive": ReceiveScreen,
  "settings": SettingsScreen,
  "block-clock": BlockClockScreen,
  "snapshot": SnapshotScreen,
  "add-wallet": AddWalletScreen
}

const route = useRoute()
const activeProtoNavTab = ref('screens')
const activeProtoNavId = ref(null)
const activeContentStateId = ref(null)
const showNav = ref(false)
const contentState = ref(null)
const preparedContentState = ref(null)
const theme = ref(null)
const showProtoNav = ref(true)
const mobileOnDesktop = ref(false)
const screenSize = ref('desktop')
const pageWrap = ref(null)

function prepScreens() {
  let i, k
  for(i in Screens) { 
    Screens[i].to = '/screen/'+i

    for(k in Screens[i].states) {
      Screens[i].states[k].to = '/screen/'+i+'?state='+k
    }
  }
}
prepScreens()

function updateFromRoute() {
  showNav.value = route.path !== '/'

  const bits = route.path.substr(1).split('/')

  if(bits[0] == 'screen') {
    activeProtoNavTab.value = 'screens'
    contentState.value = Screens[bits[1]]

    prepContentState(Screens[bits[1]], route.query.state)
  }

  activeContentStateId.value = route.query.state || 'default'

  activeProtoNavId.value = bits.length > 1 ? bits[1] : null

  if(route.query.theme) {
    theme.value = route.query.theme
    updateTheme()
  }
}

watch(() => route.path, () => { updateFromRoute() })
watch(() => route.query, () => { updateFromRoute() })

const navInfo = computed(() => {
  return Screens
})

function detectTheme() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if(prefersDark) {
    theme.value = 'dark'
  } else {
    theme.value = 'light'
  }

  updateTheme()
}

function toggleTheme(value) { 
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  
  updateTheme()
}

function updateTheme() {
  const themeColorMeta = document.getElementById('themeColorMeta')
  if(theme.value == 'dark') {
    document.body.classList.add('--theme-dark')
    themeColorMeta.content = '#000000'
  } else {
    document.body.classList.remove('--theme-dark')
    themeColorMeta.content = '#FFFFFF'
  }
}

function updateScreenSize() {
  if(pageWrap.value) {
    const sizes = [
      'huge',
      'large',
      'medium',
      'small'
    ]

    const widths = [
      1600,
      1280,
      1024,
      640
    ]

    const width = pageWrap.value.offsetWidth

    let result = 'huge'
    for(let i=0; i<sizes.length; i++) {
      if(width < widths[i]) {
        result = sizes[i]
      }
    }
    screenSize.value = result
  }
}

onBeforeMount(() => {
  
})

onMounted(() => {
  if(process.client) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme)

    detectTheme()

    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()
  }

  const emitter = mitt()
  window.emitter = emitter

  updateFromRoute()

  window.emitter.on('update-state', onUpdateState)
})

function onUpdateState(value) {
  contentState.value = value
}

function changeActiveProtoNavTab(value) { 
  activeProtoNavTab.value = value
}

function toggleProtoNav() { 
  showProtoNav.value = !showProtoNav.value
}

function prepContentState(base, stateId) {
  let result = JSON.parse(JSON.stringify(base.states.default));

  if(stateId) {
    const activeState = JSON.parse(JSON.stringify(base.states[stateId]));

    if(activeState) {
      copyProps(activeState, result)
    }
  }

  preparedContentState.value = result
}

function copyProps(one, two) {
  for(let key in one) {
    let item = one[key]

    if(typeof item == 'object') {
      copyProps(one[key], two[key])
    } else {
      two[key] = one[key]
    }
  }
}

const contentClass = computed(() => {
  const c = ['content-wrap']

  if(mobileOnDesktop.value) c.push('-mobile')

  return c.join(' ')
})

const showPage = computed(() => {
  let result = true

  if(route.path != '/' && !preparedContentState.value) {
    result = false
  }

  return result
})
</script>

<template>
  <div id="app">
    <ProtoNavMain
      :activeTab="activeProtoNavTab"
      :activeId="activeProtoNavId"
      :activeStateId="activeContentStateId"
      :info="navInfo"
      :state="contentState"
      :theme="theme"
      :showNav="showProtoNav"
      :isMobile="mobileOnDesktop"
      @changeTab="changeActiveProtoNavTab"
      @toggleTheme="toggleTheme"
      @toggleNav="toggleProtoNav"
      @toggleMobile="mobileOnDesktop = !mobileOnDesktop"
    />
    <div :class="contentClass">
      <div class="content">
        <NavDesktopTop v-if="contentState && (contentState.nav === true || contentState.nav === 'desktop')" />
        <div class="page-wrap" ref="pageWrap">
        <NuxtLayout>
          <NuxtPage
            v-if="showPage"
            :stateId="activeProtoNavId"
            :state="preparedContentState"
            :screenSize="screenSize"
          />
        </NuxtLayout>
        </div>
        <NavMobileTabs v-if="false && contentState && (contentState.nav === true || contentState.nav === 'mobile')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

#app {
  display: flex;
  min-height: 100vh;
  position: relative;

  > .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 100%;

    > .content {
      background-color: var(--neutral-0);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      flex-grow: 1;
      width: 100%;
      container-type: size;

      .page-wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        flex-grow: 1;
        width: 100%;
      }
    }
  }

  @include media-query(medium-up) {
    > .content-wrap {
      background-color: var(--neutral-2);
      border-left: 1px solid var(--neutral-4);

      &.-mobile {
        > .content {
          border-radius: 20px;
          max-width: 393px;
          max-height: 852px;
          box-shadow: 0 30px 60px -15px rgba(black, 0.15);
          overflow: hidden;
        }
      }
    }
  }
}

</style>
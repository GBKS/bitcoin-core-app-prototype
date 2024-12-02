<script setup>
import Icons from '@/helpers/icons.js'

const route = useRoute()
const router = useRouter()
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const startState = ref(null)
const defaultProxyActive = ref(false)
const defaultProxyValue = ref(null)
const defaultProxyError = ref(null)
const torProxyActive = ref(false)
const torProxyValue = ref(null)
const torProxyError = ref(null)
const hasSaved = ref(false)

function onChangeDefaultProxy(value) {
  defaultProxyValue.value = value
}

function onChangeTorProxy(value) {
  torProxyValue.value = value
}

function validateDefaultProxy(value) {
  defaultProxyError.value = value?.length > 0 ? validatePort(value) : null
}

function validateTorProxy(value) {
  torProxyError.value = value?.length > 0 ? validatePort(value) : null
}

function validatePort(input) {
  let error = null

  // Regular expression for validating IP and Port
  const ipPortRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]):([0-9]{1,5})$/

  if (!ipPortRegex.test(input)) {
    error = "Invalid IP:Port format."
  } else {
    const [, , , , , port] = input.match(ipPortRegex)
    const portNumber = parseInt(port, 10)

    if (portNumber < 1 || portNumber > 65535) {
      error = "Port must be between 1 and 65535."
    }
  }

  return error
}

const doneEnabled = computed(() => {
  return hasChanges.value && !defaultProxyError.value && !torProxyError.value
})

const hasChanges = computed(() => {
  return defaultProxyActive.value !== startState.value.defaultProxyActive ||
    defaultProxyValue.value !== startState.value.defaultProxyValue ||
    torProxyActive.value !== startState.value.torProxyActive ||
    torProxyValue.value !== startState.value.torProxyValue
})

const infoTextClass = computed(() => {
  const c = ['restart-info', '-body-6']

  if(hasChanges.value || hasSaved.value) {
    c.push('-has-changes')
  }

  return c.join(' ')
})

function clickBack() {
  const confirmMessage = 'You have unsaved changes. Are you sure you want to go back?'
  if(!hasChanges.value || confirm(confirmMessage)) {
    router.back()
  }
}

function clickDone() {
  saveCurrentState()

  console.log('clickDone', startState.value)

  hasSaved.value = true
}

function saveCurrentState() {
  startState.value = {
    defaultProxyActive: defaultProxyActive.value,
    defaultProxyValue: defaultProxyValue.value,
    defaultProxyError: defaultProxyError.value,
    torProxyActive: torProxyActive.value,
    torProxyValue: torProxyValue.value,
    torProxyError: torProxyError.value
  }
}

onBeforeMount(() => {
  saveCurrentState()
})
</script>

<template>
  <KitScreen class="proxy-settings">
    <template v-if="stateId == 'proxy-settings' && state">
      <KitTopBar
        v-if="state.onboarding"
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/connection-settings?t=slide-right"
        @leftClick="clickBack"
      />
      <KitTopBar
        v-if="!state.onboarding"
        buttonLeftLabel="Back"
        buttonLeftIcon="caretLeft"
        buttonLeftTo="/screen/settings?t=slide-right"
        @leftClick="clickBack"
        :title="state.title"
        buttonRightLabel="Done"
        :buttonRightDisabled="!doneEnabled"
        @rightClick="clickDone"
      />
      <KitHeader
        v-if="state.onboarding"
        :title="state.title"
      />
      <div class="list">
        <div :class="infoTextClass">
          <div v-html="Icons.infoCircle" />
          <p>For changes on this screen to take effect, press "Done" and restart the application.</p>
        </div>

        <div class="info">
          <h4 class="-title-3">Default proxy</h4>
          <p>Run peer connections through a proxy (SOCKS5) for improved privacy. Supports connections via IPv4, IPv6, and Tor.</p>
        </div>
        <KitItemFrame @select="defaultProxyActive = !defaultProxyActive">
          <KitItemLeft
            title="Enable default proxy"
          />
          <KitItemRight
            :toggle="true"
            :active="defaultProxyActive"
          />
        </KitItemFrame>
        <ScreensProxySettingsInput
          label="IP and port"
          placeholder="127.0.0.1:8080"
          :value="defaultProxyValue"
          :disabled="!defaultProxyActive"
          :error="defaultProxyError"
          layout="vertical"
          @validate="validateDefaultProxy"
          @change="onChangeDefaultProxy"
        />

        <div class="info">
          <h4 class="-title-3">Tor proxy</h4>
          <p>Enable to run Tor connections through a dedicated Tor proxy.</p>
        </div>
        <KitItemFrame @select="torProxyActive = !torProxyActive">
          <KitItemLeft
            title="Enable Tor proxy"
          />
          <KitItemRight
            :toggle="true"
            :active="torProxyActive"
          />
        </KitItemFrame>
        <ScreensProxySettingsInput
          label="IP and port"
          placeholder="127.0.0.1:8080"
          :value="torProxyValue"
          :disabled="!torProxyActive"
          :error="torProxyError"
          layout="vertical"
          @validate="validateTorProxy"
          @change="onChangeTorProxy"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.proxy-settings {
  .list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;

    .restart-info {
      text-wrap: balance;
      display: flex;
      gap: 10px;
      align-items: center;
      background-color: var(--neutral-1);
      border-radius: 15px;
      padding: 10px 15px;

      div {
        line-height: 0;
      }

      ::v-deep(svg) {
        width: 18px;
        height: 18px;
        line-height: 0;
      }

      &.-has-changes {
        color: var(--blue);
        background-color: rgba(var(--blue-rgb), 0.1);

        p {
          color: var(--blue);
        }
      }
    }

    > .info {
      padding-bottom: 10px;
      margin-top: 35px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}

</style>
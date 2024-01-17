<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const listeningActive = ref(false)
const upnpActive = ref(false)
const natpmpActive = ref(false)
const rpcActive = ref(false)
</script>

<template>
  <KitScreen class="initial-download-options">
    <template v-if="stateId == 'initial-download-options' && state">
      <KitTopBar
        :buttonRightLabel="state.back.label"
        :buttonRightTo="state.back.to"
      />
      <KitHeader
        :title="state.title"
      />
      <div class="list">
        <KitItemFrame @select="listeningActive = !listeningActive">
          <KitItemLeft
            title="Enable listening"
            description="Allows incoming connections."
          />
          <KitItemRight
            :toggle="true"
            :active="listeningActive"
          />
        </KitItemFrame>
        <KitItemFrame @select="upnpActive = !upnpActive">
          <KitItemLeft
            title="Map port using UPnP"
          />
          <KitItemRight
            :toggle="true"
            :active="upnpActive"
          />
        </KitItemFrame>
        <KitItemFrame @select="natpmpActive = !natpmpActive">
          <KitItemLeft
            title="Map port using NAT-PMP"
          />
          <KitItemRight
            :toggle="true"
            :active="natpmpActive"
          />
        </KitItemFrame>
        <KitItemFrame @select="rpcActive = !rpcActive">
          <KitItemLeft
            title="Enable RPC server"
          />
          <KitItemRight
            :toggle="true"
            :active="rpcActive"
          />
        </KitItemFrame>
        <KitItemFrame to="/screen/proxy-settings?t=slide-left">
          <KitItemLeft
            title="Proxy settings"
          />
          <KitItemRight
            icon="caretRight"
          />
        </KitItemFrame>
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.initial-download-options {
  .list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

</style>
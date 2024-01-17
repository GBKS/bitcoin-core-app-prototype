<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const snapshotStatus = ref('init')
const progress = ref(0)
let timer = null

function createSnapshot() {
  snapshotStatus.value = 'busy'

  progress.value = 0
  startTimer()
}

function startTimer() {
  clearTimeout(timer)
  setTimeout(updateProgress, 500)
}

function updateProgress() {
  progress.value = Math.min(1, progress.value + Math.random()*0.1)

  if(progress.value == 1) {
    completeSnapshot()
  } else {
    startTimer()
  }
}

function completeSnapshot() {
  snapshotStatus.value = 'done'
}

const progressStyle = computed(() => {
  return {
    opacity: snapshotStatus.value == 'busy' ? 1 : 0
  }
})
</script>

<template>
  <KitScreen class="snapshot">
    <template v-if="stateId == 'snapshot' && state">
      <KitTopBar
        :buttonLeftLabel="state.back.label"
        buttonLeftIcon="caretLeft"
        :buttonLeftTo="state.back.to"
      />
      <Transition mode="out-in" name="fade">
        <div class="content" v-if="snapshotStatus == 'init'">
          <KitHeader
            icon="file"
            iconColor="blue"
            title="Snapshot"
            :description="state.description"
          />
          <KitProgressBar
            class="progress"
            :progress="progress"
            :style="progressStyle"
          />
          <div class="bottom">
            <KitButton
              label="Choose snapshot file"
              @click="createSnapshot"
            />
          </div>
        </div>
        <div class="content" v-else-if="snapshotStatus == 'busy'">
          <KitHeader
            icon="file"
            iconColor="blue"
            title="Loading snapshot"
          />
          <KitProgressBar
            class="progress"
            :progress="progress"
            :style="progressStyle"
          />
        </div>
        <div class="content" v-else-if="snapshotStatus == 'done'">
          <KitHeader
            icon="check"
            title="Snapshot loaded"
            description="It contains data up to January 12, 2024.<br/><br/>You will be able to use your node and wallet much more quickly. The accuracy of the data in the snapshot will be verified in the background."
          />
          <KitProgressBar
            class="progress"
            :progress="progress"
            :style="progressStyle"
          />
          <div class="bottom">
            <KitButton
              label="Done"
              to="/screen/settings?t=slide-right"
            />
          </div>
        </div>
      </Transition>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.snapshot {
  .progress {
    margin-top: 15px;
    max-width: 200px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }
}

</style>
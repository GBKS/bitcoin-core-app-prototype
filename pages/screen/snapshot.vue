<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const snapshotStatus = ref(null)
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
        :title="state.title"
      />
      <KitHeader
        icon="file"
        :description="state.description"
      />
      <KitProgressBar
        class="progress"
        :progress="progress"
        :style="progressStyle"
      />
      <div class="bottom">
        <KitButton
          v-if="!snapshotStatus"
          label="Create snapshot"
          @click="createSnapshot"
        />
        <KitButton
          v-if="snapshotStatus == 'busy'"
          label="Creating snapshot"
          :disabled="true"
          @click="createSnapshot"
        />
        <KitButton
          v-if="snapshotStatus == 'done'"
          label="Download snapshot"
          @click="createSnapshot"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.snapshot {
  .progress {
    margin-top: 15px;
  }
}

</style>
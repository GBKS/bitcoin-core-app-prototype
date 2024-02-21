<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])
</script>

<template>
  <KitScreen class="cover">
    <template v-if="stateId == 'first-use/cover' && state">
      <KitTopBar
        buttonRightIcon="infoCircle"
        buttonRightTo="/screen/about?t=slide-left"
      />
      <div class="illustration" />
      <KitHeader
        :title="state.title"
        :description="state.description"
        :big="true"
      />
      <p class="note -body-6">{{ state.note }}</p>

      <div class="bottom">
        <div v-if="state.testnet" class="testnet">
          <UiNetworkIndicator color="green" label="Test network" />
          <p>The application is using the test network. Only use for experimentation and development.</p>
          <KitButton
            label="Change network"
            theme="free"
            size="small"
          />
        </div>
        <KitButton
          :label="state.button.label"
          :to="state.button.to"
        />
      </div>
    </template>
  </KitScreen>
</template>

<style scoped lang="scss">

.cover {
  .illustration {
    width: 100px;
    aspect-ratio: 1;
    background-image: url('/assets/images/bitcoin.png');
    background-size: cover;
  }

  .note {
    margin-top: 25px;
  }

  .bottom {
    padding-top: 75px;
  }

  .testnet {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background-color: var(--neutral-2);
    border-radius: var(--corner-radius);
    padding: 15px;
    width: 100%;

    p {
      text-align: center;
    }

    @include container(medium-up) {
      max-width: 300px;
    }
  }
}

</style>
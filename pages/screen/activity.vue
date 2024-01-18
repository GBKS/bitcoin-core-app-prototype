<script setup>
import transition from '@/helpers/transition.js'

definePageMeta(transition)

const props = defineProps([
  'stateId',
  'state'
])

const balanceContent = computed(() => {
  return props.state.title
})
</script>

<template>
  <KitScreen
    v-if="stateId == 'activity'"
    class="activity"
  >
    <div class="top-mobile">
      <NavMobileBlockClock
      />
      <NavDesktopWallet
        :activeId="activeId"
      />
      <KitButton
        icon="gear"
        size="big"
        theme="free"
        to="/screen/settings?t=slide-left"
      />
    </div>
    <div class="top-desktop">
      <KitHeader
        class="-align-left"
        title="Activity"
      />
    </div>
    <div class="list -dividers">
      <template v-if="state.empty">
        <p>No transactions yet</p>
      </template>
      <template v-if="!state.empty">
        <KitTransactionItem
          title="Luigi's pizza"
          description="4 min ago"
          amount="-21,736 sats"
          amountTwo="-12.75 €"
          to="/screen/transaction?t=slide-left"
        />
        <KitTransactionItem
          title="Yum Yum Foods"
          description="Yesterday"
          amount="-128,021 sats"
          amountTwo="-75.00 €"
          to="/screen/transaction?t=slide-left"
        />
        <KitTransactionItem
          title="Priya Lee"
          description="April 12, 2023"
          amount="+1,706,950 sats"
          amountTwo="1.000,00 €"
          to="/screen/transaction?t=slide-left"
        />
        <KitTransactionItem
          title="Winston Park"
          description="April 6, 2023"
          amount="+73,398 sats"
          amountTwo="-43.00 €"
          to="/screen/transaction?t=slide-left"
        />
      </template>
    </div>
  </KitScreen>
</template>


<style scoped lang="scss">

.activity {
  .top-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;

    @include media-query(medium-up) {
      display: none;
    }
  }

  .top-desktop {
    @include media-query(small) {
      display: none;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;

    > * {
      width: 100%;
      max-width: 600px;
    }

    &.-dividers {
      > * + * {
        border-top: 1px solid var(--neutral-2);
      }
    }
  }
}

</style>
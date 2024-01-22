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

const transactions = [
  {
    title: "Luigi's pizza",
    description: "4 min ago",
    amount: 21736,
  },
  {
    title: "Yum Yum Foods",
    description: "Yesterday",
    amount: -128021
  },
  {
    title: "Priya Lee",
    description: "April 12, 2023",
    amount: 1706950
  },
  {
    title: "Winston Park",
    description: "April 6, 2023",
    amount: 73398
  },
  {
    title: "19M12s...35Xj8Q",
    description: "April 1, 2023",
    amount: -363000
  }
]
</script>

<template>
  <KitScreen
    v-if="stateId == 'activity'"
    class="activity"
  >
    <div class="top-mobile">
      <NavMobileBlockClock
      />
      <NavMobileWallet
        :activeId="activeId"
      />
      <KitButton
        icon="gear"
        size="big"
        theme="free"
        to="/screen/settings?t=slide-left"
      />
    </div>
    <ScreensActivityButtons
      icon="roundedArrowUp"
      label="Send"
      to="/screen/send?t=slide-up"
    />
    <div class="list-header">
      <h5 class="-title-5">Activity</h5>
      <KitButton
        icon="search"
        theme="free"
      />
    </div>
    <div class="list -dividers">
      <template v-if="state.empty">
        <p>No transactions yet</p>
      </template>
      <template v-if="!state.empty">
        <KitTransactionItem
          v-for="(item, index) in transactions"
          :key="index"
          :title="item.title"
          :description="item.description"
          :amount="item.amount"
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
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    max-width: 600px;
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
      border-top: 1px solid var(--neutral-2);
      width: 100%;
      max-width: 600px;
    }

    &.-dividers {
      > * + * {
        border-top: 1px solid var(--neutral-2);
      }
    }
  }

  @include container(small) {
    
  }

  @include container(medium-up) {
    .top-mobile {
      display: none;
    }

    .list-header {
      padding-top: 30px;

      h5 {
        font-size: 21px;
      }
    }
  }
}

</style>
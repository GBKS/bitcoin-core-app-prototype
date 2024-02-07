<script setup>
import { useStateStore } from "@/stores/state.js"
import Toolbox from '@/helpers/toolbox.js'
import Icons from '@/helpers/icons.js'

const stateStore = useStateStore()

const props = defineProps([
  'title',
  'description',
  'address',
  'amount',
  'active',
  'to'
])

const classObject = computed(() => {
  const c = ['transaction-item']

  if(props.active) c.push('-active')

  if(parseFloat(props.amount) > 0) {
    c.push('-positive')
  } 

  return c.join(' ')
})

const icon = computed(() => {
  return props.amount < 0 ? Icons.roundedArrowDown : Icons.roundedArrowUp
})

const formattedTitle = computed(() => {
  let result = props.title

  if(!result) {
    result = Toolbox.trim(props.address, 16)
  }

  return result
})
</script>

<template>
  <NuxtLink :class="classObject" :to="to">
    <div class="content -mobile">
      <div
        class="icon"
        v-html="icon"
      />
      <div class="left">
        <p class="-body-6">{{ formattedTitle }}</p>
        <p class="-body-6" v-if="description">{{ description }}</p>
      </div>
      <div class="right">
        <KitBalance
          class="-body-6" 
          :amount="props.amount"
          :unit="stateStore.balanceDisplayMode"
        />
      </div>
    </div>
    <div class="content -not-mobile">
      <div
        class="icon"
        v-html="icon"
      />
      <div class="left">
        <p class="-body-6">{{ formattedTitle }}</p>
      </div>
      <div class="right" v-if="props.amount">
        <p class="-body-6" v-if="description">{{ description }}</p>
        <KitBalance
          class="-body-6" 
          :amount="props.amount"
          :unit="stateStore.balanceDisplayMode"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">

.transaction-item {
  text-align: left;
  cursor: pointer;
  text-decoration: none;

  .content {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
  }

  .icon {
    color: var(--orange);
    padding-right: 3px;

    ::v-deep(svg) {
      width: 10px;
      height: 10px;
    }
  }

  .left,
  .right {
    display: flex;
    gap: 0;

    p {
      margin: 0;
      color: var(--neutral-9);
      transition: all 100ms $ease;

      &:nth-child(2) {
        color: var(--neutral-7);
      }
    }
  }

  .left {
    flex-grow: 1;

    p:first-child {
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
  }

  .right {
    align-items: flex-end;
  }

  &.-positive {
    .icon {
      color: var(--green);
    }
  }

  @include media-query(small) {
    .-not-mobile {
      display: none;
    }

    .content .left {
      flex-direction: column;
    }
  }

  @include media-query(medium-up) {
    .-mobile {
      display: none;
    }

    .content .right {
      gap: 20px;

      p {
        white-space: nowrap;
      }
    }
  }

  &:hover {
    .left {
      p {
        &:first-child {
          color: var(--primary);
        }
      }
    }
  }
}

</style>
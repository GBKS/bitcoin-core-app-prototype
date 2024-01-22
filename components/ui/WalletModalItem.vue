<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'info',
  'activeId',
  'id'
])

const isActive = computed(() => {
  return props.activeId == props.id
})

const classObject = computed(() => {
  const c = [
    'wallet-modal-item'
  ]

  if(isActive.value) {
    c.push('-active')
  }

  return c.join(' ')
})

const icon = computed(() => {
  return Icons[props.info.icon]
})
</script>

<template>
  <button
    :class="classObject"
  >
    <div
      class="icon"
      v-html="icon"
    />
    <div class="copy">
      <h4 class="-title-7 -title-5-mobile">{{ info.name }}</h4>
      <KitBalance
        class="-body-7 -body-5-mobile"
        :amount="info.balance"
      />
    </div>
  </button>
</template>

<style scoped lang="scss">

.wallet-modal-item {
  display: flex;
  align-items: center;
  gap: 5px;
  text-align: left;
  cursor: pointer;
  padding: 5px 5px 5px 0px;
  border-radius: var(--corner-radius);
  color: var(--neutral-7);

  .icon {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;

    ::v-deep(svg) {
      width: 20px;
      height: 20px;
    }
  }

  .copy {
    flex-grow: 1;

    h4 {
      color: var(--neutral-7);
    }

    p {
      text-align: left;
      
      ::v-deep(.-nz) {
        color: var(--neutral-7);
      }
    }
  }

  &:hover {
    background-color: var(--neutral-1);

    .copy {
      h4 {
        color: var(--neutral-9);
      }

      p {
        ::v-deep(.-nz) {
          color: var(--neutral-9);
        }
      }
    }
  }

  &.-active {
    // background-color: var(--neutral-2);
    color: var(--primary);

    .copy {
      h4,
      p,
      p ::v-deep(.-nz) {
        color: var(--primary);
      }
    }
  }
}

</style>
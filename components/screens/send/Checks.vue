<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'visualPreview',
  'replaceByFeeEnabled',
  'feeInAmountEnabled',
  'sendMaxEnabled',
  'showTopBorder'
])

const classObject = computed(() => ({
  'send-checks': true,
  '-top-border': props.showTopBorder
}))
</script>

<template>
  <div :class="classObject">
    <NuxtLink v-if="visualPreview" to="/screen/coin-flow?t=slide-up"><span v-html="Icons.mixed" />Visual preview</NuxtLink>
    <p v-if="feeInAmountEnabled"><span v-html="Icons.check" />Fees are included in the amount</p>
    <p v-if="replaceByFeeEnabled"><span v-html="Icons.check" />Speed up enabled</p>
    <p v-if="sendMaxEnabled && !feeInAmountEnabled"><span v-html="Icons.check" />Fees are included in the amount</p>
  </div>
</template>

<style scoped lang="scss">

.send-checks {
  display: flex;
  flex-direction: column;
  gap: 3px;

  a,
  p {
    span {
      margin-right: 8px;

      ::v-deep(svg) {
        width: 14px;
        height: 14px;
        vertical-align: middle;
        transform: translateY(-1px);
      }
    }
  }

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;

    span {
      ::v-deep(svg) {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        transform: translateY(-1px);
      }
    }

    &:hover {
      text-decoration: underline;
    }
  }

  &.-top-border {
    padding: 15px 0;
    border-top: 1px solid var(--neutral-3);
  }
}

</style>

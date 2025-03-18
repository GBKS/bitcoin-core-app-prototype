<script setup>
import Icons from '@/helpers/icons.js'

const props = defineProps([
  'replaceByFeeEnabled',
  'feeInAmountEnabled',
  'sendMaxEnabled'
])
</script>

<template>
  <div class="send-checks">
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
  padding: 15px 0;
  border-top: 1px solid var(--neutral-3);

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
}

</style>

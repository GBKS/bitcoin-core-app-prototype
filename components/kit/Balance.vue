<script setup>
const props = defineProps([
  'amount',
  'unit', // bitcoin, satoshi, $, €...
  'notation', // standard, compact
  'locale',
  'hidden',
  'size' // small, medium, big
])

const content = computed(() => {
  let result = ''

  const notation = props.notation || 'standard'
  const locale = props.locale || 'en'

  let amountBit = props.amount;
  let minimumFractionDigits = 0
  let unit = props.unit || 'bitcoin'

  switch(unit) {
    case 'bitcoin':
      unit = '₿'
      minimumFractionDigits = 8
      break
    case 'satoshi':
      unit = 'sats'
      break
    default:
      minimumFractionDigits = 2
      unit = props.unit
      break
  }

  const format = Intl.NumberFormat(locale, {
    style: 'currency',
    notation: notation,
    compactDisplay: "long",
    currency: 'BTC',
    minimumFractionDigits: minimumFractionDigits
  })
  const parts = format.formatToParts(amountBit);

  result = parts.reduce((acc, part) => {
    if(locale == 'en') {
      // console.log('a', acc, part)
    }
    
    if(part.type == 'currency') {
      return '<span class="' + part.type + '">' + acc + unit + '</span>'
    } else {
      var partBits = part.value.toString().split('')
      var partBitHTML = ''
      var partClasses, bit
      var nonZeroFound = false
      for(let i=0; i<partBits.length; i++) {
        bit = partBits[i]
        if(!nonZeroFound && bit != 0) nonZeroFound = true
        
        partClasses = ['char', '-v'+bit]
        if(!nonZeroFound) partClasses.push('-nz')
        
        partBitHTML += '<span class="' + partClasses.join(' ') + '">' + bit + '</span>'
      } 
      
      return '<span class="' + part.type + '">' + acc + partBitHTML + '</span>'
    }
  }, '')

  return result
})

const classObject = computed(() => {
  const c = [
    'balance',
    '-'+(props.unit || 'bitcoin'),
    '-'+(props.size || 'small')
  ]

  return c.join(' ')
})
</script>

<template>
  <p
    :class="classObject"
    v-html="content"
  />
</template>

<style scoped lang="scss">

.balance {
  text-align: center;
  color: var(--neutral-9);
  letter-spacing: -0.025em;

  &.-bitcoin {
    ::v-deep(.fraction) {
      .char {
        &.-nz {
          // color: var(--neutral-7);
        }
      }

      > .char {
        &:nth-child(4),
        &:nth-child(7) { padding-left: 0.3em; }
      }
    }
  }

  &.-small {
    // color: var(--neutral-7);
  }

  &.-medium,
  &.-big {
    // color: var(--neutral-9);
  }
}

</style>
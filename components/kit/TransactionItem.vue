<script setup>
const props = defineProps([
  'title',
  'description',
  'amount',
  'amountTwo',
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

const formattedAmount = computed(() => {
  let result = ''

  const notation = 'standard'
  const locale = 'de'

  let amountBit = props.amount;
  let minimumFractionDigits = 0
  let unit = 'bitcoin'

  switch(unit) {
    case 'bitcoin':
      unit = '₿'
      minimumFractionDigits = 8
      break
    case 'satoshi':
      unit = 'sats'
      break
  }

  const format = Intl.NumberFormat(locale, {
    style: 'currency',
    notation: notation,
    compactDisplay: "long",
    currency: 'BTC',
    minimumFractionDigits: minimumFractionDigits
  })

  const parts = format.formatToParts(amountBit / 100000000)

  result = parts.reduce((acc, part) => {
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

      const bits = [
        '<span class="',
        part.type,
        '">',
        acc,
        partBitHTML,
        '</span>'
      ]

      return bits.join('')
    }
  }, '')

  return result
})

const amountTwo = computed(() => {
  const bitcoinEuroPrice = 37000
  const amount = Math.round(props.amount / 100000000 * bitcoinEuroPrice)

  const format = Intl.NumberFormat('de', {
    style: 'currency',
    notation: 'standard',
    compactDisplay: "long",
    currency: 'EUR',
    minimumFractionDigits: 2
  })

  return format.format(amount)
})
</script>

<template>
  <NuxtLink :class="classObject" :to="to">
    <div class="left">
      <p class="-body-5">{{ title }}</p>
      <p class="-body-6" v-if="description">{{ description }}</p>
    </div>
    <div class="right" v-if="formattedAmount || amountTwo">
      <p 
        class="-body-5" 
        v-if="formattedAmount" 
        v-html="formattedAmount"
      />
      <p 
        class="-body-6" 
        v-if="amountTwo" 
        v-html="amountTwo"
      />
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">

.transaction-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  text-align: left;
  cursor: pointer;
  text-decoration: none;

  .left,
  .right {
    display: flex;
    flex-direction: column;
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
  }

  .right {
    align-items: flex-end;

    p {
      &:first-child {
        ::v-deep(.fraction) {
          > .char {
            &:nth-child(4),
            &:nth-child(7) { padding-left: 0.3em; }
          }
        }
      }
    }
  }

  &.-positive {
    .right {
      p {
        &:first-child {
          color: var(--green);

          ::v-deep(.fraction) {
            .char {
              &.-nz {
                opacity: 0.75;
              }
            }
          }
        }
      }
    }
  }

  &:not(.-positive) {
    .right {
      p {
        &:first-child {
          color: var(--neutral-9);

          ::v-deep(.fraction) {
            .char {
              &.-nz {
                color: var(--neutral-7);
              }
            }
          }
        }
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
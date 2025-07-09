<script setup>
const props = defineProps([
  'amount', // In satoshis
  'unit', // bitcoin, satoshi, hide, dollar, euro...
  'notation', // standard, compact
  'locale',
  'hidden',
  'size', // small, medium, big
  'theme', // default, light dark
  'tag', // p
  'monospace'
])

const content = computed(() => {
  let result = ''

  if(props.unit == 'hide') {
    result = '*****'
  } else {
    const notation = props.notation || 'standard'
    const locale = props.locale || 'de'

    let amountBit = props.amount;
    let minimumFractionDigits = 0
    let unit = props.unit || 'bitcoin'
    let theme = props.theme || 'default'

    switch(unit) {
      case 'bitcoin':
        unit = '₿'
        minimumFractionDigits = 8
        amountBit /= 100000000
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

    let prefix = ''
    if(theme == 'default' && amountBit > 0) {
      prefix = '+'
    } 

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
    }, prefix)
  }

  return result
})

const componentType = computed(() => {
  return props.tag || 'p'
})

const classObject = computed(() => {
  const c = [
    'balance',
    '-'+(props.unit || 'bitcoin'),
    '-'+(props.size || 'small'),
    '-'+(props.theme || 'default'),
    '-'+(props.amount < 0 ? 'negative' : 'positive')
  ]

  if(props.monospace) { c.push('-monospace') }

  return c.join(' ')
})
</script>

<template>
  <component
    :class="classObject"
    :is="componentType"
    v-html="content"
  />
</template>

<style scoped lang="scss">

.balance {
  text-align: center;
  color: var(--neutral-9);
  letter-spacing: -0.025em;

  &.-monospace {
    font-variant-numeric: tabular-nums slashed-zero;
  }

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

  // Gray/green coloration
  &.-default {
    &.-bitcoin {
      ::v-deep(.fraction) {
        > .char {
          &:nth-child(4),
          &:nth-child(7) { padding-left: 0.3em; }
        }
      }

      &.-positive {
        color: var(--green);

        ::v-deep(.fraction) {
          .char {
            &.-nz {
              opacity: 0.75;
            }
          }
        }
      }

      &.-negative {
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

  &.-neutral {
    &.-bitcoin {
      ::v-deep(.fraction) {
        > .char {
          &:nth-child(4),
          &:nth-child(7) { padding-left: 0.3em; }
        }
      }

      &.-positive {
        color: var(--neutral-9);

        ::v-deep(.fraction) {
          .char {
            &.-nz {
              color: var(--neutral-7);
            }
          }
        }
      }

      &.-negative {
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

  &.-light {
    
  }

  &.-dark {
    
  }
}

</style>
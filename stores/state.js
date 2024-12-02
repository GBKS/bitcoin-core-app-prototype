import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useStateStore = defineStore('state', {
  state: () => {
    return {
      showNav: useLocalStorage('showNav', true),
      theme: useLocalStorage('theme', null),
      showWalletModal: ref(false),
      showMenu: ref(false),
      showTooltip: ref(false),
      activeWalletId: ref('savings'),
      balanceDisplayMode: ref('bitcoin'), // bitcoin, satoshi, hide
      wallets: {
        savings: {
          name: 'Savings',
          balance: 0,
          icon: 'keyFilled',
          type: 'single-key',
          lastOpen: 2
        },
        family: {
          name: 'Family',
          balance: 0,
          icon: 'twoKeys',
          type: 'multi-key',
          lastOpen: 1
        },
        cold: {
          name: 'Cold storage',
          balance: 0,
          icon: 'eye',
          type: 'view-only',
          lastOpen: 0
        }
      },
      transactions: ref(null),
      paymentRequest: ref(null),
      send: ref(null),
    }
  },

  hydrate(state, initialState) {
    state.showNav = useLocalStorage('showNav', true)
    state.theme = useLocalStorage('theme', null)
  }
})
import { defineStore } from 'pinia'
import { useStorage, useLocalStorage } from '@vueuse/core'

export const useStateStore = defineStore({
  id: 'state',

  state: () => {
    return {
      showWalletModal: ref(false),
      activeWalletId: ref('savings'),
      balanceDisplayMode: ref('bitcoin'), // bitcoin, satoshi, hide
      wallets: {
        savings: {
          name: 'Savings',
          balance: 0,
          icon: 'keyFilled',
          type: 'single-key'
        },
        family: {
          name: 'Family',
          balance: 0,
          icon: 'twoKeys',
          type: 'multi-key'
        },
        cold: {
          name: 'Cold storage',
          balance: 0,
          icon: 'eye',
          type: 'view-only'
        }
      },
      transactions: ref(null)
    }
  },

  getters: {
    
  },

  actions: {
    toggleWalletModal() {
      this.showWalletModal = !this.showWalletModal
    }
  }
})
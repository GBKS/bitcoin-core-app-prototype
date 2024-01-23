import { defineStore } from 'pinia'
import { useStorage, useLocalStorage } from '@vueuse/core'

export const useStateStore = defineStore({
  id: 'state',

  state: () => {
    return {
      showWalletModal: ref(false),
      activeWalletId: ref('savings'),
      wallets: {
        savings: {
          name: 'Savings',
          balance: 0.00167930,
          icon: 'keyFilled',
          type: 'single-key'
        },
        family: {
          name: 'Family',
          balance: 0.03421765,
          icon: 'twoKeys',
          type: 'multi-key'
        },
        cold: {
          name: 'Cold storage',
          balance: 0.17000000,
          icon: 'eye',
          type: 'view-only'
        }
      }
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
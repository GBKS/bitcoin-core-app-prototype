import { useStateStore } from "@/stores/state.js"
import Toolbox from '@/helpers/toolbox.js'

export default {

  counter: 0,
  
  init() {
    const state = useStateStore()

    this.wallets(state)
  },

  addWallet() {
    const state = useStateStore()

    const walletId = 'wallet-' + Math.random().toString(36).substr(2, 9)
    const bases = [{
        type: 'single-key',
        icon: 'keyFilled'
      }, {
        type: 'multi-key',
        icon: 'twoKeys'
      }, {
        type: 'view-only',
        icon: 'eye'
      }
    ]

    const transactions = this.transactions()
    let balance = 0
    for(let k=0; k<transactions.length; k++) {
      balance += transactions[k].amount
    }
  
    const data = bases[Math.floor(Math.random() * bases.length)]
    data.name = 'Wallet ' + Object.keys(state.wallets).length
    data.balance = balance
    data.lastOpen = Date.now()

    state.transactions[walletId] = transactions
    state.wallets[walletId] = data

    return walletId
  },

  wallets(state) {
    const result = {}

    let transactions, balance, k
    for(let walletId in state.wallets) {
      transactions = this.transactions()

      balance = 0
      for(k=0; k<transactions.length; k++) {
        balance += transactions[k].amount
      }

      result[walletId] = transactions

      state.wallets[walletId].balance = balance
    }

    state.transactions = result
  },

  transactions() {
    const result = []
    let timestamp = new Date().getTime()

    let count = Math.random() * 10
    let balance = 0, transaction
    while(count-- > 0) {
      timestamp -= Math.random()*1000000000
      transaction = this.transaction(timestamp)

      balance += transaction.amount

      result.push(transaction)
    }

    while(balance < 0) {
      timestamp -= Math.random()*1000000000
      transaction = this.transaction(timestamp, true)

      balance += transaction.amount

      result.push(transaction)
    }

    return result
  },

  transaction(timestamp, forcePositive) {
    this.counter++

    if(!timestamp) {
      timestamp = new Date().getTime() - Math.random()*1000000000
    }

    const id = 'transaction_' + this.counter
    const title = this.title()
    const address = this.address()
    const description = Toolbox.formatRelativeDate(Math.round(timestamp/1000)+'', true)    
    let amount = Math.round(Math.random()*1000000 - 500000)

    if(amount < 0 && forcePositive) amount *= -1

    return { id, title, description, amount, address }
  },

  title() {
    const titles = [
      "Bought groceries at the local market.",
      "Enjoyed a cup of specialty coffee at the neighborhood café.",
      "Submitted the monthly rent payment for my apartment.",
      "Dined out with friends at a nearby restaurant.",
      "Filled up the gas tank for the week's commute.",
      "Treated myself to a new book and some chocolates online.",
      "Renewed the gym membership for another month of fitness.",
      "Settled the monthly utility bills, including electricity and water.",
      "Purchased a transit pass for stress-free commuting.",
      "Invested in home improvement supplies for a DIY project.",
      "Ordered takeout from a favorite local restaurant.",
      "Stocked up on household essentials at the supermarket.",
      "Indulged in a spa day with skincare and bath products.",
      "Bought a new set of kitchen utensils for cooking experiments.",
      "Paid for a scenic boat tour during the weekend getaway.",
      "Contributed to a group gift for a friend's birthday.",
      "Acquired tickets for a live performance or event.",
      "Donated to a charity or community organization.",
      "Purchased a stylish accessory during a shopping spree.",
      "Invested in a language learning app subscription.",
      "Bought fresh flowers to brighten up the living space.",
      "Enjoyed a meal delivery service for a cozy night in.",
      "Bought a monthly subscription to a streaming service.",
      "Invested in a new hobby with art supplies or equipment.",
      "Contributed to a crowdfunding campaign for a cause.",
      "Treated a friend to coffee or a meal during a catch-up.",
      "Bought a new pair of running shoes for fitness activities.",
      "Acquired tickets to a movie night or live performance.",
      "Purchased a video game or app for entertainment.",
      "Donated to a local animal shelter or pet rescue.",
      "Bought tickets for a sports event or match.",
      "Invested in a cooking class or workshop.",
      "Purchased outdoor gear for a camping trip.",
      "Bought a magazine subscription for leisure reading.",
      "Ordered a meal kit for convenient home cooking.",
      "Contributed to a colleague's farewell gift.",
      "Invested in a new piece of furniture or home decor.",
      "Bought a potted plant to liven up the home.",
      "Purchased a ticket to a virtual event or webinar.",
      "Donated to a disaster relief fund.",
      "Bought a new smartphone accessory or gadget.",
      "Invested in a creative writing or art class.",
      "Contributed to a friend's crowdfunding project.",
      "Bought tickets to a virtual comedy show.",
      "Purchased a subscription to a digital magazine.",
      "Invested in a photography class or workshop.",
      "Contributed to a community garden project.",
      "Bought a gadget or tool for DIY projects.",
      "Invested in a language exchange or tutoring service.",
      "Contributed to a scholarship fund for students.",
      "Purchased a pass for a virtual yoga or fitness class.",
      "Bought tickets to a virtual reality experience.",
      "Invested in a sustainable living workshop.",
      "Donated to a local arts and culture organization.",
      "Bought a pass for a meditation or mindfulness app.",
      "Invested in a personal finance or investing course.",
      "Contributed to a neighborhood beautification project.",
      "Bought a pass for a virtual travel experience.",
      "Donated to a science education initiative.",
      "Purchased a ticket to a virtual history tour.",
      "Invested in a course on digital privacy.",
      "Bought a subscription to a plant-based meal delivery service.",
      "Contributed to a fund for renewable energy initiatives.",
      "Bought tickets to a virtual wildlife conservation event.",
      "Invested in a DIY home sustainability workshop.",
      "Donated to a mental health awareness campaign.",
      "Purchased a ticket to a virtual art and music festival.",
      "Invested in a course on ethical fashion.",
      "Bought a subscription to a virtual fitness challenge.",
      "Contributed to a fund for affordable housing.",
      "Bought tickets to a virtual science and technology expo.",
      "Invested in a gardening and composting workshop.",
      "Donated to a water conservation and clean water project.",
      "Purchased a ticket to a virtual innovation summit.",
      "Invested in a personal development and self-care course.",
      "Bought a subscription to a virtual sustainability forum.",
      "Contributed to a fund for mental health research.",
      "Bought tickets to a virtual fitness and wellness retreat.",
      "Invested in a course on mindful living.",
      "Donated to a community-based environmental conservation project.",
      "Purchased a ticket to a virtual social justice conference.",
      "Invested in a DIY eco-friendly home cleaning workshop.",
      "Bought a subscription to a virtual nutrition and health program.",
      "Contributed to a fund for educational technology in schools.",
      "Bought tickets to a virtual climate change and sustainability summit.",
      "Invested in a course on sustainable and ethical travel.",
      "Donated to a community garden initiative for food security.",
      "Purchased a ticket to a virtual mindfulness and meditation retreat.",
      "Invested in a DIY workshop on reducing plastic waste at home.",
      "Bought a subscription to a virtual wildlife conservation series.",
      "Contributed to a fund for renewable energy and green infrastructure.",
      "Donated to a mental health and wellness program for underserved communities."
    ]

    let result = null
    if(Math.random() > 0.2) {
      result = titles[Math.floor(Math.random()*titles.length)]
    }
    return result
  },

  address(type) {
    let addressLength, dummyAddress
    switch(type) {
      default:
        addressLength = 42
        dummyAddress = 'bc1q'

    }

    // const addressLength = Math.floor(Math.random() * 10) + 26;
  
    // Valid characters in a Bitcoin address
    const validCharacters = '123456789abcdefghijkmnopqrstuvwxyz';
    
    // Generate a random Bitcoin address
    for (let i = dummyAddress.length; i < addressLength; i++) {
      dummyAddress += validCharacters[Math.floor(Math.random() * validCharacters.length)];
    }
    
    return dummyAddress;
  }


}
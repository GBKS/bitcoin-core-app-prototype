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
      transaction = this.transaction(timestamp, 'send')

      balance += transaction.amount

      result.push(transaction)
    }

    while(balance < 0) {
      timestamp -= Math.random()*1000000000
      transaction = this.transaction(timestamp, 'receive')

      balance += transaction.amount

      result.push(transaction)
    }

    return result
  },

  transaction(timestamp, type) {
    this.counter++

    if(!timestamp) {
      timestamp = new Date().getTime() - Math.random()*1000000000
    }
  
    let amount = Math.round(Math.random()*1000000)

    if(!type) type = Math.random() > 0.5 ? 'receive' : 'send'
    if(type == 'send') {
      amount *= -1
    }

    let title
    if(Math.random() > 0.2) {
      title = amount > 0 ? this.receiveTitle() : this.sendTitle()
    }

    const id = 'transaction_' + this.counter
    const address = this.address()
    const description = Toolbox.formatRelativeDate(Math.round(timestamp/1000)+'', true)  

    return { id, title, description, amount, address, timestamp }
  },

  amount() {
    return Math.round(Math.random()*1000000) + 100
  },

  receiveTitle() {
    const titles= [
      "🚀 To The Moon Club Membership",
      "Diamond Hands Society Dues",
      "Hodl Training Academy Tuition",
      "Meme Lord Certification Fee",
      "Professional Doge Whisperer Payment",
      "Emergency Pizza Fund Deposit",
      "Ramen-to-Riches Challenge Winnings",
      "Coffee Addiction Support Group Fee",
      "Late Night Taco Investment Returns",
      "International Snack Exchange Payment",
      "Professional Cat Video Consultant",
      "Meme Portfolio Management Fee",
      "Digital Plant Sitting Services",
      "Professional Procrastination Coach",
      "Remote High-Five Delivery Service",
      "Virtual Pet Rock Adoption Fee",
      "Professional Metaverse Architect",
      "Digital Dance Move Creator",
      "Metaverse Real Estate Flip",
      "Professional Cloud Shape Analysis",
      "Time Travel Insurance Premium",
      "Digital Fortune Cookie Writing",
      "Professional Daydream Consultant",
      "Quantum Poetry Generator License",
      "Professional Unicorn Trainer Fee",
      "Blockchain Meme Archaeologist",
      "Weather Forecast Rights",
      "Digital Silence Collection Royalties",
      "Professional Bubble Wrap Popper",
      "Chief Vibes Officer Salary"
    ]

    let result = null
    if(Math.random() > 0.2) {
      result = titles[Math.floor(Math.random()*titles.length)]
    }
    return result
  },

  sendTitle() {
    const titles = [
      "Buying groceries at the local market.",
      "Enjoying a cup of specialty coffee at the neighborhood café.",
      "Submitting the monthly rent payment for my apartment.",
      "Dining out with friends at a nearby restaurant.",
      "Filling up the gas tank for the week's commute.",
      "Treating myself to a new book and some chocolates online.",
      "Renewing the gym membership for another month of fitness.",
      "Settling the monthly utility bills, including electricity and water.",
      "Purchasing a transit pass for stress-free commuting.",
      "Investing in home improvement supplies for a DIY project.",
      "Ordering takeout from a favorite local restaurant.",
      "Stocking up on household essentials at the supermarket.",
      "Indulging in a spa day with skincare and bath products.",
      "Buying a new set of kitchen utensils for cooking experiments.",
      "Paying for a scenic boat tour during the weekend getaway.",
      "Contributing to a group gift for a friend's birthday.",
      "Acquiring tickets for a live performance or event.",
      "Donating to a charity or community organization.",
      "Purchasing a stylish accessory during a shopping spree.",
      "Investing in a language learning app subscription.",
      "Buying fresh flowers to brighten up the living space.",
      "Enjoying a meal delivery service for a cozy night in.",
      "Buying a monthly subscription to a streaming service.",
      "Investing in a new hobby with art supplies or equipment.",
      "Contributing to a crowdfunding campaign for a cause.",
      "Treated a friend to coffee or a meal during a catch-up.",
      "Buying a new pair of running shoes for fitness activities.",
      "Acquired tickets to a movie night or live performance.",
      "Purchasing a video game or app for entertainment.",
      "Donating to a local animal shelter or pet rescue.",
      "Buying tickets for a sports event or match.",
      "Investing in a cooking class or workshop.",
      "Purchasing outdoor gear for a camping trip.",
      "Buying a magazine subscription for leisure reading.",
      "Ordered a meal kit for convenient home cooking.",
      "Contributing to a colleague's farewell gift.",
      "Investing in a new piece of furniture or home decor.",
      "Buying a potted plant to liven up the home.",
      "Purchasing a ticket to a virtual event or webinar.",
      "Donating to a disaster relief fund.",
      "Buying a new smartphone accessory or gadget.",
      "Investing in a creative writing or art class.",
      "Contributing to a friend's crowdfunding project.",
      "Buying tickets to a virtual comedy show.",
      "Purchasing a subscription to a digital magazine.",
      "Investing in a photography class or workshop.",
      "Contributing to a community garden project.",
      "Buying a gadget or tool for DIY projects.",
      "Investing in a language exchange or tutoring service.",
      "Contributing to a scholarship fund for students.",
      "Purchasing a pass for a virtual yoga or fitness class.",
      "Buying tickets to a virtual reality experience.",
      "Investing in a sustainable living workshop.",
      "Donating to a local arts and culture organization.",
      "Buying a pass for a meditation or mindfulness app.",
      "Investing in a personal finance or investing course.",
      "Contributing to a neighborhood beautification project.",
      "Buying a pass for a virtual travel experience.",
      "Donating to a science education initiative.",
      "Purchasing a ticket to a virtual history tour.",
      "Investing in a course on digital privacy.",
      "Buying a subscription to a plant-based meal delivery service.",
      "Contributing to a fund for renewable energy initiatives.",
      "Buying tickets to a virtual wildlife conservation event.",
      "Investing in a DIY home sustainability workshop.",
      "Donating to a mental health awareness campaign.",
      "Purchasing a ticket to a virtual art and music festival.",
      "Investing in a course on ethical fashion.",
      "Buying a subscription to a virtual fitness challenge.",
      "Contributing to a fund for affordable housing.",
      "Buying tickets to a virtual science and technology expo.",
      "Investing in a gardening and composting workshop.",
      "Donating to a water conservation and clean water project.",
      "Purchasing a ticket to a virtual innovation summit.",
      "Investing in a personal development and self-care course.",
      "Buying a subscription to a virtual sustainability forum.",
      "Contributing to a fund for mental health research.",
      "Buying tickets to a virtual fitness and wellness retreat.",
      "Investing in a course on mindful living.",
      "Donating to a community-based environmental conservation project.",
      "Purchasing a ticket to a virtual social justice conference.",
      "Investing in a DIY eco-friendly home cleaning workshop.",
      "Buying a subscription to a virtual nutrition and health program.",
      "Contributing to a fund for educational technology in schools.",
      "Buying tickets to a virtual climate change and sustainability summit.",
      "Investing in a course on sustainable and ethical travel.",
      "Donating to a community garden initiative for food security.",
      "Purchasing a ticket to a virtual mindfulness and meditation retreat.",
      "Investing in a DIY workshop on reducing plastic waste at home.",
      "Buying a subscription to a virtual wildlife conservation series.",
      "Contributing to a fund for renewable energy and green infrastructure.",
      "Donating to a mental health and wellness program for underserved communities."
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
const Module = require('./beer.js')

class Beer {
  constructor() {
    this.module = null
    this.hello = null
    this.add = null
  }
  init() {
    return new Promise((resolve, reject) => {
      this.module = Module().then(mod => {
        this.hello = mod.cwrap('beer_hello', 'string', ['string'])
        this.add = mod.cwrap('beer_add', 'number', ['number'])
        resolve()
      })
    })
  }
}
const beer = new Beer()
beer.init().then(() => {
  console.log(`${beer.hello('PayFit')}`)
  console.log(`${beer.add(1, 2)}`)
})

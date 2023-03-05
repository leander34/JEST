import { Messaging } from '../services/messaging'
import { Order } from '../classes/order'
import { Persistency } from '../respository/persistency'
import { Product } from '../classes/product'
import { ShoppingCart } from '../classes/shopping-cart'
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from '../classes/discount'
import { EnterpriseCustomer, IndividualCustomer } from '../classes/customer'

const fiftyPercentDiscount = new FiftyPercentDiscount()
const tenPercentDiscount = new TenPercentDiscount()
const noDiscount = new NoDiscount()
const shoppingCart = new ShoppingCart(fiftyPercentDiscount)
const messaging = new Messaging()
const persistency = new Persistency()
const individualCustomer = new IndividualCustomer(
  'leander',
  'silveira',
  '00144234425'
)
const enterpriseCustomer = new EnterpriseCustomer('eivem', '001442344255363')
const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer
)
shoppingCart.addItem(new Product('Caderno1', 49.9))
shoppingCart.addItem(new Product('Caderno2', 49.9))
shoppingCart.addItem(new Product('Caderno3', 49.9))
shoppingCart.addItem(new Product('Caderno4', 49.9))
console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.totalWithDiscount())
console.log(order.orderStatus)
order.checkout()
console.log(order.orderStatus)

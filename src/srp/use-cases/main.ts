import { Messaging } from '../services/messaging'
import { Order } from '../entitites/order'
import { Persistency } from '../respository/persistency'
import { Product } from '../entitites/product'
import { ShoppingCart } from '../entitites/shopping-cart'

const shoppingCart = new ShoppingCart()
const messaging = new Messaging()
const persistency = new Persistency()
const order = new Order(shoppingCart, messaging, persistency)
shoppingCart.addItem(new Product('Caderno1', 49.9))
shoppingCart.addItem(new Product('Caderno2', 49.9))
shoppingCart.addItem(new Product('Caderno3', 49.9))
shoppingCart.addItem(new Product('Caderno4', 49.9))
console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(order.orderStatus)
order.checkout()
console.log(order.orderStatus)

type CartItem = {
  name: string
  price: number
}

type OrderStatus = 'open' | 'closed'

export class ShoppingCart {
  private readonly _items: CartItem[] = []
  private _orderStatus: OrderStatus = 'open'

  addItem(item: CartItem): void {
    this._items.push(item)
  }

  removeItem(index: number): void {
    this._items.splice(index, 1)
  }

  get items(): Readonly<CartItem>[] {
    return this._items
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus
  }

  total(): number {
    return Number(
      this._items.reduce((total, item) => total + item.price, 0).toFixed(2)
    )
  }

  checkout(): void {
    if (this.isEmpyt()) {
      console.log('Seu carrinho está vazio')
      return
    }

    this._orderStatus = 'closed'
    this.sendMessage('Seu pedido foi recebido')
    this.saveOrder()
    this.clear()
  }

  isEmpyt(): boolean {
    return this._items.length === 0
  }

  sendMessage(message: string): void {
    console.log('Messagem enviado: ', message)
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso...')
  }

  clear(): void {
    console.log('Carrinho de compras foi limpo')
    this._items.length = 0
  }
}

const shoppingCart = new ShoppingCart()
shoppingCart.addItem({ name: 'Caderno', price: 49.9 })
shoppingCart.addItem({ name: 'Caderno2', price: 49.9 })
shoppingCart.addItem({ name: 'Caderno3', price: 49.9 })
shoppingCart.addItem({ name: 'Caderno4', price: 49.9 })
console.log(shoppingCart.items)
console.log(shoppingCart.total())
console.log(shoppingCart.orderStatus)
shoppingCart.checkout()
console.log(shoppingCart.orderStatus)

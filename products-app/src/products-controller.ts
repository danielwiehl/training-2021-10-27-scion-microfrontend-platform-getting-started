import {Beans} from '@scion/toolkit/bean-manager';
import {MessageClient, MicrofrontendPlatform} from '@scion/microfrontend-platform';

class ProductsController {

  private products: Product[] = [
    {id: 1, name: 'Product 1'},
    {id: 2, name: 'Product 2'},
    {id: 3, name: 'Product 3'},
    {id: 4, name: 'Product 4'},
    {id: 5, name: 'Product 5'},
  ];

  constructor() {
  }

  public async init(): Promise<void> {
    await MicrofrontendPlatform.connectToHost({symbolicName: 'products-app'});
    this.products.forEach(product => this.renderProduct(product));
  }

  private renderProduct(product: Product): void {
    const ul = document.querySelector('ul.products');
    const li = document.createElement('li');
    const text = document.createTextNode(product.name);
    const button = document.createElement('button');

    button.innerText = 'Add to cart';
    button.addEventListener('click', () => this.onAddToCart(product));

    ul.appendChild(li);
    li.appendChild(text);
    li.appendChild(button);
  }

  private onAddToCart(product: Product): void {
    Beans.get(MessageClient).publish('shopping-cart/add-product', product);
  }
}

new ProductsController().init();

interface Product {
  id: number;
  name: string;
}

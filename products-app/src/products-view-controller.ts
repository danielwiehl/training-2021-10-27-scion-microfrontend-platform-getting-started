import {WorkbenchClient, WorkbenchRouter} from '@scion/workbench-client';
import {Beans} from '@scion/toolkit/bean-manager';

class ProductsViewController {

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
    await WorkbenchClient.connect({symbolicName: 'products-app'});
    this.products.forEach(product => this.renderProduct(product));
  }

  private renderProduct(product: Product): void {
    const ul = document.querySelector('ul.products');
    const li = document.createElement('li');
    const text = document.createTextNode(product.name);
    const button = document.createElement('button');

    button.innerText = 'Open';
    button.addEventListener('click', () => this.onOpen(product));

    ul.appendChild(li);
    li.appendChild(text);
    li.appendChild(button);
  }

  private onOpen(product: Product): void {
    Beans.get(WorkbenchRouter).navigate({entity: 'product'}, {params: new Map().set('productName', product.name), activateIfPresent: true, target: 'blank'});
  }
}

new ProductsViewController().init();

interface Product {
  id: number;
  name: string;
}

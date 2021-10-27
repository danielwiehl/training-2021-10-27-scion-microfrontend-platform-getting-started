import {Beans} from '@scion/toolkit/bean-manager';
import {IntentClient, MessageClient, MicrofrontendPlatform, OutletRouter} from '@scion/microfrontend-platform';
import {Product, ShoppingCartService} from './shopping-cart-service';

class ActivatorController {

  constructor() {
  }

  public async init(): Promise<void> {
    await MicrofrontendPlatform.connectToHost({symbolicName: 'shopping-cart-app'});

    Beans.get(IntentClient).observe$({type: 'microfrontend', qualifier: {entity: 'shopping-cart'}}).subscribe(intentMessage => {
      const path = intentMessage.capability.properties['pfad'];
      Beans.get(OutletRouter).navigate(path, {outlet: intentMessage.intent.params.get('outletName')});
    });

    Beans.get(MessageClient).observe$<Product>('shopping-cart/add-product').subscribe(message => {
      ShoppingCartService.addProduct(message.body);
    });
  }
}

new ActivatorController().init();

import {ApplicationConfig, IntentClient, MicrofrontendPlatform, OutletRouter} from '@scion/microfrontend-platform';
import {Beans} from '@scion/toolkit/bean-manager';

class HostController {

  private shoppingCartPanelOpen = false;

  private platformConfig: ApplicationConfig[] = [
    {symbolicName: 'host-app', manifestUrl: '/manifest.json'},
    {symbolicName: 'products-app', manifestUrl: 'http://localhost:4201/manifest.json'},
    {symbolicName: 'shopping-cart-app', manifestUrl: 'http://localhost:4202/manifest.json'},
    {symbolicName: 'devtools', manifestUrl: 'https://scion-microfrontend-platform-devtools.vercel.app/assets/manifest.json', intentionCheckDisabled: true, scopeCheckDisabled: true},
  ];

  constructor() {
    document.querySelector('button.shopping-cart').addEventListener('click', () => this.onToggleShoppingCart());
  }

  public async init(): Promise<void> {
    await MicrofrontendPlatform.startHost(this.platformConfig, {symbolicName: 'host-app'});

    // Display Devtools in DevTools outlet
    Beans.get(OutletRouter).navigate('https://scion-microfrontend-platform-devtools.vercel.app', {outlet: 'DEV-TOOLS'});

    // Display products microfrontend
    Beans.get(OutletRouter).navigate('http://localhost:4201/products.html');

  }

  private onToggleShoppingCart(): void {
    if (this.shoppingCartPanelOpen) {
      Beans.get(OutletRouter).navigate(null, {outlet: 'SHOPPING-CART'});
    }
    else {
      Beans.get(IntentClient).publish({type: 'microfrontend', qualifier: {entity: 'shopping-cart'}, params: new Map().set('outletName', 'SHOPPING-CART')});
    }
    this.shoppingCartPanelOpen = !this.shoppingCartPanelOpen;
  }
}

new HostController().init();

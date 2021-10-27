import {WorkbenchClient, WorkbenchView} from '@scion/workbench-client';
import {Beans} from '@scion/toolkit/bean-manager';
import {map} from 'rxjs/operators';

class ProductViewController {

  public async init(): Promise<void> {
    await WorkbenchClient.connect({symbolicName: 'products-app'});

    const view = Beans.get(WorkbenchView);
    const productName$ = view.params$.pipe(map(params => params.get('productName')));
    view.setHeading(productName$)
  }
}

new ProductViewController().init();

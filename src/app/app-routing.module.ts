import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


function loadScript(url, id) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    if (id) {
      script.id = id;
    }
    script.type="text/javascript";
    script.async = false;
    document.head.appendChild(script);
    script.onload = function () {
      typeof resolve == 'function' && resolve();
    };

    script.onerror = function () {
      typeof reject == 'function' && reject();
    };

  });
}

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: 'app/customers/customers.module#CustomersModule'
  },
  {
    path: 'orders',
    // loadChildren: 'app/orders/orders.module#OrdersModule'
    loadChildren: async () => {
      // '/inventory-lib/bundles/inventory-lib.umd.js#OrdersModule'
      const script = await loadScript('/inventory-lib/bundles/inventory-lib.umd.js', 'inventory-lib');
      const module = window['inventory-lib']['OrdersModule'];
      return module;
    }
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

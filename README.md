As an enterprise app, there are multiple functional teams which are responsible to deliver the functional module. 
Let's say it's an Order tracking app which has multiple modules 
  1) CoreApp : responsible to create a layout, navigation, header, footer
  2) Customers : responsible to Customers related functionality
  3) Orders: responsible to Orders related functionality
  
Different teams are responsible to deliver these module; after first deployment there is requirement changed for Orders module and it needs to redeploy to production.

In current Angular world I have to rebuild all three modules, retest it and deploy it in production which not acceptable solution because there is no change in CoreApp and Customers module 
    
 
This example code is a workspace module built with Angular CLI having 
    1)OrderTrackingApp(CoreAPP), 
    2)customers module, 
    3)inventory-lib ( it's library package, pre built in dist folder) 
    
**To run this code** 
   checkout this repo,
   execute **http-server -p 5050** in dist folder which will start serving /inventory-lib/bundles/inventory-lib.umd.js on http://localhost:5050
   I already created a proxy.config.json which will tell CLI to proxy all /inventory-lib request to port 5050 (on different server )   
    execute **ng serve --port 4003 --proxy-config proxy.config.json** to start angular app on port 4003
    
The routing I am thinking to use is as below ( see orders where child route is loaded from external JS)

<pre>
    <code>
    const routes: Routes = [
      {
        path: 'customers',
        loadChildren: 'app/customers/customers.module#CustomersModule'
      },
      {
        path: 'orders',
        loadChildren: '/inventory-lib/bundles/inventory-lib.umd.js#OrdersModule'
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      }
    ];
    <code>
</pre>
    
    
**Build requirements**
* Angular CLI >6.0.0    https://cli.angular.io/
* http-server https://www.npmjs.com/package/http-server


**Note:** Right now this code build will fail because webpack will not find orders route path;

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as core from '@angular/core';
import * as router from '@angular/router';
import * as common from '@angular/common';

setTimeout(()=>{

  const ng  = window['ng'] ||{};
  ng.core =  ng.core || core ;
  ng.router =  ng.router || router ;
  ng.common =  ng.common || common ;
  window['ng'] = ng;

},0);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

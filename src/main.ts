import 'hammerjs';
import { enableProdMode, ComponentRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { DynamicNg2Loader } from './app/dynamicloading';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(function (ng2ModulerRef) {

  const ng2Loader = new DynamicNg2Loader(ng2ModulerRef.injector);
  const container = document.getElementById('angular-container');

  container.className += 'js-flex-container';
  document.getElementById('non-angular').hidden = false;

  const loadedComponentReferences = [];
  const count = 0;

  document.getElementById('add-component').onclick = function () {
    const parent = document.createElement('app-parent');
    container.appendChild(parent);

    const compRef = ng2Loader.loadComponentAtDom(DashboardComponent, parent, (instance) => {
      // instance.value = count;
      console.log(instance);
    });
    loadedComponentReferences.push(compRef);
  };
  document.getElementById('remove-components').onclick = function () {
    loadedComponentReferences.forEach(compRef => {
      compRef.destroy();
    });
  };
})
.catch(err => console.log(err));

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,                  // This module ordering should be followed.
    ServerModule,
    ModuleMapLoaderModule       // Needed to have lazy-loaded routes work.
  ],
  bootstrap: [AppComponent]     // Since the bootstrapped component is not inherited from your
                                //  imported AppModule, it needs to be repeated here.

})
export class AppServerModule {}
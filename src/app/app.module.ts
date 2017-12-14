import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';    // New HttpClient module in Angular 5.
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-universal-app'}),    
                                                              // BrowserModule is a superset of the Common module, 
                                                              //  used only in the root module. Configured here
                                                              //  for server-side rendering.
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),          // Register state slices and reducer actions here.
    EffectsModule.forRoot([AuthEffects]),   // Register effects actions module here.
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],  
                                                          // Requires Chrome extension Redux DevTools 
                                                          //  in Chrome web store. Must come after StoreModule!
                                                          // Use only in development mode!
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

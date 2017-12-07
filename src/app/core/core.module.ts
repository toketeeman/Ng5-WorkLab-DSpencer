import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
//import { ShoppingListService } from '../shopping-list/shopping-list.service';
//import { RecipeService } from '../recipes/recipe.service';
//import { DataStorageService } from '../shared/data-storage.service';
//import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [            // Exports for USAGE, not for routing!
    AppRoutingModule,   // Make available to be used in the top-level routing tree. (Usage)
    HeaderComponent     // Make HeaderComponent accessible from ABOVE at the app level because
                        //  the AppComponent template uses it! (Usage)
  ],
  providers: [
    //ShoppingListService, 
    //RecipeService, 
    //DataStorageService, 
    //AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },     // In interception order!
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule {}

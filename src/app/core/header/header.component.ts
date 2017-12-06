import { Component, OnInit } from '@angular/core';
//import { HttpEvent, HttpEventType } from '@angular/common/http';  // Can be used for listening for http events
                                                                    // using Angular 5. See below.
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
//import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              //private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(                             // Fire the service's http request here.
        (response) => {                       // Use (response: HttpEvent) to capture http events.
          console.log(response);
        }
      );
  }

  onFetchData() {
    //this.dataStorageService.getRecipes();   // Old service way.

    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    //this.authService.logout();
    this.store.dispatch(new AuthActions.Logout())
  }

  // Made unnecessary by using NgRx storage.

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();   // Wrap authService call HERE for use in template.
  //                                                // Don't use the service explicitly in the template! 
  //                                                // Wrapping will allow AOT compile!.
  // }
}



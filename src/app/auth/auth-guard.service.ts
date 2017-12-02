import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    // canActivate can return boolean,  
                                                                              //  promise or observable.
    return this.store.select('auth')
      .take(1)                                      // Grab only one state slice per route activation - defensive!
      .map((authState: fromAuth.State) => {         // Here the select's mapped
      return authState.authenticated;               //  observable is returned.
    });
  }
}

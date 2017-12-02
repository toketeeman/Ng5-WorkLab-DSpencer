import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';               // Do precise import of rxjs operation to satisy AoT.
import 'rxjs/add/operator/switchMap';         // Do precise import of rxjs operation to satisy AoT.
import 'rxjs/add/operator/mergeMap';          // Do precise import of rxjs operation to satisy AoT.
import 'rxjs/add/operator/do';                // Do precise import of rxjs operation to satisy AoT.
import { fromPromise } from 'rxjs/observable/fromPromise';  // Converts a promise into an observable.
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';


// Dispatched action effects do not ever change the app state!

// Do not end an effect chain with a subscribe! An observable must be returned by the chain
//  for final processing by NgRx/effects. Use the do() operator for processing without subscribing.

@Injectable()
export class AuthEffects {

  // Effects to be done for a try-to-sign-up (registration).

  @Effect()               // Note: This decorator expects zero or more reducer action observables
                          //  to be produced (in the last step) by the entire chain below. These 
                          //  observables will then be automatically dispatched as reducer actions.
                          //  The intervening steps do only effects processing as needed that does NOT
                          //  change the NgRx store.
                          //  If no reducer actions are to be generated (i.e. last step is omitted),
                          //  use the decorator syntax: @Effect({dispatch: false}) .
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)   // React to any dispatches of this action type.
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        // The returned firebase promise is converted here into an observable.
    })
    .switchMap(() => {    // Just wait for the user account to be created, then get associated token as observable.
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {    // Generate multiple observables and merge them into single observable.
      return [                        // Rtn array of action reducer observables to be dispatched by NgRx/effects.
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

    // Note: in last step above, you could use just 'map' if you wish to return 
    //  only a single action reducer observable.


    // Effects to be done for a try-to-sign-in (login) action.

    @Effect()
    authSignin = this.actions$
      .ofType(AuthActions.TRY_SIGNIN)     // React to any dispatches of this action type.
      .map((action: AuthActions.TrySignin) => {
        return action.payload;
      })
      .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
          // The returned firebase promise is converted here into an observable.
      })
      .switchMap(() => {    // Just wait for the user account to be created, then get associated token as observable.
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
      .mergeMap((token: string) => {    // Generate multiple observables and merge them into single observable.
        this.router.navigate(['/']);    // Go back to home page upon login.
        return [                        // Return reducer action observables to be dispatched by NgRx/effects.
          {  
            type: AuthActions.SIGNIN      // An associated reducer action to be done after the effect action.
          },
          {
            type: AuthActions.SET_TOKEN,  // An associated reducer action to be done after the effect action.
            payload: token
          }
        ];
      });


    // Effects to be done for a logout action. Note: this effect action is automatically executed along with
    // a corresponding separate reducer action of the SAME type. Go see the reducer action.

    @Effect({dispatch: false})
    authLogout = this.actions$
      .ofType(AuthActions.LOGOUT)
      .do(() => {
        this.router.navigate(['/']);
      });

  constructor(private actions$: Actions,     // actions$ is an Observable (indicated here by using '$' suffix)
              private router: Router) {}     //  that emits dispatched actions.
}

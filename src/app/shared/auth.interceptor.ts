import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';      // Do precise import of rxjs operation to satisy AoT.
import 'rxjs/add/operator/take';           // Do precise import of rxjs operation to satisy AoT.

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';


// Note: This has to be provided as a service in the app module using the special key HTTP_INTERCEPTORS.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    // The original httprequest is immutable, thus cannot be edited. So clone and then edit the clone.

    // const copiedReq = req.clone({headers: req.headers.append('', '')});   // A headers modification example.

    return this.store.select('auth')
      .take(1)  // The select sets up on-going subscription that fires the switchMap on ANY store change, creating
                //  spurious http requests! So accept this observable value only once (i.e. auto-unsubscribe)!
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        return next.handle(copiedReq);  // Allows http request to go through with alterations, if any.
                                        // Note that next.handle() itself produces an observable. So use
                                        //  switchMap to prevent wrapping the returned obervable value in 
                                        //  yet another Observable. I.E., we are "switching observables" here.
      })

    //return next.handle(null);   // Kills the http request.
  }
}

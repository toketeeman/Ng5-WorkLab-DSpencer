import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

// Note: This has to be provided as a service in the app module using the special key HTTP_INTERCEPTORS.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    // The original httprequest is immutable, cannot be edited. So clone and edit the clone.
    // const copiedReq = req.clone({headers: req.headers.append('', '')});   // Headers modification example.
    const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())});  //Params modification.

    return next.handle(copiedReq);      // Allows http request to go through with alterations, if any.
    //return next.handle(null);   // Kills the http request.
  }
}
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';      // Do precise import of rxjs operation to satisy AoT.

export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(                 // do operator does not consume the observable, just modifies it.
      event => {
        console.log('Logging interceptor', event);    // Grabs any event and the response here AFTER the
                                                      //  request has been sent.
      }
    )
  }
}
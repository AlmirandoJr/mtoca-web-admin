import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = 'Basic ' + btoa(this.authenticationService.username + ':'
      + this.authenticationService.password);
    if (this.authenticationService.isLoggenIn()) {

        const authReq = req.clone({
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: token
          })
      });
        return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }
}

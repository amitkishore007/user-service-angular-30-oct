import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next) {

    const token = this.authService.getToken();
    const updatedReq = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + token)
    });

    return next.handle(updatedReq);
  }
}

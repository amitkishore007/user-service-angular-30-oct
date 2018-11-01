import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const authenticated = this.authService.getAuth();
    if (authenticated) {
      this.router.navigate(['/']);
    }
    return true;
  }
}

import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router
        } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        const authenticate = this.authService.getAuth();
        if (!authenticate) {
          this.router.navigate(['/']);
        }
        return true;
  }
}

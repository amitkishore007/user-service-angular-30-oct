import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  authSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.isLoggedIn = this.authService.getAuth();
   this.authSub = this.authService.isAuth()
      .subscribe((authenticated) => {
        this.isLoggedIn = authenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}

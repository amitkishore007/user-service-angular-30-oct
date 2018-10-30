import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  signup(authData) {
    this.http
      .post<{status: string, data: any}>('http://localhost:3000/api/signup', authData)
      .subscribe(response => {
        if (response.status === 'success') {
          this.authStatusListener.next(true);
        }
      });
  }

  login(email: string, password: string) {
    const authData = {
      email: email, password: password
    };
    this.http
      .post<{status: string, data: any}>('http://localhost:3000/api/login', authData)
      .subscribe((response) => {
        if (response.status === 'success') {
          this.authStatusListener.next(true);
        }
    });
  }

  isAuth() {
    return this.authStatusListener.asObservable();
  }

logout() {
  this.authStatusListener.next(false);
}


}

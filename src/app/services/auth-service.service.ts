import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  tokenTimer: any;
  token: string;
  userId: string;
  authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  signup(authData) {
    this.http
      .post<{status: string, data: any}>('http://localhost:3000/api/users/signup', authData)
      .subscribe(response => {
        if (response.status === 'success') {
            const expiresIn = response.data.expiresIn;
            this.authTimer(expiresIn);
            const now = new Date();
            const expiration = new Date(now.getTime() + expiresIn * 1000);
            this.saveAuthData(response.data.token, expiration, response.data.userId);
            this.token = response.data.token;
            this.userId = response.data.userId;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
        }
      });
  }

  login(email: string, password: string) {
    const authData = {
      email: email, password: password
    };
    this.http
      .post<{status: string, data: any}>('http://localhost:3000/api/users/login', authData)
      .subscribe((response) => {
        if (response.status === 'success') {
          console.log(response);
            const expiresIn = response.data.expiresIn;
            this.authTimer(expiresIn);
            const now = new Date();
            const expiration = new Date(now.getTime() + expiresIn * 1000);
            this.saveAuthData(response.data.token, expiration, response.data.userId);
            this.token = response.data.token;
            this.userId = response.data.userId;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
        }
    });
  }

  isAuth() {
    return this.authStatusListener.asObservable();
  }

  logout() {
    this.removeAuthData();
    this.isAuthenticated = false;
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.authStatusListener.next(false);
  }

  saveAuthData(token: string, expiresIn: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresIn.toISOString());
    localStorage.setItem('userId', userId);
  }

  getAuthData() {
      return {
        token: localStorage.getItem('token'),
        expiresIn: localStorage.getItem('expiration'),
        userId: localStorage.getItem('userId')
      };
  }

  removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  getAuth() {
    return this.isAuthenticated;
  }

  autoAuth() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }

    const token = authData.token;
    const expiration = new Date(authData.expiresIn);
    const currDate = new Date();
    const isExpired = expiration.getTime() - currDate.getTime();

    if (isExpired > 0) {
      // token not expired and user is still logged in
      this.isAuthenticated = true;
      this.token = token;
      this.userId = authData.userId;
      this.authStatusListener.next(true);
    }
  }

  authTimer(expiresIn: number): void {
      this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

}

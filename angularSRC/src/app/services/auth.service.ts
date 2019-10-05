import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) {}

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:3000/api/account/login',
      user,
      {headers: headers})
        .pipe(map((response: any) => response));
  }

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', `Bearer ${this.authToken}`);
    headers.append('Content-Type','application/json');
    return this.http.get(
      'http://localhost:3000/api/account/profile',
      {headers: headers})
        .pipe(map((response: any) => response));
  }

  getDashboard(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', `Bearer ${this.authToken}`);
    headers.append('Content-Type','application/json');
    return this.http.get(
      'http://localhost:3000/api/dashboard',
      {headers: headers})
        .pipe(map((response: any) => response));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getAuthorizationToken(){
    return localStorage.getItem('id_token');
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    const isExpired = this.getAuthorizationToken();

    return isExpired;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

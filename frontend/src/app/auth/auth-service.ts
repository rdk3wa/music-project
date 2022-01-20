import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

export interface AuthApiResponse {
  id: number;
  username: string;
  token: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  authenticate(credentials: AuthCredentials): Observable<string> {
    return this.http
      .post<AuthApiResponse>('http://localhost:3000/api/login_check', credentials).pipe(
        map((result) => result.token),
        tap((token) => window.localStorage.setItem('token', token))
      );
  }


  getToken(): string|null {
    return window.localStorage.getItem('token');
  }

  logout(): void {
    window.localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}

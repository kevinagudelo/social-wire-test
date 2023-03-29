import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserResponse, User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.checkToken();
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/signin`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveToken(res.access_token);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }
  register(authData: User): Observable<User> {
    console.log(authData);
    return this.http
      .post<User>(`${environment.API_URL}/auth/signup`, authData)
      .pipe(
        map((res: User) => {
          console.log(res)
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }
  }
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocurred retriving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  GetAllMessageResponse,
  Message,
  MessageCreateResponse,
} from 'src/app/shared/models/message.interface';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userToken = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    }),
  };
  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<GetAllMessageResponse[]> {
    return this.http.get<GetAllMessageResponse[]>(
      `${environment.API_URL}/messages`,
      this.httpOptions
    );
  }

  getMyMessages(): Observable<GetAllMessageResponse[]> {
    return this.http.get<GetAllMessageResponse[]>(
      `${environment.API_URL}/messages/me`,
      this.httpOptions
    );
  }


  newMessage(
    messageData: Message
  ): Observable<MessageCreateResponse | unknown> {
    return this.http
      .post<MessageCreateResponse>(
        `${environment.API_URL}/messages`,
        messageData, this.httpOptions
      )
      .pipe(
        map((res: MessageCreateResponse) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
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
//   login(authData: User): Observable<UserResponse | void> {
//     return this.http
//       .post<UserResponse>(`${environment.API_URL}/messages`, authData)
//       .pipe(
//         map((res: UserResponse) => {
//           this.saveToken(res.access_token);
//           this.loggedIn.next(true);
//           return res;
//         }),
//         catchError((err) => this.handlerError(err))
//       );
//   }
//   register(authData: User): Observable<User> {
//     return this.http
//       .post<User>(`${environment.API_URL}/auth/signup`, authData)
//       .pipe(
//         map((res: User) => {
//           console.log(res)
//           return res;
//         }),
//         catchError((err) => this.handlerError(err))
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }
//   private checkToken(): void {
//     const userToken = localStorage.getItem('token');
//     const isExpired = helper.isTokenExpired(userToken);
//     if (isExpired) {
//       this.logout();
//     } else {
//       this.loggedIn.next(true);
//     }
//   }
//   private saveToken(token: string): void {
//     localStorage.setItem('token', token);
//   }
//   private handlerError(err: any): Observable<never> {
//     let errorMessage = 'An error ocurred retriving data';
//     if (err) {
//       errorMessage = `Error: code ${err.message}`;
//     }
//     window.alert(errorMessage);
//     return throwError(errorMessage);
//   }
// }

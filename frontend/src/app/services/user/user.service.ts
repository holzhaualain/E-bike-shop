import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/app/services/user/user';
import {Login} from './login';
import {backendUrls} from '../../constants/backend-urls';
import {LoggerService} from '../logger/logger.service';
import {LocalStorageService} from '../commons/local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  public differentUserHasLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
  }

  public getToken(): string {
    return (this.user ? this.user.token : '');
  }

  public getUser(): User {
    return this.user;
  }

  public initUser(): Observable<boolean> {
    const userId: string = LocalStorageService.getItem('userId');
    if (userId) {
      return this.get(userId)
        .pipe(
          tap((user: User) => {
            this.user = user;
            LoggerService.consoleLog(this.constructor.name, 'initUser', 'user loaded');
          })
          , map(() => true)
        );
    } else {
      return of<boolean>(true);
    }
  }

  public get(userID: User['_id']): Observable<User> {
    return this.http.get<User>(backendUrls.user + '?id=' + userID)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'get', 'ok'))
      );
  }

  public signIn(login: Login): Observable<User> {
    this.differentUserHasLoggedIn = false;
    return this.http.post<User>(backendUrls.signInUser, login)
      .pipe(
        tap((user: User) => {
          if (this.user) {
            if (this.user._id !== user._id) {
              this.differentUserHasLoggedIn = true;
              LoggerService.consoleLog(this.constructor.name, 'signIn', 'a different user has sign in');
            }
          }
          this.user = user;
          LocalStorageService.setItem('userId', user._id);
          LoggerService.consoleLog(this.constructor.name, 'signIn', 'ok');
        })
      );
  }

  public signOut(): Observable<string> {
    return this.http.post<string>(backendUrls.signOutUser, {'userId': this.user._id})
      .pipe(
        tap(() => {
          this.user = null;
          LocalStorageService.removeItem('userId');
          LoggerService.consoleLog(this.constructor.name, 'signOut', 'ok');
        })
      );
  }

  public create(user: User): Observable<User> {
    return this.http.post<User>(backendUrls.createUser, user)
      .pipe(
        tap((userCreated: User) => {
          this.user = userCreated;
          LoggerService.consoleLog(this.constructor.name, 'create', 'ok');
        })
      );
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(backendUrls.updateUser, user)
      .pipe(
        tap(() => {
          LoggerService.consoleLog(this.constructor.name, 'updateUser', 'ok');
        })
      );
  }

  public deleteUser(userID: User['_id']): Observable<User> {
    return this.http.post<User>(backendUrls.deleteUser, {'_id': userID})
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'deleteUser', 'ok'))
      );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(backendUrls.users
    ).pipe(
      tap(() => LoggerService.consoleLog(this.constructor.name, 'getUsers', 'ok'))
    );
  }
}

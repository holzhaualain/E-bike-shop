import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthGuardService} from './auth-guard.service';
import {LoggerService} from '../logger/logger.service';
import {User} from '../user/user';

@Injectable({
  providedIn: 'root'
})

export class AuthAdminGuardService implements CanActivate {

  constructor(
    private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) {
  }


  public canActivate(): Observable<boolean> {
    let canActivate: boolean = false;
    let wrongRole: boolean = false;
    const user: User = this.userService.getUser();
    if (user) {
      canActivate = user.type === 'admin';
      wrongRole = user.type !== 'admin';
    }

    return of<boolean>((canActivate))
      .pipe(
        tap((ok: boolean) => {
          if (wrongRole) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_YOU_NEED_ADMINISTRATOR_RIGHTS);
          } else if (!ok) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_SIGN_IN_FIRST);
          }
          if (!ok) {
            LoggerService.consoleLog(this.constructor.name, 'canActivate', 'can not');
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

}


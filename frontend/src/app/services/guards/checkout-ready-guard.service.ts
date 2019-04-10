import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthGuardService} from './auth-guard.service';
import {ShoppingBasketService} from '../shopping-basket/shopping-basket.service';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})

export class CheckoutReadyGuardService implements CanActivate {

  constructor(
    private shoppingBasketService: ShoppingBasketService
    , private userService: UserService
    , private snackBarService: SnackBarService
    , private router: Router
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const hasNoToken: boolean = this.userService.getToken() === '';
    const basketIsEmpty: boolean = this.shoppingBasketService.shoppingBasket.items.length === 0;

    return of<boolean>((!(basketIsEmpty || hasNoToken)))
      .pipe(
        tap(() => {
          if (basketIsEmpty) {
            this.router.navigate(['home']).then();
          } else if (hasNoToken) {
            this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_SIGN_IN_FIRST);
            LoggerService.consoleLog(this.constructor.name, 'canActivate', 'can not');
            this.router.navigate(['my-account']).then();
          }
        })
      );
  }

}


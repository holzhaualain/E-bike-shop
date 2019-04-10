import {Router} from '@angular/router';
import {Component, HostListener} from '@angular/core';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ConfirmYesNoService} from '../../services/commons/dialog/confirm-yes-no.service';
import {UserService} from '../../services/user/user.service';
import {CanComponentDeactivate} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate';
import {OrderService} from '../../services/order/order.service';
import {NavigationCancelService} from '../../services/navigation-cancel/navigation-cancel.service';
import {User} from '../../services/user/user';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements CanComponentDeactivate {
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL: string = 'LOGIN-SUCCESSFUL';
  private static CODE_TRANSLATION_LOGIN_SUCCESSFUL_USER_HAS_CHANGED: string = 'LOGIN-SUCCESSFUL-USER-HAS-CHANGED';
  private static CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD: string = 'WRONG-EMAIL-OR-PASSWORD';
  private static CODE_TRANSLATION_ACCOUNT_CREATED: string = 'ACCOUNT-CREATED';
  private static CODE_TRANSLATION_EMAIL_ALREADY_USE: string = 'EMAIL-ALREADY-TAKEN';
  public account: FormGroup;
  public accountNew: FormGroup;
  public hideErrorWrong: boolean = true;
  public hideErrorTaken: boolean = true;
  public showPwlo: boolean = true;
  public showPwCr: boolean = true;
  public keyPressed: boolean = false;

  constructor(
    private _formBuilder: FormBuilder
    , private userService: UserService
    , private orderService: OrderService
    , private router: Router
    , private snackBarService: SnackBarService
    , private confirmYesNoService: ConfirmYesNoService
    , private navigationCancelService: NavigationCancelService
  ) {
    this.initValidation();
  }

  private initValidation(): void {
    this.account = this._formBuilder.group({
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(60),
        Validators.minLength(5)]
      ],
      pwd: ['', Validators.minLength(3)],
    });
    this.accountNew = this._formBuilder.group({
      name: ['', Validators.minLength(3)],
      firstname: ['', Validators.minLength(3)],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(60),
        Validators.minLength(5)]
      ],
      pwd: ['', Validators.minLength(3)], //
    });
  }

  private isAnythingDirty(): boolean {
    return (this.account.touched && this.account.dirty);
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): boolean {
    return !this.isAnythingDirty(); // false shows the dialog
  }

  @HostListener('document:keypress', ['$event'])
  public onKey(event: KeyboardEvent): void {
    this.keyPressed = true;
  }

  public canDeactivate(): Observable<boolean> {
    if (this.keyPressed === true) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_LOGIN)
        .pipe(
          map((value) => (value === 'yes'))
        );
    } else {
      return of(true);
    }
  }


  public async onLogin(): Promise<any> {
    if (this.account.valid) {
      try {
        this.account.markAsPristine();
        await this.userService.signIn(this.account.getRawValue()).toPromise();
        if (this.userService.differentUserHasLoggedIn) {
          await this.orderService.resetOrder();
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL_USER_HAS_CHANGED);
          this.router.navigate(['home']).then();
        } else {
          this.keyPressed = false;
          this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_LOGIN_SUCCESSFUL);
          this.router.navigate([this.navigationCancelService.getCanceledRoute()]).then();
        }
      } catch (error) {
        if (error.status === 404) {
          this.hideErrorWrong = false;
          this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_WRONG_EMAIL_OR_PASSWORD);
        }
      }
    }
  }

  public async onCreate(): Promise<any> {
    if (this.accountNew.valid) {
      try {
        this.accountNew.markAsPristine();
        const user: User = new User(null, this.accountNew.getRawValue().firstname,
          this.accountNew.getRawValue().name, this.accountNew.getRawValue().email, this.accountNew.getRawValue().pwd, '');
        await this.userService.create(user).toPromise();
        this.orderService.clear();
        this.keyPressed = false;
        this.snackBarService.showInfo(MyAccountComponent.CODE_TRANSLATION_ACCOUNT_CREATED);
        this.router.navigate([this.navigationCancelService.getCanceledRoute()]).then();
      } catch (error) {
        if (error.status === 400) {
          this.hideErrorTaken = false;
          this.snackBarService.showError(MyAccountComponent.CODE_TRANSLATION_EMAIL_ALREADY_USE);
        }
      }
    }
  }

}

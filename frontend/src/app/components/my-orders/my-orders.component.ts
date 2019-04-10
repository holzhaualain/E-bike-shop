import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';
import {User} from '../../services/user/user';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {Observable, of} from 'rxjs';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {map} from 'rxjs/operators';
import {ConfirmYesNoService} from '../../services/commons/dialog/confirm-yes-no.service';
import {CanComponentDeactivate} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate';
import {backendUrls} from '../../constants/backend-urls';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, CanComponentDeactivate {
  private static CODE_TRANSLATION_PARTICULARS_UPDATED: string = 'USER-PARTICULARS-UPDATED';

  public p: number = 1;
  public orders: Order[];
  public userID: string = '';
  public panelOpenState: boolean = false;
  public customerPersonalData: User;
  public changed: boolean = false;
  public isCDataLoaded: boolean = false;
  public rootURL: string = backendUrls.root;


  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private snackBarService: SnackBarService,
    public confirmYesNoService: ConfirmYesNoService

  ) { }

  private static getOrderElement(orderId): HTMLCollectionOf<Element> {
    return document.getElementsByClassName(orderId);
  }
  private isAnythingDirty(): boolean {
    return this.changed;
  }

  public ngOnInit(): void {
    this.getUserOrders();
  }
  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): boolean {
    return !this.isAnythingDirty(); // false shows the dialog
  }

  public canDeactivate(): Observable<boolean> {
    if (this.isAnythingDirty()) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHANGES)
        .pipe(
          map((value) => (value === 'yes'))
        );
    } else {
      return of(true);
    }
  }

  public getUserOrders(): void {
    this.orderService.getOrdersByUser(this.userService.getUser()._id)
      .subscribe(
        result => {
          this.orders = result;
           this.getUserData(result[0].userID);
        }
      );
  }
  public getUserData (userData): void {
    this.userService.get(userData)
      .subscribe(
        result => {
          this.customerPersonalData = result;
          this.isCDataLoaded = true;
        }
      );
  }


  public onFormChange(dataId): void {
    MyOrdersComponent.getOrderElement(dataId)[0].classList.add('show');
    this.changed = true;
  }

  public onUpdateUser(userData): void {
    this.changed = false;
    MyOrdersComponent.getOrderElement(userData.value.user_id)[0].classList.remove('show');
    const updatedUser: User = new User(userData.value.user_id, userData.value.firstname,
      userData.value.name, userData.value.email, userData.value.pwd, userData.value.type);
    this.userService.updateUser(updatedUser).subscribe(() =>
      this.snackBarService.showInfo(MyOrdersComponent.CODE_TRANSLATION_PARTICULARS_UPDATED));
  }

}

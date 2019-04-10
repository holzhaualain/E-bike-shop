import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';
import {Order} from '../../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../services/user/user';
import {Sort} from '@angular/material';
import {SnackBarService} from '../../../services/commons/snack-bar/snack-bar.service';
import {ConfirmYesNoService} from '../../../services/commons/dialog/confirm-yes-no.service';
import {Observable, of} from 'rxjs';
import {CanComponentDeactivateGuard} from '../../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {map} from 'rxjs/operators';
import {CanComponentDeactivate} from '../../../services/commons/can-component-deactivate-guard/can-component-deactivate';
import {Address} from '../../../services/order/address';
import {ContactData} from '../../../services/order/contact-data';
import {DeliveryType} from '../../../services/order/delivery-type';
import {PaymentType} from '../../../services/order/payment-type';
import {LanguageService} from '../../../services/language/language.service';
import {ViewValueString} from './view-value-string';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']

})
export class OverviewComponent implements OnInit, CanComponentDeactivate {
  private static CODE_TRANSLATION_UPDATED: string = 'ORDER-UPDATE-SAVE';
  private static CODE_TRANSLATION_DELETED: string = 'ORDER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_FOR_SURE: string = 'TO-DELETE-THIS-ORDER-FOR-SURE';
  private static CODE_TRANSLATION_USER_UPDATED: string = 'USER-DATA-UPDATED';
  private static CODE_TRANSLATION_USER_DELETED: string = 'USER-IS-DELETED';
  private static CODE_TRANSLATION_DELETE_USER_FOR_SURE: string = 'TO-DELETE-THIS-USER-FOR-SURE';
  public orders: Order[];
  public sortedOrderData: Order[];
  public users: User[];
  public sortedUserData: User[];
  public p: number = 1;
  public t: number = 1;
  public panelOpenState: boolean = false;
  public changed: boolean = false;
  public orderState: ViewValueString[] = [
    new ViewValueString('APPROVED', '???'),
    new ViewValueString('COMPLETED', '???'),
    new ViewValueString('CANCELED', '???')
  ];
  public roles: ViewValueString[] = [
    new ViewValueString('admin', 'admin'),
    new ViewValueString('customer', 'customer')
  ];
  public deliveryMethod: ViewValueString[] = [
    new ViewValueString('PostPac Priority', 'PostPac Priority'),
    new ViewValueString('PostPac Economy', 'PostPac Economy')
  ];
  public paymentMethod: ViewValueString[] = [
    new ViewValueString('Paypal', 'Paypal'),
    new ViewValueString('Mastercard', 'Mastercard'),
    new ViewValueString('Visa', 'Visa')
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private translate: TranslateService,
    private langService: LanguageService,
    private snackBarService: SnackBarService,
    public confirmYesNoService: ConfirmYesNoService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function (): boolean {
      return false;
    };

    this.langService.getLanguage().subscribe(() => this.translateOrderState());
    this.translateOrderState();
  }

  private static getOrderElement(orderId): HTMLCollectionOf<Element> {
    return document.getElementsByClassName(orderId);
  }

  public static compare(a, b, isAsc): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private isAnythingDirty(): boolean {
    return this.changed;
  }

  public ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.getAllOrders();
      });
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

  public onConfirmDelete(dataId, formType): void {
    const confirmMessage: string = (formType === 'orderDelete' ? OverviewComponent.CODE_TRANSLATION_DELETE_FOR_SURE :
      OverviewComponent.CODE_TRANSLATION_DELETE_USER_FOR_SURE);
    this.translate.get(confirmMessage).subscribe(translated => {
        this.confirmYesNoService.confirm(' ' + translated).subscribe(
          result => {
            if (result === 'yes') {
              (formType === 'orderDelete' ? this.deleteOrder(dataId) : this.deleteUser(dataId));
            }
          }
        );
      }
    );
  }

  public onUpdateOrder(orderData): void {
    this.changed = false;
    OverviewComponent.getOrderElement(orderData.value._id)[0].classList.remove('show');
    const deliveryAddress: Address = new Address(orderData.value.givenname, orderData.value.surname,
      orderData.value.streetHousenumber, orderData.value.postCode, orderData.value.city);
    const contactData: ContactData = new ContactData(orderData.value.email, orderData.value.phone);
    const deliveryType: DeliveryType = new DeliveryType(orderData.value.delivery);
    const paymentType: PaymentType = new PaymentType(orderData.value.payment);
    this.orderService.updateOrder(new Order(orderData.value._id, orderData.value.userID,
      orderData.value.state, deliveryAddress, contactData, deliveryType, paymentType))
      .subscribe(() => this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_UPDATED));
  }

  public onFormChange(dataId): void {
    OverviewComponent.getOrderElement(dataId)[0].classList.add('show');
    this.changed = true;
  }

  public onUpdateUser(userData): void {
    this.changed = false;
    OverviewComponent.getOrderElement(userData.value.user_id)[0].classList.toggle('show');
    const updatedUser: User = new User(userData.value.user_id, userData.value.firstname,
      userData.value.name, userData.value.email, userData.value.pwd, userData.value.type);
    this.userService.updateUser(updatedUser).subscribe(() =>
      this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_USER_UPDATED));
  }

  private getAllOrders(): void {
    this.orderService.getOrders().subscribe(result => this.orders = result);
  }

  private deleteOrder(orderId): void {
    this.orderService.deleteOrder(orderId)
      .subscribe(() => {
          this.getAllOrders();
          this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_DELETED);
        }
      );
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  private deleteUser(userId): void {
    this.userService.deleteUser(userId)
      .subscribe(() => {
          this.getUsers();
          this.snackBarService.showInfo(OverviewComponent.CODE_TRANSLATION_USER_DELETED);
        }
      );
  }

  private translateOrderState(): void {
    for (let i: number = 0; i < this.orderState.length; i++) {
      this.translate.get(this.orderState[i].value).subscribe(translated => {
          this.orderState[i].viewValue = translated;
        }
      );
    }
  }

  public sortData(sort: Sort): number {
    const orderData: Order[] = this.orders;
    const userData: User[] = this.users;
    if (!sort.active || sort.direction === '') {
      this.sortedOrderData = orderData;
      this.sortedUserData = userData;
      return;
    }

    this.sortedOrderData = orderData.sort((a, b) => {
      const isAsc: boolean = sort.direction === 'asc';
      switch (sort.active) {
        case 'name-order':
          return OverviewComponent.compare(a.deliveryAddress.givenname, b.deliveryAddress.givenname, isAsc);
        case 'date':
          return OverviewComponent.compare(a.orderDate, b.orderDate, isAsc);
        case 'state':
          return OverviewComponent.compare(a.state, b.state, isAsc);
        default:
          return 0;
      }
    });
    this.sortedUserData = userData.sort((a, b) => {
      const isAsc: boolean = sort.direction === 'asc';
      switch (sort.active) {
        case 'user-name':
          return OverviewComponent.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }

}

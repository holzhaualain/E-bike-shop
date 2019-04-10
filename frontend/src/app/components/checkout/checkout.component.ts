import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';
import {MatStepper} from '@angular/material';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {ConfirmYesNoService} from '../../services/commons/dialog/confirm-yes-no.service';
import {CanComponentDeactivate} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {AuthGuardService} from '../../services/guards/auth-guard.service';
import {LoggerService} from '../../services/logger/logger.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements CanComponentDeactivate, AfterViewInit  {
  private static CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST: string = 'ORDER-DETAIL-TAKEN-OVER-FROM-LATEST-ORDER';

  public isLinear: boolean = true;
  public deliveryAddress: FormGroup;
  public contactData: FormGroup;
  public deliveryType: FormGroup;
  public paymentType: FormGroup;
  public itemChangePossible: boolean = false;
  public isAutoStepping: boolean = false;

  @ViewChild('stepper') private stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder
    , public shoppingBasketService: ShoppingBasketService
    , public orderService: OrderService
    , private router: Router
    , private confirmYesNoService: ConfirmYesNoService
    , private snackBarService: SnackBarService
  ) {
    this.initValidation();
  }

  private isAnythingDirty(): boolean {
    const deliveryAddressNok: boolean = (this.deliveryAddress.touched && this.deliveryAddress.dirty);
    const contactDataNok: boolean = (this.contactData.touched && this.contactData.dirty);
    const deliveryTypeNok: boolean = (this.deliveryType.touched && this.deliveryType.dirty);
    const paymentTypeNok: boolean = (this.paymentType.touched && this.paymentType.dirty);
    return (deliveryAddressNok || contactDataNok || deliveryTypeNok || paymentTypeNok);
  }

  public ngAfterViewInit(): void {
    this.orderService.getOrder()
      .subscribe(order => {
        /* micro thread / delay with promise for stepping... */
        Promise.resolve(null).then(() => {
          this.setFormGroupValues(order);
          if (order.state !== 'NEW COPY OF') {
            LoggerService.consoleLog(this.constructor.name, 'ngAfterViewInit', 'order is a copy of latest order');
            this.isAutoStepping = true;
            this.handleSteps(order);
            this.isAutoStepping = false;
          } else {
            this.snackBarService.showInfo(CheckoutComponent.CODE_TRANSLATION_ORDER_DETAIL_TAKEN_OVER_FROM_LATEST);
          }
        });
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(): boolean {
    return !this.isAnythingDirty(); // false shows the dialog
  }

  public canDeactivate(): Observable<boolean> {
    if (this.isAnythingDirty()) {
      return this.confirmYesNoService.confirm(CanComponentDeactivateGuard.CODE_TRANSLATION_DISCARD_CHECKOUT)
        .pipe(
          map((value) => (value === 'yes'))
        );
    }

    return of(true);
  }

  private initValidation(): void {
    this.deliveryAddress = this._formBuilder.group({
      givenname: ['', Validators.required],
      surname: ['', Validators.required],
      streetHousenumber: ['', Validators.required],
      postCode: ['', [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(4)]
      ],
      city: ['', Validators.required]

    });
    this.contactData = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
        Validators.maxLength(100),
        Validators.minLength(5)]
      ],
      phone: ['', [Validators.required, Validators.pattern('^(?=.*?[1-9])[+0-9()-/^\" "]+$'),
        Validators.maxLength(30),
        Validators.minLength(9)]
      ]
    });

    this.deliveryType = this._formBuilder.group({
      delivery: [null, Validators.required]
    });
    this.paymentType = this._formBuilder.group({
      payment: [null, Validators.required]
    });
  }

  private setFormGroupValues(order: Order): void {
    this.deliveryAddress.setValue(order.deliveryAddress);
    this.contactData.setValue(order.contactData);
    this.deliveryType.setValue(order.deliveryType);
    this.paymentType.setValue(order.paymentType);
  }

  private handleSteps(order: Order): void {
    let countSteps: number = 0;
    countSteps = countSteps + (order.deliveryAddress ? 1 : 0);
    countSteps = countSteps + (order.contactData ? 1 : 0);
    countSteps = countSteps + (order.deliveryType ? 1 : 0);
    countSteps = countSteps + (order.paymentType ? 1 : 0);
    for (let i: number = 0; i < countSteps; i++) {
      this.stepper.next();
    }
  }

  public onSelectionChange(): void {
    if (!this.isAutoStepping) {
      if (this.deliveryAddress.dirty) {
        this.deliveryAddress.markAsPristine();
        this.orderService.updateDeliveryAddress(this.deliveryAddress.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      if (this.contactData.dirty) {
        this.contactData.markAsPristine();
        this.orderService.updateContactData(this.contactData.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      if (this.deliveryType.dirty) {
        this.deliveryType.markAsPristine();
        this.orderService.updateDeliveryType(this.deliveryType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
      if (this.paymentType.dirty) {
        this.paymentType.markAsPristine();
        this.orderService.updatePaymentType(this.paymentType.getRawValue()).subscribe(order => this.setFormGroupValues(order));
      }
    }
  }

  public async approveOrder(): Promise<void> {
    const order: Order = await this.orderService.approve().toPromise();
    this.orderService.clear();
    this.shoppingBasketService.clear();
    await this.shoppingBasketService.initBasket().toPromise();
    this.snackBarService.showInfo(AuthGuardService.CODE_TRANSLATION_ORDER_CREATED);
    this.router.navigate(['/order-detail'], {queryParams: {id: order._id}}).then();
  }


}

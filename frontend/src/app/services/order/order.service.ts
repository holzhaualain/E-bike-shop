import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Order} from './order';
import {ShoppingBasketService} from '../shopping-basket/shopping-basket.service';
import {Address} from './address';
import {ContactData} from './contact-data';
import {DeliveryType} from './delivery-type';
import {PaymentType} from './payment-type';
import {UserService} from '../user/user.service';
import {backendUrls} from '../../constants/backend-urls';
import {LoggerService} from '../logger/logger.service';
import {User} from '../user/user';
import {LocalStorageService} from '../commons/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public static STATE_APPROVED: string = 'APPROVED';
  private order: Order = null;

  constructor(
    private http: HttpClient
    , private userService: UserService
    , private shoppingBasketService: ShoppingBasketService
  ) {
  }

  public getOrder(): Observable<Order> {
    if (this.order) {
      return of<Order>(this.order);
    }
    return this.initOrder();
  }

  private initOrder(): Observable<Order> {
    const orderId: string = LocalStorageService.getItem('orderId');
    if (!orderId) {
      LoggerService.consoleLog(this.constructor.name, 'initOrder', 'no order, will be created');
      return this.create()
        .pipe(
          tap((order) => {
            this.order = order;
            LocalStorageService.setItem('orderId', this.order._id);
          })
        );
    } else {
      LoggerService.consoleLog(this.constructor.name, 'initOrder', 'order already exists, getting order');
      return this.get(orderId)
        .pipe(
          tap((order) => {
            this.order = order;
          })
        );
    }
  }

  private create(): Observable<Order> {
    const shoppingBasketId: string = this.shoppingBasketService.shoppingBasket._id;
    return this.http.post<Order>(backendUrls.createOrder, {'shoppingBasketId': shoppingBasketId})
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'create', 'ok'))
      );
  }

  private change(backendUrl: string, order: Order): Observable<Order> {
    return this.http.put<Order>(backendUrl, order)
      .pipe(
        tap(() => {
          this.order = order;
          const urlLastPart: string = backendUrl.substr(backendUrl.lastIndexOf('/') + 1).replace(/-/g, ' ');
          LoggerService.consoleLog(this.constructor.name, 'change', 'ok (' + urlLastPart + ')');
        })
      );
  }

  public clear(): void {
    this.order = null;
    LocalStorageService.removeItem('orderId');
    LoggerService.consoleLog(this.constructor.name, 'clear', 'ok');
  }

  public get(id: string): Observable<Order> {
    return this.http.get<Order>(backendUrls.order + '?id=' + id)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'get', 'ok'))
      );
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(backendUrls.orders)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'getAll', 'ok'))
      );
  }

  public getOrdersByUser(userId: User['_id']): Observable<Order[]> {
    return this.http.get<Order[]>(backendUrls.ordersUser + '?userId=' + userId)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'get', 'ok'))
      );
  }

  public updateDeliveryAddress(deliveryAddress: Address): Observable<Order> {
    this.order.deliveryAddress = deliveryAddress;
    return this.change(backendUrls.updateOrderDeliveryAddress, this.order);
  }

  public updateContactData(contactData: ContactData): Observable<Order> {
    this.order.contactData = contactData;
    return this.change(backendUrls.updateOrderContactData, this.order);
  }

  public updateDeliveryType(deliveryType: DeliveryType): Observable<Order> {
    this.order.deliveryType = deliveryType;
    return this.change(backendUrls.updateOrderDeliveryType, this.order);
  }

  public updatePaymentType(paymentType: PaymentType): Observable<Order> {
    this.order.paymentType = paymentType;
    return this.change(backendUrls.updateOrderPaymentType, this.order);
  }

  public approve(): Observable<Order> {
    return this.http.patch<Order>(backendUrls.updateOrderState, {
      'orderId': this.order._id,
      'state': OrderService.STATE_APPROVED
    })
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'approve', 'ok'))
      );
  }

  public updateOrder(orderData: Order): Observable<Order> {
    return this.http.put<Order>(backendUrls.updateOrder, orderData)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'updateOrder', 'ok'))
      );
  }

  public deleteOrder(orderID: Order['_id']): Observable<Order> {
    return this.http.patch<Order>(backendUrls.deleteOrder, {'_id': orderID})
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'deleteOrder', 'ok'))
      );
  }

  public async resetOrder(): Promise<void> {
    await this.getOrder().toPromise();
    await this.deleteOrder(this.order._id).toPromise();
    this.clear();
    this.shoppingBasketService.clear();
    await this.shoppingBasketService.initBasket().toPromise();
    LoggerService.consoleLog(this.constructor.name, 'resetOrder', 'ok');
  }


}

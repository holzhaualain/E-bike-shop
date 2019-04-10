import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ShoppingBasket} from './shopping-basket';
import {ShoppingBasketItem} from './shopping-basket-item';
import {backendUrls} from '../../constants/backend-urls';
import {LoggerService} from '../logger/logger.service';
import {LocalStorageService} from '../commons/local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  public shoppingBasket: ShoppingBasket = null;

  constructor(
    private http: HttpClient
  ) {
  }

  public getShoppingBasket(): ShoppingBasket {
     return this.shoppingBasket;
  }

  public initBasket(): Observable<boolean> {
    const shoppingBasketId: string = LocalStorageService.getItem('shoppingBasketId');

    if (shoppingBasketId) {
      return this.get(shoppingBasketId)
        .pipe(
          tap((shoppingBasket: ShoppingBasket) => {
            this.shoppingBasket = shoppingBasket;
            LocalStorageService.setItem('shoppingBasketId', this.shoppingBasket._id);
            LoggerService.consoleLog(this.constructor.name, 'initBasket', 'shoppingBasket loaded');
          })
          , map(() => true)
        );
    } else {
      return this.create()
        .pipe(
          tap((shoppingBasket: ShoppingBasket) => {
            this.shoppingBasket = shoppingBasket;
            LocalStorageService.setItem('shoppingBasketId', this.shoppingBasket._id);
            LoggerService.consoleLog(this.constructor.name, 'initBasket', 'no shoppingBasket -> created');
          })
          , map(() => true)
        );
    }
  }

  public clear(): void {
    LocalStorageService.removeItem('shoppingBasketId');
    this.initBasket();
    LoggerService.consoleLog(this.constructor.name, 'clear', 'ok');
  }

  public get(shoppingBasketID: ShoppingBasket['_id']): Observable<ShoppingBasket> {
    return this.http.get<ShoppingBasket>(backendUrls.shoppingBasket + '?id=' + shoppingBasketID)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'get', 'ok'))
      );
  }

  public create(): Observable<ShoppingBasket> {
    return this.http.post<ShoppingBasket>(backendUrls.createShoppingBasket, null)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'create', 'ok'))
      );
  }

  public addItem(articleId: ShoppingBasketItem['articleID'],
                 articleAmount: ShoppingBasketItem['articleAmount']): Observable<ShoppingBasket> {
    const shoppingBasketItem: object = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.post<ShoppingBasket>(backendUrls.addItemShoppingBasket, shoppingBasketItem)
      .pipe(
        tap((shoppingBasket: ShoppingBasket) => {
          this.shoppingBasket = shoppingBasket;
          LoggerService.consoleLog(this.constructor.name, 'addItem', 'ok');
        })
      );
  }

  public removeItem(articleId: ShoppingBasketItem['articleID']): Observable<ShoppingBasket> {
    const shoppingBasketItem: object = new ShoppingBasketItem(this.shoppingBasket._id, articleId, 4711);
    return this.http.post<ShoppingBasket>(backendUrls.removeItemShoppingBasket, shoppingBasketItem)
      .pipe(
        tap((shoppingBasket: ShoppingBasket) => {
          this.shoppingBasket = shoppingBasket;
          LoggerService.consoleLog(this.constructor.name, 'removeItem', 'ok');
        })
      );
  }

  public changeItemAmount(articleId: ShoppingBasketItem['articleID'],
                          articleAmount: ShoppingBasketItem['articleAmount']): Observable<ShoppingBasket> {
    const shoppingBasketItem: object = new ShoppingBasketItem(this.shoppingBasket._id, articleId, articleAmount);
    return this.http.patch<ShoppingBasket>(backendUrls.changeItemAmountShoppingBasket, shoppingBasketItem)
      .pipe(
        tap((shoppingBasket: ShoppingBasket) => {
          this.shoppingBasket = shoppingBasket;
          LoggerService.consoleLog(this.constructor.name, 'changeItemAmount', 'ok');
        })
      );
  }


}

import {ShoppingBasketItem} from './shopping-basket-item';

export class ShoppingBasket {
  public _id: string = null;
  public shoppingBasketDate: Date = new Date();
  public items: ShoppingBasketItem[] = [];
  public totalSum: number = 0;


}

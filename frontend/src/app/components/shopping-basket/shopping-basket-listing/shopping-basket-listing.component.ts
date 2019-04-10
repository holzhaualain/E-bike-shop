import {Component, EventEmitter, Output, Input} from '@angular/core';
import {ShoppingBasketService} from '../../../services/shopping-basket/shopping-basket.service';
import {Order} from '../../../services/order/order';
import {LanguageService} from '../../../services/language/language.service';
import {backendUrls} from '../../../constants/backend-urls';

@Component({
  selector: 'app-shopping-basket-listing',
  templateUrl: './shopping-basket-listing.component.html',
  styleUrls: ['./shopping-basket-listing.component.scss']
})
export class ShoppingBasketListingComponent {
  @Input() public itemChangePossible: boolean;
  @Input() public isCheckout: boolean;
  @Input() public isOrderDetail: boolean;
  @Input() public isBasket: boolean;
  @Input() public order: Order;
  @Output() public itemChange: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() public deleteItem: EventEmitter<Object> = new EventEmitter<Object>();
  private langSwitch: boolean;
  public rootURL: string = backendUrls.root;

  constructor(
    public shoppingBasketService: ShoppingBasketService
    , private langService: LanguageService
  ) {

    this.langSwitch = true;
    this.langService.getLanguage().subscribe(() => {
      this.langSwitch = !this.langSwitch;
    });

  }

  public changeItemAmount_ShoppingBasket(event, articleId, articleName, articleAmount): void {
    this.itemChange.emit({articleId: articleId, articleName: articleName, articleAmount: articleAmount});
  }

  public confirmDelete(event, articleId, articleName): void {
    this.deleteItem.emit({articleId: articleId, articleName: articleName});

  }
}

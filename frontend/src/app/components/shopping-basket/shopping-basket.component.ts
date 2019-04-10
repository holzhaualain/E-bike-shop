import {Component} from '@angular/core';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {OrderService} from '../../services/order/order.service';
import {Router} from '@angular/router';
import {ShoppingBasketItem} from '../../services/shopping-basket/shopping-basket-item';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {ConfirmYesNoService} from '../../services/commons/dialog/confirm-yes-no.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss']
})

export class ShoppingBasketComponent {
  private static CODE_TRANSLATION_REMOVED: string = 'ARTICLE-REMOVED-FROM-SHOPPING-BASKET';
  private static CODE_TRANSLATION_REMOVE_FOR_SURE: string = 'TO-REMOVE-FROM-SHOPPING-BASKET-FOR-SURE';
  private static CODE_TRANSLATION_MIN_QUANTITY: string = 'MINIMUM-ORDER-QUANTITY-IS';
  private static CODE_TRANSLATION_MAX_QUANTITY: string = 'MAXIMUM-ORDER-QUANTITY-IS';
  private static CODE_TRANSLATION_AMOUNT_CHANGED: string = 'ARTICLE-AMOUNT-CHANGED';
  public itemChangePossible: boolean = true;

   constructor(
    private snackBarService: SnackBarService,
    private router: Router,
    private orderService: OrderService,
    private translate: TranslateService,
    public shoppingBasketService: ShoppingBasketService,
    public confirmYesNoService: ConfirmYesNoService

  ) {
  }

  private confirmDelete(articleId: ShoppingBasketItem['articleID'], articleName: ShoppingBasketItem['articleName']): void {
    this.translate.get(ShoppingBasketComponent.CODE_TRANSLATION_REMOVE_FOR_SURE).subscribe(translated => {
        this.confirmYesNoService.confirm(articleName + ' ' + translated).subscribe(
          result => {
            if (result === 'yes') {
              this.removeShoppingBasketItem(articleId);
            }
          }
        );
      }
    );
  }

  public changeItemAmount_ShoppingBasket (articleId: ShoppingBasketItem['articleID']
                                         , articleName: ShoppingBasketItem['articleName']
                                         , articleAmount: ShoppingBasketItem['articleAmount']): void {
    if (articleAmount >= 1 && articleAmount <= 3) {
      this.shoppingBasketService.changeItemAmount(articleId, articleAmount)
        .subscribe(() => this.snackBarService.showInfo(ShoppingBasketComponent.CODE_TRANSLATION_AMOUNT_CHANGED));
    }
      if (articleAmount < 1) {
      this.snackBarService.showWarning(ShoppingBasketComponent.CODE_TRANSLATION_MIN_QUANTITY);
    } else {
      this.snackBarService.showWarning(ShoppingBasketComponent.CODE_TRANSLATION_MAX_QUANTITY);
    }
  }

  public removeShoppingBasketItem(articleId: ShoppingBasketItem['articleID']): void {
    this.shoppingBasketService.removeItem(articleId)
      .subscribe(() => this.snackBarService.showInfo(ShoppingBasketComponent.CODE_TRANSLATION_REMOVED));
  }

}


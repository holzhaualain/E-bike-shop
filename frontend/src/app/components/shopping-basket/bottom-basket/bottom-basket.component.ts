import {Component, OnInit} from '@angular/core';
import {ShoppingBasketService} from '../../../services/shopping-basket/shopping-basket.service';
import {Router, Event, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-bottom-basket',
  templateUrl: './bottom-basket.component.html',
  styleUrls: ['./bottom-basket.component.scss']
})
export class BottomBasketComponent implements OnInit {

  public showBasket: boolean = true;
  private forbiddenRoutes: string[] = [
    '/shopping-basket',
    '/checkout',
    '/order-detail',

  ];

  constructor(
    public shoppingBasketService: ShoppingBasketService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.showBasket = !(window.location.pathname === this.forbiddenRoutes[0] ||
          window.location.pathname === this.forbiddenRoutes[1] ||
          window.location.pathname === this.forbiddenRoutes[2]);
      }
    });
  }

}

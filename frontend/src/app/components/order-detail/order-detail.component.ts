import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order/order.service';
import {Order} from '../../services/order/order';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public order: Order;
  private langSwitch: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public orderService: OrderService,
    private translate: TranslateService,
    private langService: LanguageService

  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(): boolean {
      return false;
    };
    this.langSwitch = true;
    this.langService.getLanguage().subscribe(() => {
      this.langSwitch = !this.langSwitch;
    });
  }

  public ngOnInit(): void {
    this.route.paramMap
      .subscribe(() => {
        this.orderService.get(this.route.snapshot.queryParams['id'])
          .subscribe(
            result => {
              this.order = result;
              }
          );
      });
  }


}

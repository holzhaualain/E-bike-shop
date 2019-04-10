import {Component, OnInit} from '@angular/core';
import {ShoppingBasketService} from '../../../services/shopping-basket/shopping-basket.service';
import {Router} from '@angular/router';
import {WindowSizeService} from '../../../services/window-size/window-size.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public currentWindowWidth: number;
  public windowTopPosition: any;


  constructor(
    public shoppingBasketService: ShoppingBasketService,
    private windowSizeService: WindowSizeService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.currentWindowWidth = WindowSizeService.initWindowWidth();

    this.windowSizeService.onResize$().subscribe(result => {
      this.currentWindowWidth = result.innerWidth;
    });
    this.windowSizeService.onScroll$().subscribe(result => {
      this.windowTopPosition = result;
    });
  }

  public goToHome(): void {
    this.router.navigate(['/home']).then();
  }
}

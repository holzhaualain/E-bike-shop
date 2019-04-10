import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowSizeService} from '../../services/window-size/window-size.service';
import {Event, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None


})

export class HeaderComponent implements OnInit {

  public currentWindowWidth: number;
  public windowTopPosition: any;
  public showBanner: boolean = true;


  constructor(
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


    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.showBanner =  (event.url === '/home' || event.urlAfterRedirects === '/home');
      }

    });
  }


  // noinspection JSMethodCanBeStatic
  public hamburger(): void {
    if (window.innerWidth <= 562) {
      document.getElementsByClassName('bg-main-nav')[0].classList.toggle('expand');
      document.getElementsByClassName('main-nav')[0].classList.toggle('xs-nav');
      document.getElementsByClassName('hamburger')[0].classList.toggle('change');
    }

  }


}

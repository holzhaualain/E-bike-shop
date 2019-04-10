import {Injectable} from '@angular/core';
import {NavigationCancel, Router} from '@angular/router';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationCancelService {
  private canceledRoute: string;

  constructor(private router: Router) {
  }

  public init(): void  {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationCancel) {
          this.canceledRoute = event.url;
          LoggerService.consoleLog(this.constructor.name, 'constructor', 'NavigationCancel event; route stored ' + this.canceledRoute);
        }
      });
  }

  public getCanceledRoute(): string {
    if (!this.canceledRoute)  {
      LoggerService.consoleLog(this.constructor.name, 'getCanceledRoute', 'canceledRoute not defined; set to /home');
      return '/home';
    }
    return this.canceledRoute;
  }

  public setCanceledRoute(route: string): void {
    this.canceledRoute = route;
    LoggerService.consoleLog(this.constructor.name, 'setCanceledRoute', 'route stored ' + this.canceledRoute);
  }

}

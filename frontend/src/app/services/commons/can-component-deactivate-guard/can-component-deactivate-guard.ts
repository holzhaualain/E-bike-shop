import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {CanComponentDeactivate} from './can-component-deactivate';

@Injectable({
  providedIn: 'root'
})

export class CanComponentDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  public static CODE_TRANSLATION_DISCARD_CHANGES: string = 'DISCARD-CHANGES';
  public static CODE_TRANSLATION_DISCARD_LOGIN: string = 'DISCARD-LOGIN';
  public static CODE_TRANSLATION_DISCARD_CHECKOUT: string = 'DISCARD-CHECKOUT';


  public canDeactivate (
    component: CanComponentDeactivate
    , route: ActivatedRouteSnapshot
    , state: RouterStateSnapshot): Observable<boolean> | true {
    return component.canDeactivate ? component.canDeactivate() : true;
  }


}

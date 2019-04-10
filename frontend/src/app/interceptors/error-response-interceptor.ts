import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/commons/snack-bar/snack-bar.service';
import {NavigationCancelService} from '../services/navigation-cancel/navigation-cancel.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  private static CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN: string = 'SESSION-IS-NO-MORE-VALID-PLEASE-SIGNIN-AGAIN';
  private static CODE_TRANSLATION_BACKEND_DOWN: string = 'BACKEND-SERVER-IS-UNAVAILABLE-PLEASE-TRY-AGAIN-LATER';


  constructor(private router: Router
    , private snackBarService: SnackBarService
              , private navigationCancelService: NavigationCancelService
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => {
        //
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.snackBarService.showInfo(ErrorResponseInterceptor.CODE_TRANSLATION_SESSION_IS_NO_MORE_VALID_PLEASE_SIGNIN_AGAIN);
            this.navigationCancelService.setCanceledRoute(this.router.url);
            this.router.navigate(['my-account']).then();
          } else if (err.status === 0) {
            this.snackBarService.showError(ErrorResponseInterceptor.CODE_TRANSLATION_BACKEND_DOWN);
          }
        }
      })
    );
  }

}

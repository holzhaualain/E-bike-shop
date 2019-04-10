import {ErrorHandler, Injectable} from '@angular/core';
import {SnackBarService} from '../snack-bar/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService extends ErrorHandler {
  private static CODE_TRANSLATION_OOPS_SOMETHING_WENT_WRONG: string = 'OOPS-SOMETHING-WENT-WRONG';


  constructor(private snackBarService: SnackBarService,
              private translate: TranslateService
  ) {
    super();
  }

  public handleError(exception: any): void {
    this.translate.get(ErrorHandlerService.CODE_TRANSLATION_OOPS_SOMETHING_WENT_WRONG).subscribe(translated => {
        if (exception.message && exception.message.length > 0) {
          this.snackBarService.showError(translated + ' -> ' + exception.message);
        } else {
          this.snackBarService.showError(translated);
        }
        super.handleError(exception); // same behavior like standard
      }
    );
  }


}

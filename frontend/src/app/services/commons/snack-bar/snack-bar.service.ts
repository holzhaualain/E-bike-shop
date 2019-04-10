import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar
  , private translateService: TranslateService) { }

  private show(messageToTranslate: string, panelClass: string): void  {
    this.translateService.get(messageToTranslate).subscribe(translated => {
        this.snackBar.open(translated, null, {duration: 4500, verticalPosition: 'top', panelClass: panelClass});
      }
    );
  }

  public showInfo(messageToTranslate: string): void  {
    this.show(messageToTranslate, 'snackbar-info');
  }

  public showWarning(messageToTranslate: string): void  {
    this.show(messageToTranslate, 'snackbar-warning');
  }

  public showError(messageToTranslate: string): void  {
    this.show(messageToTranslate, 'snackbar-error');
  }

}

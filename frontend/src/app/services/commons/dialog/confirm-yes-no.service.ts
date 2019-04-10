import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import {DialogConfirmYesNoComponent} from '../../../components/commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmYesNoService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string ): Observable<string> {

    let dialogRef: MatDialogRef<DialogConfirmYesNoComponent>;

    dialogRef = this.dialog.open(DialogConfirmYesNoComponent);
    dialogRef.componentInstance.title = title;

    return dialogRef.afterClosed();
  }
}

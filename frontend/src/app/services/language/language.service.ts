import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {LanguageDefinition} from './language-definition';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public selectedLanguage: string = 'de';
  private subject: Subject<LanguageDefinition> = new Subject();

  public sendLanguage(langDef: LanguageDefinition): void {
    this.selectedLanguage = langDef.code;
    this.subject.next(langDef);
  }

  public getLanguage(): Observable<LanguageDefinition> {
    return this.subject.asObservable();
  }
}

import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EventManager} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private doc: HTMLElement  = document.documentElement;
  private resizeSubject: Subject<Window>;
  private scrollSubject: Subject<Window>;


  constructor(private eventManager: EventManager) {
    this.resizeSubject    = new Subject();
    this.scrollSubject = new Subject();
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
    this.eventManager.addGlobalEventListener('window', 'scroll', this.onScroll.bind(this));

  }
  public static initWindowWidth (): number {
    return  window.innerWidth;
  }

  public windowTop (): any {
    return (window.pageYOffset || this.doc.scrollTop)  - ( this.doc.clientTop || 0);
  }

  public onResize$(): Observable<Window> {
    return this.resizeSubject.asObservable();
  }

  public onResize(event: UIEvent): void {
    this.resizeSubject.next(<Window>event.target);
  }

  public onScroll$(): Observable<Window> {
    return this.scrollSubject.asObservable();
  }

  public onScroll(): void {
    this.scrollSubject.next(this.windowTop());
  }
}

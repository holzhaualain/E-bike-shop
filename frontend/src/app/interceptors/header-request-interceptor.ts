import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpInterceptor, HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../services/user/user.service';

@Injectable()
export class HeaderRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router
    , private userService: UserService
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      setHeaders: {'Content-Type': 'application/json', 'Authorization': this.userService.getToken()}
    }));
  }

}

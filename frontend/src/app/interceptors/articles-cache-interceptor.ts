import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ArticlesResponseCacheService} from '../services/articles-response-cache/articles-response-cache.service';
import {LoggerService} from '../services/logger/logger.service';

@Injectable()
export class ArticlesCacheInterceptor implements HttpInterceptor {

  constructor(private articlesResponseCacheService: ArticlesResponseCacheService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url.indexOf('articles') > 0) { // cache articles only
      const cachedResponse: HttpResponse<any> = this.articlesResponseCacheService.get(req);
      if (cachedResponse) {
        LoggerService.consoleLog(this.constructor.name, 'intercept', 'response cached, no backend call');
        return of(cachedResponse);
      } else {
        return next.handle(req).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              this.articlesResponseCacheService.put(req, event);
            }
          })
        );
      }
    }
    return next.handle(req);
  }

}

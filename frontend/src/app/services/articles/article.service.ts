import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {Article} from 'src/app/services/articles/article';
import {ArticleRating} from './article-rating';
import {backendUrls} from '../../constants/backend-urls';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) {
  }

  public searchArticles(term: string): Observable<Article[]> {
    if (term === null) {
      return of<Article[]>([]);
    }

    return this.http.get<Article[]>(backendUrls.articles + '?filter=' + term)
      .pipe(
        share(), /* observable$ | async is used several times in template. To avoid similar backend calls */
        tap(() => LoggerService.consoleLog(this.constructor.name, 'searchArticles', 'ok'))
      );
  }

  public getArticlesLatest(limit: number): Observable<Article[]> {
    return this.http
      .get<Article[]>(backendUrls.articlesLatest + '?limit=' + limit)
      .pipe(
        share(), /* observable$ | async is used several times in template. To avoid similar backend calls */
        tap(() => LoggerService.consoleLog(this.constructor.name, 'getArticlesLatest', 'ok'))
      );
  }

  public getArticle(articleQueryParameter: Article['articleQueryParameter']): Observable<Article> {
    return this.http.get<Article>(backendUrls.article + '?article=' + articleQueryParameter)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'getArticle', 'ok'))
      );
  }

  public changeRating(articleRating: ArticleRating): Observable<Article> {
    return this.http.patch<Article>(backendUrls.changeRatingArticle, articleRating)
      .pipe(
        tap(() => LoggerService.consoleLog(this.constructor.name, 'changeRating', 'ok'))
      );
  }


}

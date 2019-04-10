import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../services/articles/article';
import {Router} from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  public stateCtrl: FormControl = new FormControl();
  public articles$: Observable<Article[]>;

  constructor(
    private articleService: ArticleService
    , private router: Router
  ) {
    this.articles$ = this.stateCtrl.valueChanges
      .pipe(
        startWith(null),
        debounceTime(300), // wait 300ms after each keystroke before considering the term
        distinctUntilChanged(), // ignore new term if same as previous term
        switchMap((term: string) => this.searchArticle(term)),
        catchError(() => {
          return of<Article[]>([]); // continue with no message
        })
      );
  }

  private searchArticle(term: string): Observable<Article[]> {
    if (term && term.length > 2) {
      return this.articleService.searchArticles(term.toLowerCase());
    }
    return of<Article[]>([]); // empty Observable<Article[]>
  }

  public onSelected(article: Article): void {
    this.router.navigate(['/article-detail'], {queryParams: {article: article.articleQueryParameter}}).then();
  }

}

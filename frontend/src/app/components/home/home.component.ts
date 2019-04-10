import {Component } from '@angular/core';

import {ArticleService} from 'src/app/services/articles/article.service';
import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  public articles$: Observable<Article[]>;

  constructor(
    private articleService: ArticleService,
  ) {
    this.articles$ = this.articleService.getArticlesLatest(4);
  }

}

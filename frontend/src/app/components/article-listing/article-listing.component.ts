import {Component } from '@angular/core';

import {Article} from 'src/app/services/articles/article';
import {Observable} from 'rxjs';
import {ArticleService} from '../../services/articles/article.service';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.scss']
})
export class ArticleListingComponent  {
  public articles$: Observable<Article[]>;
  public p: number = 1;

  constructor(
    private articleService: ArticleService
  ) {
    this.articles$ = this.articleService.searchArticles('');

   }
}


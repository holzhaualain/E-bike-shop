import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../../services/articles/article.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Article} from '../../../services/articles/article';
import {LanguageService} from '../../../services/language/language.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public articles$: Observable<Article[]>;

  public n: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    public langService: LanguageService

  ) {
    // reload page when ID changes
    this.router.routeReuseStrategy.shouldReuseRoute = function (): boolean {
      return false;
    };
  }

  public ngOnInit(): void {
    this.route.paramMap
      .subscribe( () => {
        if (this.route.snapshot.queryParams['search'] && this.route.snapshot.queryParams['search'] !== '') {
          this.articles$ = this.articleService.searchArticles(this.route.snapshot.queryParams['search'].toLowerCase());
        } else {
          this.articles$ = null;
        }
      });
  }

}

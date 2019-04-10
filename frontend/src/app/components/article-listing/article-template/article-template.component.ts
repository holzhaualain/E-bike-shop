import {Component, Input} from '@angular/core';
import {Article} from 'src/app/services/articles/article';
import {Router} from '@angular/router';
import {backendUrls} from '../../../constants/backend-urls';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
  styleUrls: ['./article-template.component.scss']
})
export class ArticleTemplateComponent {

  @Input() public article: Article;
  public rootURL: string = backendUrls.root;
  public loading: boolean  = true;

  constructor(
    private router: Router
  ) {
  }

  public onLoad(): void {
    this.loading = false;
  }

  public onGoToDetail(articleQueryParameter): void {
    this.router.navigate(['article-detail'], {queryParams: {article: articleQueryParameter}}).then();
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadcrumbPath} from './breadcrumb-path';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public firstParam: string;
  public breadcrumbPath: BreadcrumbPath[] = [];

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private languageService: LanguageService
  ) {
    this.languageService.getLanguage().subscribe(() => this.translateBreadcrumb());
  }

  public ngOnInit(): void {
    this.route.paramMap
      .subscribe(() => {
        this.firstParam = this.route.snapshot.queryParams.article;
        this.route.data.subscribe(data => {
          this.breadcrumbPath = data.breadcrumbPath;
          this.translateBreadcrumb();
        });
      });
  }

  private translateBreadcrumb(): void {
     for (let i: number = 0; i < this.breadcrumbPath.length; i++ ) {
        this.translateService.get(this.breadcrumbPath[i].breadcrumb).subscribe(translated => {
           this.breadcrumbPath[i].breadcrumbTranslated = translated;
          }
        );
      }
  }


}

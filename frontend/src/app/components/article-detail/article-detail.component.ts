import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../services/articles/article.service';
import {Article} from '../../services/articles/article';
import {ShoppingBasketService} from '../../services/shopping-basket/shopping-basket.service';
import {ArticleRating} from '../../services/articles/article-rating';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {backendUrls} from '../../constants/backend-urls';
import {UserService} from '../../services/user/user.service';
import {ArticleURLs} from './articleURL';
import {LanguageService} from '../../services/language/language.service';
import {ViewValueNumber} from './view-value-number';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})

export class ArticleDetailComponent implements OnInit {
  private static CODE_TRANSLATION_ADDED: string = 'ADDED-TO-SHOPPING-BASKET';
  public article: Article;
  public rootURL: string = backendUrls.root;
  public selectedValue: number = 1;
  private articleAmount: number = 1;
  public loading: boolean = true;
  public articleURLs: ArticleURLs;
  public slideIndex: number = 1;
  public amount: ViewValueNumber[] = [
    new ViewValueNumber(1, '1'),
    new ViewValueNumber(2, '2'),
    new ViewValueNumber(3, '3')
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private shoppingBasketService: ShoppingBasketService,
    private translate: TranslateService,
    private snackBarService: SnackBarService,
    public userService: UserService,
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
          if (this.route.snapshot.queryParams['article'] && this.route.snapshot.queryParams['article'] !== '') {
        this.articleService.getArticle(this.route.snapshot.queryParams['article'])
          .subscribe(
            result => {
              if (result === null) {
                this.articleNotFound();
                return;
              }
               this.article = result;
                this.loading = false;
                this.articleURLs = {
                  img01: this.rootURL + this.article.imageURL,
                  img02: this.rootURL + this.article.imageURL2,
                  img03: this.rootURL + this.article.imageURL3

              };
              this.showSlides(this.slideIndex);
            }
          );
        } else {
          this.articleNotFound();
        }
      });
  }

  private articleNotFound (): void {
    this.router.navigate(['not-found']).then();

  }

  public onSelectedArticleAmount(amount: number): void {
    this.articleAmount = amount;
  }

  public onAddShoppingBasketItem(): void {
    this.shoppingBasketService.addItem(this.article._id, this.articleAmount)
      .subscribe(() => {
          this.translate.get(ArticleDetailComponent.CODE_TRANSLATION_ADDED).subscribe(translated => {
              this.snackBarService.showInfo(this.article.name + ' ' + translated);
            }
          );
        }
      );
  }

  public onChangeArticleRating(rateUp): void {
    this.articleService.changeRating(new ArticleRating(this.article._id, rateUp))
      .subscribe(article => {
          this.article = article;
        }
      );
  }

  public showSlides(n: number): void {
    let i: number;
    const slides: NodeListOf<Element> = document.getElementsByClassName('article-detail-img');
    const bullets: NodeListOf<Element> = document.getElementsByClassName('bullet');

    if (n > slides.length) {
      this.slideIndex = 1;
    } else if (n < 1) {
      this.slideIndex = slides.length;
    } else {
      this.slideIndex = n;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display:none');
    }
    for (i = 0; i < bullets.length; i++) {
      bullets[i].className = bullets[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].setAttribute('style', 'display:block');
    bullets[this.slideIndex - 1].className += ' active';
  }

  public plusSlides(n): void {
    this.showSlides(this.slideIndex += n);
  }

  public currentSlide(n): void {
    this.showSlides(this.slideIndex = n);
  }
}


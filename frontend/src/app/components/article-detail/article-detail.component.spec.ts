import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticleDetailComponent} from './article-detail.component';
import {ArticleService} from '../../services/articles/article.service';
import {Observable} from 'rxjs';
import 'rxjs/add/Observable/from';
import {AppComponent} from '../../app.component';
import {HomeComponent} from '../home/home.component';
import {ArticleListingComponent} from '../article-listing/article-listing.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';
import {ArticleTemplateComponent} from '../article-listing/article-template/article-template.component';
import {HeaderComponent} from '../header/header.component';
import {TopBarComponent} from '../header/top-bar/top-bar.component';
import {FooterComponent} from '../footer/footer.component';
import {DialogConfirmYesNoComponent} from '../commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {SearchComponent} from '../search/search.component';
import {TrimPipe} from '../../pipes/trim.pipe';
import {DeTrimPipe} from '../../pipes/de-trim.pipe';
import {AmountConverterPipe} from '../../pipes/currency.pipe';
import {NotFoundComponent} from '../not-found/not-found.component';
import {LangSwitchComponent} from '../header/lang-switch/lang-switch.component';
import {ShoppingBasketListingComponent} from '../shopping-basket/shopping-basket-listing/shopping-basket-listing.component';
import {OverviewComponent} from '../admin/overview/overview.component';
import {LoginInfoComponent} from '../header/login-info/login-info.component';
import {MyOrdersComponent} from '../my-orders/my-orders.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../../mat-components/mat-components.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {InitAppService} from '../../services/init-app/init-app.service';
import {UserService} from '../../services/user/user.service';
import {LanguageService} from '../../services/language/language.service';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {ArticlesResponseCacheService} from '../../services/articles-response-cache/articles-response-cache.service';
import {AuthAdminGuardService} from '../../services/guards/auth-admin-guard.service';
import {CheckoutReadyGuardService} from '../../services/guards/checkout-ready-guard.service';
import {NavigationCancelService} from '../../services/navigation-cancel/navigation-cancel.service';
import {ArticlesCacheInterceptor} from '../../interceptors/articles-cache-interceptor';
import {ErrorResponseInterceptor} from '../../interceptors/error-response-interceptor';
import {HttpLoaderFactory} from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {Article} from '../../services/articles/article';
import {SearchResultsComponent} from '../search/search-results/search-results.component';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;
  let articleService: ArticleService;
  let article: Article;

  beforeEach(async(() => {
    articleService = new ArticleService(null);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ArticleListingComponent,
        MyAccountComponent,
        ArticleDetailComponent,
        ShoppingBasketComponent,
        ArticleTemplateComponent,
        HeaderComponent,
        TopBarComponent,
        FooterComponent,
        DialogConfirmYesNoComponent,
        OrderDetailComponent,
        CheckoutComponent,
        BreadcrumbComponent,
        SearchComponent,
        TrimPipe,
        DeTrimPipe,
        AmountConverterPipe,
        NotFoundComponent,
        LangSwitchComponent,
        ShoppingBasketListingComponent,
        OverviewComponent,
        LoginInfoComponent,
        MyOrdersComponent,
        SearchResultsComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatComponentsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [InitAppService, UserService, LanguageService, CanComponentDeactivateGuard, SnackBarService,
        ArticlesResponseCacheService, AuthAdminGuardService, CheckoutReadyGuardService, NavigationCancelService,
        {provide: HTTP_INTERCEPTORS, useClass: ArticlesCacheInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true},
        {provide: APP_BASE_HREF, useValue: '/article-detail'}
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ArticleDetailComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should change article rating ', () => {
    // arrange
    component.onChangeArticleRating = function (): void {
    };

    // act
    component.onChangeArticleRating(1);

    // assert
    expect(component.onChangeArticleRating).toBeTruthy();
  });

  it('should call article details', () => {
    article = {
      'brand': 'Superbike',
      'name': 'E-Bike Modell 1',
      'itemNumber': '10000001',
      'descriptionDE': 'DE DE DE sanctus doctus elit sale auctor convenire purus nihil solet quas posse mollis audire platonem percipit DE',
      'descriptionEN': 'EN EN EN sanctus doctus elit sale auctor convenire purus nihil solet quas posse mollis audire platonem percipit EN',
      'price': 1000.35,
      'imageURL2': 'image/bikeOrigin2_clone_pixelated_1.jpg',
      'imageURL': 'image/bikeOrigin_clone_pixelated_1.jpg',
      'imageURL3': 'image/bikeOrigin3_clone_pixelated_1.jpg',
      'availability': false,
      'rating': [true, true, true, true, true],
      'articleQueryParameter': 'Superbike-E-Bike-Modell-1',
      '_id': 'xEUehKXKxYo0001',

    };
    component.ngOnInit();
    spyOn(articleService, 'getArticle').and.callFake(() => {
      return Observable.from([{article}]);
    });

    expect(article).toBe(article);
  });
});

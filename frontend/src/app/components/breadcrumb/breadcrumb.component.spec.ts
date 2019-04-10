import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import {InitAppService} from '../../services/init-app/init-app.service';
import {UserService} from '../../services/user/user.service';
import {CanComponentDeactivateGuard} from '../../services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {SnackBarService} from '../../services/commons/snack-bar/snack-bar.service';
import {ArticlesResponseCacheService} from '../../services/articles-response-cache/articles-response-cache.service';
import {AuthAdminGuardService} from '../../services/guards/auth-admin-guard.service';
import {CheckoutReadyGuardService} from '../../services/guards/checkout-ready-guard.service';
import {NavigationCancelService} from '../../services/navigation-cancel/navigation-cancel.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ArticlesCacheInterceptor} from '../../interceptors/articles-cache-interceptor';
import {ErrorResponseInterceptor} from '../../interceptors/error-response-interceptor';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../../mat-components/mat-components.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {AppComponent} from '../../app.component';
import {HomeComponent} from '../home/home.component';
import {ArticleListingComponent} from '../article-listing/article-listing.component';
import {MyAccountComponent} from '../my-account/my-account.component';
import {ArticleDetailComponent} from '../article-detail/article-detail.component';
import {ShoppingBasketComponent} from '../shopping-basket/shopping-basket.component';
import {ArticleTemplateComponent} from '../article-listing/article-template/article-template.component';
import {HeaderComponent} from '../header/header.component';
import {TopBarComponent} from '../header/top-bar/top-bar.component';
import {FooterComponent} from '../footer/footer.component';
import {DialogConfirmYesNoComponent} from '../commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {CheckoutComponent} from '../checkout/checkout.component';
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
import {LanguageService} from '../../services/language/language.service';
import {SearchResultsComponent} from '../search/search-results/search-results.component';
describe('BreadcrumbComponent', () => {

  beforeEach(async(() => {

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
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    })
    .compileComponents();
  }));

  it('should create breadcrumb', async(() => {
    const fixture: ComponentFixture<any> = TestBed.createComponent(BreadcrumbComponent);
    const component: any = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});

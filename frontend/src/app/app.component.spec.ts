import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {ArticleTemplateComponent} from './components/article-listing/article-template/article-template.component';
import {HeaderComponent} from './components/header/header.component';
import {TopBarComponent} from './components/header/top-bar/top-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {DialogConfirmYesNoComponent} from './components/commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {SearchComponent} from './components/search/search.component';
import {TrimPipe} from './pipes/trim.pipe';
import {DeTrimPipe} from './pipes/de-trim.pipe';
import {AmountConverterPipe} from './pipes/currency.pipe';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LangSwitchComponent} from './components/header/lang-switch/lang-switch.component';
import {ShoppingBasketListingComponent} from './components/shopping-basket/shopping-basket-listing/shopping-basket-listing.component';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {LoginInfoComponent} from './components/header/login-info/login-info.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from './mat-components/mat-components.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.module';
import {InitAppService} from './services/init-app/init-app.service';
import {UserService} from './services/user/user.service';
import {CanComponentDeactivateGuard} from './services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {SnackBarService} from './services/commons/snack-bar/snack-bar.service';
import {ArticlesResponseCacheService} from './services/articles-response-cache/articles-response-cache.service';
import {AuthAdminGuardService} from './services/guards/auth-admin-guard.service';
import {CheckoutReadyGuardService} from './services/guards/checkout-ready-guard.service';
import {NavigationCancelService} from './services/navigation-cancel/navigation-cancel.service';
import {ArticlesCacheInterceptor} from './interceptors/articles-cache-interceptor';
import {ErrorResponseInterceptor} from './interceptors/error-response-interceptor';
import {APP_BASE_HREF} from '@angular/common';
import {LanguageService} from './services/language/language.service';
import {SearchResultsComponent} from './components/search/search-results/search-results.component';

describe('AppComponent', () => {
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
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture: ComponentFixture<any> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
  it(`should have as title The E-Bike Store`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The E-Bike Store');
  }));*/

  it('should render title in a h2 tag', async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled: any = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('The E-Bike Store');

  }));

});

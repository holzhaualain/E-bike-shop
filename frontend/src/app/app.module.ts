import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {SearchComponent} from './components/search/search.component';
import {TrimPipe} from './pipes/trim.pipe';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {AmountConverterPipe} from './pipes/currency.pipe';
import {ArticleTemplateComponent} from './components/article-listing/article-template/article-template.component';
import {MatComponentsModule} from './mat-components/mat-components.module';
import {HeaderComponent} from './components/header/header.component';
import {TopBarComponent} from './components/header/top-bar/top-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {DeTrimPipe} from './pipes/de-trim.pipe';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LangSwitchComponent} from './components/header/lang-switch/lang-switch.component';
import {ShoppingBasketListingComponent} from './components/shopping-basket/shopping-basket-listing/shopping-basket-listing.component';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {SnackBarService} from './services/commons/snack-bar/snack-bar.service';
import {DialogConfirmYesNoComponent} from './components/commons/dialog/dialog-confirm-yes-no/dialog-confirm-yes-no.component';
import {CanComponentDeactivateGuard} from './services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {ErrorResponseInterceptor} from './interceptors/error-response-interceptor';
import { LoginInfoComponent } from './components/header/login-info/login-info.component';
import {UserService} from './services/user/user.service';
import {ArticlesResponseCacheService} from './services/articles-response-cache/articles-response-cache.service';
import {AuthAdminGuardService} from './services/guards/auth-admin-guard.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import {CheckoutReadyGuardService} from './services/guards/checkout-ready-guard.service';
import {ArticlesCacheInterceptor} from './interceptors/articles-cache-interceptor';
import {InitAppService} from './services/init-app/init-app.service';
import {NavigationCancelService} from './services/navigation-cancel/navigation-cancel.service';
import {LanguageService} from './services/language/language.service';
import {LoggerService} from './services/logger/logger.service';
import {SearchResultsComponent} from './components/search/search-results/search-results.component';
import {HeaderRequestInterceptor} from './interceptors/header-request-interceptor';
import {LocalStorageService} from './services/commons/local-storage/local-storage.service';
 import { BottomBasketComponent } from './components/shopping-basket/bottom-basket/bottom-basket.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
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
    SearchResultsComponent,
    SearchComponent,
    BottomBasketComponent
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
  entryComponents: [
    DialogConfirmYesNoComponent],
  providers: [InitAppService, UserService, LanguageService, CanComponentDeactivateGuard, SnackBarService,
    ArticlesResponseCacheService, AuthAdminGuardService, CheckoutReadyGuardService, NavigationCancelService,
    LoggerService, LocalStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: HeaderRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ArticlesCacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

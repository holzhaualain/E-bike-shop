import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ArticleListingComponent} from './components/article-listing/article-listing.component';
import {MyAccountComponent} from './components/my-account/my-account.component';
import {ArticleDetailComponent} from './components/article-detail/article-detail.component';
import {ShoppingBasketComponent} from './components/shopping-basket/shopping-basket.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BreadcrumbPath} from './components/breadcrumb/breadcrumb-path';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {OverviewComponent} from './components/admin/overview/overview.component';
import {CanComponentDeactivateGuard} from './services/commons/can-component-deactivate-guard/can-component-deactivate-guard';
import {AuthAdminGuardService} from './services/guards/auth-admin-guard.service';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {AuthGuardService} from './services/guards/auth-guard.service';
import {CheckoutReadyGuardService} from './services/guards/checkout-ready-guard.service';
import {InitAppService} from './services/init-app/init-app.service';
import {SearchResultsComponent} from './components/search/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [InitAppService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
       },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'article-listing', component: ArticleListingComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('', 'OUR-ARTICLES')]}
      },
      {
        path: 'article-detail', component: ArticleDetailComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('article-listing', 'OUR-ARTICLES')]}
      },
      {
        path: 'search-results', component: SearchResultsComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('', 'SEARCH-RESULTS')]}
      },
      {
        path: 'my-account', component: MyAccountComponent,
        canDeactivate: [CanComponentDeactivateGuard],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-ACCOUNT')]}
      },
      {
        path: 'shopping-basket', component: ShoppingBasketComponent,
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-SHOPPING-BASKET')]}
      },
      {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [CheckoutReadyGuardService],
        canDeactivate: [CanComponentDeactivateGuard],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'CHECKOUT')]}
      },
      {
        path: 'my-orders', component: MyOrdersComponent,
        canActivate: [AuthGuardService],
        canDeactivate: [CanComponentDeactivateGuard],
        data: {breadcrumbPath: [new BreadcrumbPath('', 'MY-ORDERS')]}
      },
      {path: 'order-detail', component: OrderDetailComponent},
      {
        path: 'admin/overview', component: OverviewComponent,
        canActivate: [AuthAdminGuardService],
        canDeactivate: [CanComponentDeactivateGuard],
      }
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}

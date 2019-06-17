import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '../core/dashboard-layout/dashboard-layout.component';
import { ManagementGuardService } from '../management/management-guard.service';
import { AdminComponent } from './admin/admin.component';
import { ViewsComponent } from './views/views.component';
import { TrafficComponent } from './traffic/traffic.component';
import { GeneralComponent } from './general/general.component';
import { GeoComponent } from './geo/geo.component';
import { HistoryComponent } from './history/history.component';
import { NewsComponent } from './news/news.component';
import { OrdersComponent } from './orders/orders.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsComponent } from './products/products.component';
import { ProducttypesComponent } from './producttypes/producttypes.component';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AdminComponent
      },
      {
        path: 'products',
        component: ProductsComponent,
        resolve: { productTypeList: ProductTypeListResolverService },
        canActivate: [ManagementGuardService]
      },
      {
        path: 'producttypes',
        component: ProducttypesComponent,
        resolve: { productTypeList: ProductTypeListResolverService },
        canActivate: [ManagementGuardService]
      },
      {
        path: 'views',
        component: ViewsComponent
      },
      {
        path: 'traffic',
        component: TrafficComponent
      },
      {
        path: 'general',
        component: GeneralComponent
      },
      {
        path: 'geo',
        component: GeoComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ],
    canActivate: [ManagementGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

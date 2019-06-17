import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ViewsComponent } from './views/views.component';
import { TrafficComponent } from './traffic/traffic.component';
import { GeoComponent } from './geo/geo.component';
import { OrdersComponent } from './orders/orders.component';
import { NewsComponent } from './news/news.component';
import { GeneralComponent } from './general/general.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { ProducttypesComponent } from './producttypes/producttypes.component';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [AdminComponent, ViewsComponent, TrafficComponent, GeoComponent,
     OrdersComponent, NewsComponent, GeneralComponent, HistoryComponent,
      SettingsComponent, ProductsComponent, ProducttypesComponent]
  , providers: [ProductTypeListResolverService]
})
export class AdminModule { }

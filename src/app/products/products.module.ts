import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent, FloorPipe } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './products-routing.module';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { HelperService } from '../helper/common.helper';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';
import { RelationProductListResolverService } from '../services/relation-product-list-resolver.service';
import { RecentlyViewProductListResolverService } from '../services/recently-view-product-list-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    FloorPipe
  ],
  providers: [DataService, HelperService, ProductTypeListResolverService,
     RelationProductListResolverService, RecentlyViewProductListResolverService]
})
export class ProductsModule { }

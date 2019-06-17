import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AppLayoutComponent } from '../core/app-layout/app-layout.component';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';
import { RelationProductListResolverService } from '../services/relation-product-list-resolver.service';
import { RecentlyViewProductListResolverService } from '../services/recently-view-product-list-resolver.service';

const routes: Routes = [
    {
      path: 'products',
      component: AppLayoutComponent,
      children: [
        {
            path: '',
            component: ProductListComponent
        },
        {
          path: ':productType',
          component: ProductListComponent
          , resolve: { productTypeList: ProductTypeListResolverService }
        },
        {
          path: 'detail/:id',
          component: ProductDetailComponent
          , resolve: {
            topViewProducts: RelationProductListResolverService
            , productTypeList: ProductTypeListResolverService
            , recentlyViewed: RecentlyViewProductListResolverService
          }
        }
      ]
      , resolve: { productTypeList: ProductTypeListResolverService }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}

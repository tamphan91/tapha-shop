import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { ManagementModule } from './management/management.module';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
    {
      path: 'products',
      data: { preload: false },
      loadChildren: './products/products.module#ProductsModule'
    },
    {
      path: 'management',
      data: { preload: false },
      loadChildren: './management/management.module#ManagementModule'
    },
    {
      path: 'admin',
      data: { preload: false },
      loadChildren: './admin/admin.module#AdminModule'
    },
    {
      path: '',
      redirectTo: 'products',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

@NgModule({
    imports: [
        AdminModule,
        ProductsModule,
        CoreModule,
        ManagementModule,
        RouterModule.forRoot(routes, { anchorScrolling: 'enabled', onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled', useHash: true})
    ],
    exports: [
        RouterModule,
        // CoreModule
    ],
    declarations: []
})
export class AppRoutingModule { }

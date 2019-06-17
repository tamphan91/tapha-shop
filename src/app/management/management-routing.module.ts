import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from '../core/dashboard-layout/dashboard-layout.component';
import { ManagementGuardService } from './management-guard.service';
import { ManagementHistoryComponent } from './management-history/management-history.component';
import { ManagementInformationComponent } from './management-information/management-information.component';
import { AppLayoutComponent } from '../core/app-layout/app-layout.component';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';
import { ManagementPaymentComponent } from './management-payment/management-payment.component';

const routes: Routes = [
  {
    path: 'management',
    component: AppLayoutComponent,
    children: [
      {
        path: 'history',
        component: ManagementHistoryComponent
      },
      {
        path: 'information',
        component: ManagementInformationComponent
      },
      {
        path: 'payment',
        component: ManagementPaymentComponent
      }
    ],
    canActivate: [ManagementGuardService],
    resolve: { productTypeList: ProductTypeListResolverService }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ManagementGuardService]
})
export class ManagementRoutingModule { }

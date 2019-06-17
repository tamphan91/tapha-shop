import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementHistoryComponent } from './management-history/management-history.component';
import { ManagementInformationComponent } from './management-information/management-information.component';
import { ProductTypeListResolverService } from '../services/producttype-list-resolver.service';
import { ManagementPaymentComponent } from './management-payment/management-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ManagementHistoryComponent, ManagementInformationComponent, ManagementPaymentComponent]
  , providers: [ProductTypeListResolverService]
})
export class ManagementModule { }

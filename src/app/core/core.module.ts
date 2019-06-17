import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AuthenticationService } from '../services/authentication.service';
import { CommonService } from '../services/common.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, AppLayoutComponent, DashboardLayoutComponent, LoginComponent, CartComponent],
  providers: [DataService, AuthenticationService, CommonService]
})
export class CoreModule { }

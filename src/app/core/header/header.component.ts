import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductType } from '../../model/ProductType';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, fromEvent, Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';
import { LoginComponent } from '../login/login.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(LoginComponent) child: LoginComponent;
  searchString: string;
  title: string;
  expandName = '';
  tabIndex = 1;
  logo = environment.logo;
  showMySideBar: boolean;
  productTypeList: ProductType[];
  itemsCountInCart: number;
  firstname: string;
  isLogin: boolean;
  currentUrl: string;
  currentUser: Object;

  constructor(private router: Router, private route: ActivatedRoute, private data: DataService) {
  }

  ngOnInit() {

    this.data.currentUrl.subscribe(url => {
      this.currentUrl = url;
    });

    this.data.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    if (this.currentUser) {
      this.child.login(this.currentUser);
    }

    this.data.currentTabIndexSource.subscribe(tabIndexSource => {
      this.tabIndex = tabIndexSource;
    });

    this.data.currentShowMySideBar.subscribe(showMySideBar => {
      this.showMySideBar = showMySideBar;
    });

    this.data.currentItemsCountSource.subscribe(total => {
      this.itemsCountInCart = total;
    });

    this.data.currentExpandName.subscribe(expandName => {
      this.expandName = expandName;
    });

    this.data.currentTitle.subscribe(title => {
      this.title = title;
    });

    this.route.queryParamMap.subscribe(params => {
      const isLogin = params.get('isLogin');
      if (isLogin === 'false' && !this.currentUser) {
        $('#id02').css('display', 'block');
      }

      this.searchString = params.get('searchString');
      if (this.searchString && this.searchString.trim().length > 0) {
        this.data.changeTitle(`Search Results for \"${this.searchString}\"`);
      } else {
        this.data.changeTitle('New arrivals');
      }
    });

    const dataReturn: ProductType[] | string = this.route.snapshot.data['productTypeList'];
    if (Array.isArray(dataReturn)) {
      this.productTypeList = dataReturn.filter(p => p['product_type_id'] == null);
    } else {
      this.data.changeTitle(dataReturn);
    }

  }

  displayUser(obj: Object) {
    this.firstname = obj['firstname'];
  }

  checkLogin(obj: Object) {
    this.isLogin = obj['isLogin'];
  }

  changeTitle(title: string) {
    this.data.changeTitle(title);
  }

  activeIsExpand(name: string) {
    this.data.changeExpandName(name);
  }

  toggleMySideBar() {
    this.showMySideBar = !this.showMySideBar;
  }

  changeTabIndex(index: number) {
    this.tabIndex = index;
  }

  changeSearch(searchString: string) {
    this.searchString = searchString;
  }

  searchProducts() {
    this.router.navigate(['/'], { queryParams: this.searchString ? { searchString: this.searchString } : null });
  }

  logOut() {
    this.child.logOut();
  }
}

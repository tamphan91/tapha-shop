import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from '../../model/Product';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/producttype.service';
import { ProductType } from '../../model/ProductType';
import { HelperService } from '../../helper/common.helper';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productTypeName: string;
  searchString: string;
  productTypeId: number;
  currentProductType: ProductType;
  productList: Product[] = [];
  currentProductList: Product[] = [];
  currentPage: number;
  canLoadMore = true;
  sub: Subscription;
  constructor(private helper: HelperService, private route: ActivatedRoute,
    private productService: ProductService, private data: DataService) {
  }

  getTagName(state: number) {
    return this.helper.getTagName(state);
  }

  ngOnInit() {
    const dataReturn: ProductType[] = this.route.snapshot.data['productTypeList'];
    this.route.queryParamMap.subscribe(param => {
      this.searchString = param.get('searchString');
      this.route.params.subscribe(params => {
        this.data.changeShowMySideBar(false);
        this.productTypeId = params['productType'] ? Number(params['productType']) : null;
        this.currentPage = 1;
        if (Array.isArray(dataReturn)) {
          const productType = dataReturn.find(p => p.id === this.productTypeId);
          this.currentProductType = productType;
          if (!this.searchString && productType) {
            this.data.changeTitle(productType.description);
            const pt = dataReturn.find(p => p.id === productType.product_type_id);
            this.data.changeExpandName(pt ? pt.name : productType.description);
          } else {
            this.data.changeExpandName(null);
          }
          this.getData();
        } else {
          console.log(dataReturn);
        }
      });
    });
  }

  getData(isLoadMore = false) {
    this.productService.getProducts(this.productTypeId, this.currentPage, this.searchString).subscribe(
      res => {
        this.canLoadMore = res.total > 0 && (res.page !== res.lastPage);
        this.currentPage = res.page === res.lastPage ? res.lastPage : (res.page + 1);
        this.productList = (isLoadMore ? this.productList.concat(res.data) : res.data);
        this.currentProductList = this.productList;
      }
    );
  }

  mouseEnter(product: Product) {
    product.url = product.images[0];
  }

  mouseLeave(product: Product) {
    product.url = product.images[1];
  }

  loadMore() {
    this.getData(true);
  }
}

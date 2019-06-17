import { Component, OnInit, AfterViewInit, Pipe, PipeTransform, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { IItem } from '../../model/IItem';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/Product';
import { environment } from '../../../environments/environment.prod';
import { ProductType } from '../../model/ProductType';
declare var jssor_1_slider_init: any;
declare var jssor_2_slider_init: any;
declare var jssor_1_slider_append: any;
declare var jssor_2_slider_detroy: any;
declare var jssor_2_slider_reload: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  currentImgIndex: number;
  item: IItem;
  topSizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  bottomSizes: string[] = ['28W', '29W', '30W', '31W', '32W', '33W', '34W'];
  relationProducts: Product[];
  recentlyViewed: Product[];
  sizes: string[];
  isValidate: boolean;
  type: number;
  isAdding = false;
  btnText = 'ADD TO BAG';
  constructor(private route: Router, private router: ActivatedRoute, private data: DataService, private productService: ProductService) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngAfterViewInit(): void {
    if (this.relationProducts.length > 0) {
      jssor_1_slider_init();
    }
    if (this.recentlyViewed.length > 0) {
      jssor_2_slider_init();
    }
  }
  ngOnInit() {
    this.relationProducts = this.router.snapshot.data['topViewProducts'];
    this.recentlyViewed = this.router.snapshot.data['recentlyViewed'];
    this.router.params.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe(product => {
        this.data.addRecentlyViewed(product);
        this.data.changeExpandName('');
        const productTypeList: ProductType[] = this.router.snapshot.data['productTypeList'];
        if (Array.isArray(productTypeList)) {
          const productType = productTypeList.find(p => p.id === (product['product_type_id']));
          this.data.changeTitle(productType.description);
        }
        this.currentImgIndex = 0;

        this.sizes = this.getTopOrBottomItem(product.product_type_id) === 'top' ? this.topSizes : this.bottomSizes;
        this.item = {
          id: product.id,
          name: product.name,
          price: product.price,
          sale: product.sale,
          size: '',
          color: null,
          length: '',
          url: product.url,
          quantity: 1,
          state: product.state,
          images: product.images,
          details: product.details,
          materialAndCare: product.materialAndCare,
          product_type_id: product.product_type_id
        };
      });
    });
  }

  changImgIndex(newIndex: number) {
    this.currentImgIndex = newIndex;
  }

  addToBag() {
    this.btnText = 'Processing...';
    this.isAdding = true;
    setTimeout(() => {
      this.data.addItem(Object.assign({}, this.item));
      this.btnText = 'ADD TO BAG';
      this.isAdding = false;
    }, 2000);
  }

  getTopOrBottomItem(product_type_id: number) {
    return [8, 9, 10, 11].includes(product_type_id) ? 'bottom' : 'top';
  }
}

@Pipe({ name: 'floor' })
export class FloorPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor(value);
  }
}

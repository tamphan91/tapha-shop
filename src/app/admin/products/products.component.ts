import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductService } from '../../services/product.service';
import { ProductType } from '../../model/ProductType';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageSize: number;
  pageTotal: number;
  currentPage: number;
  tags: string[];
  productList: Product[];
  productTypeList: ProductType[];
  currentIdEdit: number;
  productToAdd: Product = new Product();
  productToEditClone: Product;
  searchString = '';
  message: string;
  showImage = false;
  currentSrcImage: string;
  constructor(private productService: ProductService,
    private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentPage = 1;
    this.pageSize = 5;
    const dataReturn: ProductType[] | string = this.route.snapshot.data['productTypeList'];
    if (Array.isArray(dataReturn)) {
      this.productTypeList = dataReturn.filter(x => x.productTypes.length === 0);
    } else {
      this.message = dataReturn.toString();
    }
    this.getData();
    this.data.currentTags.subscribe(tags => {
      this.tags = tags;
    });
    this.productToAdd.images = new Array(3);
  }

  getData() {
    this.productService.getProducts(null, null, this.searchString, 100, true).subscribe(res => {
      this.pageTotal = Math.ceil(res.data.length / this.pageSize);
    });
    this.productService.getProducts(null, this.currentPage, this.searchString, this.pageSize, true).subscribe(res => {
      this.productList = res.data;
    });
  }

  changeCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getData();
  }

  toggleAddForm() {
    this.currentIdEdit = this.currentIdEdit === -1 ? null : -1;
  }

  closeAction() {
    if (this.currentIdEdit && this.currentIdEdit !== -1) {
      Object.assign(this.productList.find(x => x.id === this.currentIdEdit), this.productToEditClone);
      this.productToEditClone = null;
    }
    this.currentIdEdit = null;
  }

  addProduct(product: Product) {
    this.productService.saveProduct(product).subscribe(p => {
      this.changeSearch('');
      this.getData();
      this.productToAdd = new Product();
      this.productToAdd.images = new Array(6);
      this.currentIdEdit = null;
    });
  }

  changeSearch(searchStr: string) {
    this.searchString = searchStr;
    this.currentPage = 1;
    if (this.searchString && this.searchString.trim().length > 0) {
      this.message = `Search Results for \"${searchStr}\"`;
    } else {
      this.message = null;
    }
  }

  searchProducts() {
    this.getData();
  }

  handleClick(product: Product) {
    this.currentIdEdit = this.currentIdEdit === product.id ? null : product.id;
    if (this.currentIdEdit) {
      this.productToEditClone = Object.assign({}, product);
    } else {
      product.sale = product.state === 2 ? product.sale : null;
      this.productService.editProduct(product).subscribe(p => {
      });
    }
  }

  getProductTypeDescription(productTypeId: number) {
    return this.productTypeList.find(x => x.id === productTypeId).description;
  }

  showImageModal(src) {
    this.showImage = !this.showImage;
    this.currentSrcImage = src;
  }
}

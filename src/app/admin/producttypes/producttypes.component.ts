import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../services/producttype.service';
import { ProductType } from '../../model/ProductType';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producttypes',
  templateUrl: './producttypes.component.html',
  styleUrls: ['./producttypes.component.css']
})
export class ProducttypesComponent implements OnInit {
  productTypeList: ProductType[];
  productTypeToEditClone: ProductType;
  currentIdEdit: number;
  searchString = '';
  message: string;
  productTypeToAdd: ProductType = new ProductType();
  showImage = false;
  currentSrcImage: string;
  constructor(private productTypeService: ProductTypeService, private route: ActivatedRoute) { }

  ngOnInit() {

    const dataReturn: ProductType[] | string = this.route.snapshot.data['productTypeList'];
    if (Array.isArray(dataReturn)) {
      this.productTypeList = dataReturn;
    } else {
      this.message = dataReturn.toString();
    }
    // this.productTypeService.getProductTypes(false).subscribe( productTypes => {
    //   this.productTypeList = productTypes;
    // });
  }

  toggleAddForm() {
    this.currentIdEdit = this.currentIdEdit === -1 ? null : -1;
  }

  closeAction() {
    if (this.currentIdEdit && this.currentIdEdit !== -1) {
      Object.assign(this.productTypeList.find(x => x.id === this.currentIdEdit), this.productTypeToEditClone);
      this.productTypeToEditClone = null;
    }
    this.currentIdEdit = null;
  }

  getProductTypeName(productTypeId: number) {
    const p = this.productTypeList.find(x => x.id === productTypeId);
    return p ? p.name : '' ;
  }

  getProductTypeList(id: number) {
    return this.productTypeList.filter(x => x.id !== id && x.product_type_id === null);
  }

  addProductType(productType: ProductType) {
    console.log('add productType');
    this.productTypeService.saveProductType(productType).subscribe( p => {
      // productType.id = p.id;
      this.productTypeService.getProductTypes().subscribe(productTypes => {
        this.productTypeList = productTypes;
        this.changeSearch('');
      });
    });
    this.productTypeToAdd = new ProductType();
    this.currentIdEdit = null;
  }

  changeSearch(searchStr: string) {
    this.searchString = searchStr;
    if (this.searchString && this.searchString.trim().length > 0) {
      this.message = `Search Results for \"${searchStr}\"` ;
    } else {
      this.message = null;
    }
  }

  searchProducts() {
    this.productTypeService.getProductTypeByName(this.searchString).subscribe(productTypes => {
      this.productTypeList = productTypes;
    });
  }

  handleClick(productType: ProductType) {
    this.currentIdEdit = this.currentIdEdit === productType.id ? null : productType.id;
    if (this.currentIdEdit) {
      this.productTypeToEditClone = Object.assign({}, productType);
    } else {
      console.log('edit productType');
      this.productTypeService.editProductType(productType).subscribe( p => {
      });
    }
  }

  showImageModal(src) {
    this.showImage = !this.showImage;
    this.currentSrcImage = src;
  }
}

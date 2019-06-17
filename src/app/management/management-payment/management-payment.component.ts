import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginComponent } from '../../core/login/login.component';
import { Customer } from '../../model/Customer';
import { CommonService } from '../../services/common.service';
import { IItem } from '../../model/IItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-management-payment',
  templateUrl: './management-payment.component.html',
  styleUrls: ['./management-payment.component.css']
})
export class ManagementPaymentComponent implements OnInit, OnDestroy {
  step: number;
  currentUser: Object;
  customer = new Customer();
  customerForm: FormGroup;
  items: IItem[];
  isShowItem = false;
  total: number;
  btnText = 'SUBMIT ORDER';
  isOrdering = false;
  totalSubcrition: Subscription;
  itemsSubcrition: Subscription;
  constructor(private data: DataService, private commonService: CommonService) { }

  ngOnDestroy(): void {
    this.data.changeIsCheckingout(false);
  }
  ngOnInit() {
    this.customerForm = new FormGroup({
      email: new FormControl(this.customer.email, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(this.customer.phone, [
        Validators.required,
        Validators.pattern('^[0-9]{10,11}$')
      ]),
      lastname: new FormControl(this.customer.lastname, [
      ]),
      firstname: new FormControl(this.customer.firstname, [
      ]),
      address: new FormControl(this.customer.address, [
      ]),
    });

    this.data.changeIsCheckingout(true);
    this.data.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.customerForm.get('email').setValue(user['email']);
        this.customerForm.get('firstname').setValue(user['firstname']);
        this.customerForm.get('lastname').setValue(user['lastname']);
        this.customerForm.controls['email'].updateValueAndValidity();
        this.customerForm.controls['firstname'].updateValueAndValidity();
        this.customerForm.controls['lastname'].updateValueAndValidity();
      } else {
        this.customerForm.get('email').setValue('');
        this.customerForm.get('firstname').setValue('');
        this.customerForm.get('lastname').setValue('');
        this.customerForm.controls['lastname'].updateValueAndValidity();
        this.customerForm.controls['firstname'].updateValueAndValidity();
        this.customerForm.controls['email'].updateValueAndValidity();
      }
    });
    this.step = 1;
    this.data.changeTitle('Checkout');
    this.itemsSubcrition = this.data.currentItems.subscribe(items => {
      console.log('item changing');
      this.items = items;
    });
    this.totalSubcrition = this.data.currentTotal.subscribe( total => {
      console.log('total changing');
      this.total = total;
    });
  }

  get email() { return this.customerForm.get('email'); }
  get phone() { return this.customerForm.get('phone'); }
  get firstname() { return this.customerForm.get('firstname'); }
  get lastname() { return this.customerForm.get('lastname'); }
  get address() { return this.customerForm.get('address'); }

  changeStep(step: number) {
    this.step = step;
    if (this.step === 2) {
      this.customerForm.get('firstname').setValidators([
        Validators.required
      ]);
      this.customerForm.get('lastname').setValidators([
        Validators.required
      ]);
      this.customerForm.get('address').setValidators([
        Validators.required,
        Validators.minLength(10)
      ]);
      this.customerForm.controls['firstname'].updateValueAndValidity();
      this.customerForm.controls['lastname'].updateValueAndValidity();
      this.customerForm.controls['address'].updateValueAndValidity();
    } else {
      this.customerForm.get('firstname').clearValidators();
      this.customerForm.get('lastname').clearValidators();
      this.customerForm.get('address').clearValidators();
      this.customerForm.controls['firstname'].updateValueAndValidity();
      this.customerForm.controls['lastname'].updateValueAndValidity();
      this.customerForm.controls['address'].updateValueAndValidity();
    }
  }

  submit(customerForm: FormGroup) {
    this.step = 4;
    this.customer = customerForm.value;
    this.customer.items = this.items;
    this.customer = Object.assign({}, this.customer);
    this.totalSubcrition.unsubscribe();
    this.items = JSON.parse(localStorage.getItem('items'));
    // this.itemsSubcrition.unsubscribe();
    this.btnText = 'Processing...';
    setTimeout(() => {
      this.commonService.checkout(this.customer).subscribe(data => {
        this.step = 5;
      });
    }, 3000);
  }

  changeTabIndex(index: number) {
    this.data.changeTabIndexSource(index);
  }

  toggleItems() {
    this.isShowItem = !this.isShowItem;
  }

  getQuantityTotal() {
    return this.items.map(item => item.quantity).reduce((total, value) =>  total + value, 0);
  }

  getItemInfo(...infos) {
    return infos.filter(info => info).join(', ');
  }
}

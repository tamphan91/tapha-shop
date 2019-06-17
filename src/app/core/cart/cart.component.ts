import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { IItem } from '../../model/IItem';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: IItem[];
  total: number;
  isCheckingout: boolean;
  constructor(private data: DataService, private router: Router) {
  }
  ngOnInit() {

    this.data.currentIsCheckout.subscribe(isCheckingout => {
      this.isCheckingout = isCheckingout;
    });
    this.data.currentItems.subscribe(items => {
      this.items = items;
    });
    this.data.currentTotal.subscribe( total => {
      this.total = total;
    });
    $(document).ready(() => {
      const modal = $('#id01');
      $(window).click(e => {
        if ( e.target === modal[0]) {
          modal.css('display', 'none');
        }
      });
    });
  }

  removeItem(itemId: number) {
    this.items.splice(itemId, 1);
    this.data.updateLocalStorage();
    this.data.updateTotal();
  }

  updateCart() {
    this.data.updateLocalStorage();
    this.data.updateTotal();
  }

  changeTitle(title: string) {
    this.data.changeTitle(title);
  }
}

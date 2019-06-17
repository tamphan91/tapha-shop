import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  showMySidebar = false;
  email: string;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('currentUser'))['email'];
  }

  changeTitle(title: string) {
    this.data.changeTitle(title);
  }

  activeIsExpand(name: string) {
    this.data.changeExpandName(name);
  }


  toggleMySidebar() {
    this.showMySidebar = !this.showMySidebar;
  }
}

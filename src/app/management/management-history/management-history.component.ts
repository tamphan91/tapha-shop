import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-management-history',
  templateUrl: './management-history.component.html',
  styleUrls: ['./management-history.component.css']
})
export class ManagementHistoryComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.data.changeExpandName(user['firstname']);
    this.data.changeTitle('History');
  }

}

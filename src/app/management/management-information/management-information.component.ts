import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-management-information',
  templateUrl: './management-information.component.html',
  styleUrls: ['./management-information.component.css']
})
export class ManagementInformationComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.data.changeExpandName(user['firstname']);
    this.data.changeTitle('Information');
  }

}

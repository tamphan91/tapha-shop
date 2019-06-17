import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logo = environment.logo;
  emailToSubscribe: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  isSubcribing = false;
  btnText = 'Subscribe';
  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  subscribe() {
    this.isSubcribing = true;
    const emailToSend = this.emailToSubscribe;
    this.emailToSubscribe = 'THANK YOU FOR YOUR SUBSCRIBING!';
    this.btnText = 'Subscribing...';
  }

  send() {
  }
}

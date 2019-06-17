import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() logo: string;
  @Output() valueChange = new EventEmitter();
  @Input() tabIndex;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  errorMessage: string;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    $(document).ready(() => {
      const modal2 = $('#id02');
      $(window).click(e => {
        if (e.target === modal2[0] ) {
          modal2.css('display', 'none');
        }
      });
    });
  }

  changeTabIndex(index: number) {
    this.email = '';
    this.password = '';
    this.firstname = '';
    this.lastname = '';
    this.errorMessage = '';
    this.tabIndex = index;
  }

  submit(user: NgForm) {
    if (this.tabIndex === 1) {
      // login
      this.authenticationService.login(user.value['email'], user.value['psw']).subscribe( data => {
        if (data instanceof Object) {
          this.login(data);
        } else {
          this.errorMessage = 'email or password is incorrect';
        }
      });
    } else {
      // register
      this.authenticationService.register(user.value['email'], user.value['psw'],
       user.value['firstname'], user.value['lastname']).subscribe( data => {
        if (data instanceof Object) {
          this.login(data);
        } else {
          this.errorMessage = 'email or password is incorrect';
        }
      });
    }
  }

  login(user) {
    $('#id02').css('display', 'none');
    const firstname = user.firstname;
    this.valueChange.emit({firstname: firstname, isLogin: true});
    this.errorMessage = '';
  }

  logOut() {
    this.authenticationService.logout();
    this.email = '';
    this.password = '';
    this.valueChange.emit({firstname: '', isLogin: false});
  }
}

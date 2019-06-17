import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { DataService } from './services/data.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HOME';
  showLoadingIndicator;
  cEN: string;
  constructor(private _router: Router, private data: DataService) {
    this.data.currentShowLoadingIndicator.subscribe( isShow => {
      this.showLoadingIndicator = isShow;
    });
    this.data.currentExpandName.subscribe(cEN => {
      this.cEN = cEN;
    });
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.data.changeShowLoadingIndicator(true);
      }

      if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
          const newURL = routerEvent.url;
        console.log('end');
        this.data.changeUrl(newURL.includes('#') ? newURL.substring(0, newURL.indexOf('#')) : newURL);
        this.data.changeShowLoadingIndicator(false);
      }
    });
  }
}

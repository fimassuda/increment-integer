import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { IncrementApiService } from '../shared/increment-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {

  currentValue: number;

  constructor(private iiapiService: IncrementApiService, private loginService: LoginService) {
    this.init();
  }

  current() {
    this.iiapiService.getCurrent(this.loginService.accessToken).subscribe(
      (data) => {
        console.log('current:', data.value);
        this.currentValue = data.value;
      }, (err) => {
        console.error('Error');
      }
    );
  }

  next() {
    this.iiapiService.getNext(this.loginService.accessToken).subscribe(
      (data) => {
        console.log('current:', data.value);
        this.currentValue = data.value;
      }, (err) => {
        console.error('Error');
      }
    );
  }

  resetCurrent(newInteger) {
    this.iiapiService.resetCurrent(this.loginService.accessToken, parseInt(newInteger)).subscribe(
      () => {
        // console.log('current:', data.value);
        this.init();
      }, (err) => {
        console.error('Error');
      }
    );
  }

  init() {
    this.iiapiService.getCurrent(this.loginService.accessToken).subscribe(
      (data) => {
        console.log('current:', data.value);
        this.currentValue = data.value;
      }, (err) => {
        console.error('Error');
      }
    );
  }

}

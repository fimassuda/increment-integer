import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class IncrementApiService {

  apiEndpoint: string;

  constructor(private http: Http) {
    this.apiEndpoint = environment.apiEndpoint;
  }

  auth(email: string, password: string) {
    return this.http.post(this.apiEndpoint + '/auth', {
      email: email,
      password: password
    }).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

  getNext(token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.apiEndpoint + '/next', {
      headers: headers
    }).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

  getCurrent(token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.apiEndpoint + '/current', {
      headers: headers
    }).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

  resetCurrent(token: string, newValue: number) {
    console.log(newValue);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.put(this.apiEndpoint + '/current', {
        current: newValue
      }, {
      headers: headers
    }).map((res: Response) => {
      console.log(res.json());
      return res.json();
    });
  }

}

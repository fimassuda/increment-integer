import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { IncrementApiService } from './increment-api.service';

@Injectable()
export class LoginService implements CanActivate  {

  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private iiapiService: IncrementApiService) {
  }

  accessToken: string;

  canActivate() {
    if (!this.isAuthenticated) {
      this.router.navigate(['']);
    }
    return this.isAuthenticated;
  }

  authenticate(email: string, password: string) {
    return this.iiapiService.auth(email, password);
  }

  login(token: string) {
    console.log('login: ', token);
    this.isAuthenticated = true;
    this.accessToken = token;
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
  }

}

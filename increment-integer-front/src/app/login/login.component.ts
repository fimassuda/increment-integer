import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: Login;
  message: string;

  constructor(private router: Router,
    private loginService: LoginService) {
    this.model = new Login('', '');
  }

  login() {

    let email = this.model.email;
    let password = this.model.password;

    console.log('email', this.model.email);
    console.log('password', this.model.password);
    if (email != '' && password != '') {
      this.loginService.authenticate(email, password).subscribe(
        login => {
          this.loginService.login(login.access_token);
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.loginService.logout();
          this.message = 'Authentication Failed!';
        }
      );
    } else {
      if (email == '' || email == undefined) {
        this.message = 'Email is required';
      } else {
        this.message = 'Password is required';
      }
    }
  }


}

class Login {
  constructor(public email: string, public password: string) {
  }
}

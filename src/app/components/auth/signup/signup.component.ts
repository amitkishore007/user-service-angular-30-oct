import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const user = {
      first_name: this.signupForm.value.first_name,
      last_name : this.signupForm.value.last_name,
      email     : this.signupForm.value.email,
      password  : this.signupForm.value.password,
      phone     : this.signupForm.value.phone
    };

    this.authService.signup(user);
    this.authService.isAuth()
        .subscribe((authenticated) => {
          console.log('signup sub');
          this.router.navigate(['/']);
        });
  }
}

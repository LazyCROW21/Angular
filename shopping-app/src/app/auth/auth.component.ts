import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMsg: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.errorMsg = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({
        email, password
      }));
      // authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        authForm.reset();
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.errorMsg = errorMessage;
        console.error(errorMessage);
        this.isLoading = false;
        authForm.reset();
      },
      complete: () => {
        this.isLoading = false;
        authForm.reset();
      }
    });
  }
}

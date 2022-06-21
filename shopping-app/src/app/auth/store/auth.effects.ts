import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth.service";
import * as AuthActions from './auth.action';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    private loginUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(this.loginUrl, {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }).pipe(
                map(resData => {
                    const expDate = new Date().getTime() + ((+resData.expiresIn) * 1000);
                    return new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: new Date(expDate)
                    });
                }),
                catchError(errorRes => {
                    let errorMessage = 'An unknown error occurred!';
                    if (errorRes.error && !errorRes.error.error) {
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'This email is already registered';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'Invalid username / password';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'Invalid username / password';
                                break;
                        }
                    }
                    return of(new AuthActions.LoginFail(errorMessage));
                })
            )
        }),
    )

    @Effect({
        dispatch: false
    })
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) { }
}
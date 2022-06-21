import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import { AppState } from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as AuthActions from './store/auth.action'

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // user = new BehaviorSubject<User>(null);
    tokenExpirationTime: any;

    private loginUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;

    private signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<AppState>
    ) { }

    signup(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.signUpURL, { email, password, returnSecureToken: true })
            .pipe(catchError(this.handleErrorMessage), tap(this.setUser.bind(this)));
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.loginUrl, { email, password, returnSecureToken: true })
            .pipe(catchError(this.handleErrorMessage), tap(this.setUser.bind(this)));
    }

    logout() {
        clearTimeout(this.tokenExpirationTime);
        // this.user.next(null);
        this.store.dispatch(new AuthActions.Logout());
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.logout()
        }, expirationDuration);
    }

    private handleErrorMessage(errorRes: any) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => {
                return new Error(errorMessage);
            });
        }
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
        return throwError(() => {
            return new Error(errorMessage);
        });
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.Login({
                email: userData.email,
                userId: userData.id,
                token: userData._token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }));
            this.autoLogout(expDuration);
        }
    }

    setUser(resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + ((+resData.expiresIn) * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        // this.user.next(user);
        this.store.dispatch(new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationDate
        }));
        this.autoLogout((+resData.expiresIn) * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
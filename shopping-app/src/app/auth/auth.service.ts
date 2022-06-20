import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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
    user = new BehaviorSubject<User>(null);

    private loginUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVs1gBxNKL7qzVoZyrQlGaxMnCBtVpm5s';

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVs1gBxNKL7qzVoZyrQlGaxMnCBtVpm5s';

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.signUpURL, { email, password, returnSecureToken: true })
            .pipe(catchError(this.handleErrorMessage), tap(this.setUser));
    }

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.loginUrl, { email, password, returnSecureToken: true })
            .pipe(catchError(this.handleErrorMessage), tap(this.setUser.bind(this)));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleErrorMessage(errorRes: any) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorRes.error || !errorRes.error.error) {
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

    setUser(resData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + ((+resData.expiresIn) * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.user.next(user);
    }
}
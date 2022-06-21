import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}

const initState: State = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: State = initState, action: AuthActions.AuthActions): State {
    switch(action.type) {
        case AuthActions.LOGIN:
            const data = (<AuthActions.Login>action).payload;
            const user = new User(
                data.email,
                data.userId,
                data.token,
                data.expirationDate,
            );
            return {
                ...state,
                authError: null,
                user,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                authError: null,
                loading: false
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: (<AuthActions.LoginFail>action).payload,
                loading: false
            }
        default:
    }
}
import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
    user: User;
}

const initState = {
    user: null
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
                user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
    }
}
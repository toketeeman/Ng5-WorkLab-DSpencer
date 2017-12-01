import { Action } from '@ngrx/store';

// Action type identifiers.
export const TRY_SIGNUP = 'TRY_SIGNUP';    // Does not have a reducer, used instead as an (side-) effect.  
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {      // An effects action.
  readonly type = TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {         // A reducer action.
  readonly type = SIGNUP;
}

export class Signin implements Action {         // A reducer action.
  readonly type = SIGNIN;
}

export class Logout implements Action {         // A reducer action.
  readonly type = LOGOUT;
}

export class SetToken implements Action {         // A reducer action.
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = 
              Signup | 
              Signin | 
              Logout | 
              SetToken | 
              TrySignup;
              
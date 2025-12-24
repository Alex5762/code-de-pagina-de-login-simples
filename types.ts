export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ViewMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}
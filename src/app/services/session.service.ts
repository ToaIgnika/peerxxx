// Angular modules
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// App
import { ApiurlService } from '../services/apiurl.service';
import { ApplicationRole } from './models/application-role.enum';
import { LoginModel } from './models/login-model';
import { LoginSuccessModel } from './models/login-success-model';
import { RegisterModel } from './models/register-model';
import { TokenPayloadModel } from './models/token-payload-model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private static readonly TOKEN_NAME = 'id_token';
  private static readonly LOGIN_SUCCESS_MSG = 'login success';
  private static readonly REGISTER_SUCCESS_MSG = 'registration success';
  private token: TokenPayloadModel; // decoded token
  private authenticated: boolean; // current user's authentication status

  constructor(private http: HttpClient, private ApiUrl: ApiurlService) {}

  /**
   * Authenticate a user against the server.
   *
   * @param loginModel a user to be authenticated
   * @param remember whether or not to remember the user during their next visit
   *
   * @returns an `Observable` with a message upon success.
   */
  login(loginModel: LoginModel, remember: boolean): Observable<string> {
    return this.http
      .post(this.ApiUrl.loginUrl, loginModel, {
        observe: 'response'
      })
      .pipe(
        tap(res => {
          // store the token
          this.storeToken(res.body as LoginSuccessModel, remember);
        }),
        // pass back a success message
        map(res => SessionService.LOGIN_SUCCESS_MSG),
        // handle error
        catchError(this.handleError)
      );
  }

  /**
   * Log the current user out.
   */
  logout(): void {
    sessionStorage.removeItem(SessionService.TOKEN_NAME);
    localStorage.removeItem(SessionService.TOKEN_NAME);
    this.authenticated = false;
  }

  /**
   * Register a user in the application
   *
   * @param user a user to be registered
   * @param role the application role to be registered as
   *
   * @returns an `Observable` with a message upon success.
   */
  register(user: RegisterModel, role: ApplicationRole): Observable<string> {
    const url = this.getRegistrationUrlGivenRole(role);
    return this.http
      .post(url, user, {
        observe: 'response'
      })
      .pipe(
        // pass back a success message
        map(res => SessionService.REGISTER_SUCCESS_MSG),
        // handle error
        catchError(this.handleError)
      );
  }

  /**
   * Check if the current user is authenticated.
   *
   * @returns the current user's authentication status
   */
  isAuthenticated(): boolean {
    if (this.authenticated) {
      // user is authenticated
      return true;
    }

    // not authenticated (user potentially refreshed the browser)
    // attempt to retrieve stored token
    const rawToken = this.getRawToken();

    if (rawToken) {
      // jwt token
      const decodedToken = this.decodeToken(rawToken);

      if (this.tokenIsExpired(decodedToken)) {
        // token is expired
        return false;
      } else {
        // token is not expired
        return true;
      }
    } else {
      // no jwt token found
      return false;
    }
  }

  /**
   * Check if the current user is in the specified role.
   *
   * @param roleName the name of the role to check
   *
   * @returns whether ir not the user is in the specified role
   */
  isInRole(roleName: ApplicationRole): boolean {
    if (this.isAuthenticated()) {
      // user is authenticated (valid token found)

      // get the parsed token
      const token = this.decodeToken(this.getRawToken());

      if (token.roles.includes(roleName)) {
        // user is in the specified role
        return true;
      } else {
        // user is not in the specified role
        return false;
      }
    } else {
      // user is not authenticated
      return false;
    }
  }

  /**
   * Get the current user's username
   *
   * @returns the the current user's username or null if not authenticated
   */
  getUsername(): string | null {
    if (this.isAuthenticated()) {
      // user is authenticated (valid token found)

      // get the decoded token
      const token = this.decodeToken(this.getRawToken());

      // return the token subject
      return token.sub;
    } else {
      // user is not authenticated
      return null;
    }
  }

  /**
   * Get the current user's uid
   *
   * @returns the the current user's uid or null if not authenticated
   */
  getUserId(): string | null {
    if (this.isAuthenticated()) {
      // user is authenticated (valid token found)

      // get the decoded token
      const token = this.decodeToken(this.getRawToken());

      // return the token subject
      return token.uid;
    } else {
      // user is not authenticated
      return null;
    }
  }

  getToken(): TokenPayloadModel {
    if (this.isAuthenticated()) {
      // user is authenticated (valid token found)
      return this.token;
    } else {
      // user is not authenticated
      return null;
    }
  }

  /**
   * Get the registration url for the specified role
   *
   * @param role the application role name to get the endpoint for
   *
   * @returns the the registration url for the specified application role
   */
  private getRegistrationUrlGivenRole(role: ApplicationRole): string {
    switch (role) {
      case ApplicationRole.Student:
        return this.ApiUrl.registerStudentUrl;

      case ApplicationRole.Teacher:
        return this.ApiUrl.registerTeacherUrl;

      default:
        return this.ApiUrl.registerStudentUrl;
    }
  }

  /**
   * Retrieve a raw jwt token from the browser.
   *
   * @returns a raw jwt token or null if no jwt token is found
   */
  private getRawToken(): string | null {
    const sessionStorageToken = sessionStorage.getItem(
      SessionService.TOKEN_NAME
    );
    const localStorageToken = localStorage.getItem(SessionService.TOKEN_NAME);

    // attempt to get token from session storage first
    if (sessionStorageToken) {
      // validate token format
      if (this.tokenIsJwtFormat(sessionStorageToken)) {
        // return raw token
        return sessionStorageToken;
      }
    }

    // attempt to get token from local storage
    if (localStorageToken) {
      // validate token format
      if (this.tokenIsJwtFormat(localStorageToken)) {
        // return raw token
        return localStorageToken;
      }
    }

    // no jwt token found
    return null;
  }

  /**
   * Check if the raw token is a jwt token.
   *
   * @param rawToken the raw token to validate
   *
   * @returns whether or not the token is a jwt token
   */
  private tokenIsJwtFormat(rawToken: string): boolean {
    if (!rawToken) {
      // no token
      return false;
    } else if (!rawToken.length) {
      // token is empty
      return false;
    } else if (rawToken.split('.').length !== 3) {
      // invalid jwt token format
      return false;
    } else {
      // valid token
      return true;
    }
  }

  /**
   * Check if the decoded token has expired.
   *
   * @param decodedToken the decoded token to check
   *
   * @returns whether or not the token is expired
   */
  private tokenIsExpired(decodedToken: TokenPayloadModel): boolean {
    const now = new Date(); // local date
    const nowInMilli = now.getTime(); // local date in milliseconds
    const expInMilli = decodedToken.exp.getTime(); // token expiration in milliseconds
    const timeDifference = expInMilli - nowInMilli; // token expiration - now

    if (timeDifference < 0) {
      // token has expired
      return true;
    } else {
      // token is valid
      return false;
    }
  }

  /**
   * Decode the raw jwt token.
   * This method assumes a valid jwt token and should only
   * be called after calling the `tokenIsJwtFormat()` method
   *
   * @param rawToken the raw jwt token to decode
   *
   * @returns a `TokenPayloadModel` object
   */
  private decodeToken(rawToken: string): TokenPayloadModel {
    // decode token payload
    const payloadBase64Url = rawToken.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64Url));

    // token expiration
    const exp = new Date(0); // begining of UTC converted to local timezone
    const payloadExpInSec = payload.exp; // parsed token expiration in seconds
    exp.setUTCSeconds(payloadExpInSec); // add number of seconds to expiration

    // user roles
    let roles: ApplicationRole[];
    const userRoles = payload.roles;

    if (Array.isArray(userRoles)) {
      roles = userRoles;
    } else {
      roles = [userRoles];
    }

    const sub = payload.sub; // subject
    const uid = payload.uid; // uid
    const iss = payload.iss; // issuer
    const aud = payload.aud; // audience

    // create the token model
    const tokenModel = {
      sub: sub,
      roles: roles,
      uid: uid,
      exp: exp,
      iss: iss,
      aud: aud
    } as TokenPayloadModel;

    this.authenticated = true; // set authentication status
    this.token = tokenModel; // update in-memory token

    return tokenModel;
  }

  /**
   * Store the raw token upon successful authentication
   *
   * @param responseBody the body of the http response from the `login()` method
   * @param remember wether or not to remember the user during their next visit
   */
  private storeToken(responseBody: LoginSuccessModel, remember: boolean): void {
    if (remember) {
      localStorage.setItem(SessionService.TOKEN_NAME, responseBody.token); // keep token after user closes the browser tab
      sessionStorage.removeItem(SessionService.TOKEN_NAME); // remove any previously stored session token
    } else {
      sessionStorage.setItem(SessionService.TOKEN_NAME, responseBody.token); // remove when user closes the browser tab
      localStorage.removeItem(SessionService.TOKEN_NAME); // remove any previously stored local storage token
    }

    this.authenticated = true; // set authentication status
    this.token = this.decodeToken(responseBody.token); // store token in memory
  }

  /**
   * Handle an error from the `login()` method and format a custom error message
   *
   * @param error the error from the `login()` method
   *
   * @returns an error of of type `Observabe<never>` with a message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`${error.statusText}`);
      msg = error.statusText;
    }
    // return an observable with a user-facing error message
    return throwError(msg);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import 'bootstrap-select';
import * as $ from 'jquery';

@Injectable()
export class AuthService {
  // Avoid name not found warnings
  Auth0Lock: any;

  options = {
    auth: {
      redirect: false,
      responseType: "token id_token",
      params: {
        audience: '{API_IDENTIFIER}',
        scope: 'openid profile'
      }
     },
    autoclose: true
  };

  // Configure Auth0
  lock = new Auth0Lock('{CLIENT_ID}', '{DOMAIN}', this.options);

  constructor(private router:Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult:any) => {
      console.log(JSON.stringify(authResult));
      this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
          if(error){
              throw new Error(error);
          }
          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('access_token', authResult.accessToken);
          localStorage.setItem('profile', JSON.stringify(profile));

          // Render bootstrap-select
          setTimeout(function(){
            $('.selectpicker').selectpicker('render');
          }, 200);
      });

      this.router.navigate(['/home']);

    });

  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  };
}
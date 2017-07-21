import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService, private router: Router){

    }
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.authenticated()){
            return true;
        } else {
            console.log('Auth Error - Please login!');
            return false;
        }
    }
}
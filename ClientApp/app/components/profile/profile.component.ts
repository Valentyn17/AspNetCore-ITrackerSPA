import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    profile: any;
    constructor(public auth:AuthService){
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
}

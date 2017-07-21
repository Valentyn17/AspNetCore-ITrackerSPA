import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private auth: AuthService){

    }

    ngOnInit(): void {
    }
}

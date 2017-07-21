import { SharedService } from './../../app.service.shared';
import { ProjectService } from './../projects/shared/project.service';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public auth:AuthService,
        private router:Router,
        private projectService: ProjectService, 
        private sharedService: SharedService) {
            this.initializeProjects();
    }

    // Used for nav-menu dropdown
    initializeProjects() {
        if (this.auth.authenticated()) {
            this.projectService.getProjects().subscribe(
                data => this.sharedService.update(data),
                error => console.log('Error -> AppComponent: Couldn\'t Initialize Projects.')
            );
        }
    }
}
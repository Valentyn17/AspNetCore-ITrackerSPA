import { Observable } from 'rxjs/Observable';
import { SharedService } from './../../app.service.shared';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectService } from './../projects/shared/project.service';
import { IProject } from './../projects/shared/project';
import { Http } from '@angular/http';
import { AuthService } from './../../auth/auth.service';
import { Component, Inject, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ProjectListComponent } from './../projects/project-list/project-list.component';
import { Subscription } from "rxjs/Subscription";
import * as $ from 'jquery';
import 'bootstrap-select';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})

export class NavMenuComponent implements OnInit, OnDestroy {
    projects: IProject[];
    errorMessage: string;
    subscription: Subscription;
    
    constructor(private auth: AuthService, 
        private projectService: ProjectService,
        private sharedService: SharedService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.sharedService.projectsUpdate.subscribe(
            data => {
                this.projects = data;
                setTimeout(() => {
                        $('.selectpicker').selectpicker('refresh');
                }, 150);
            },
            error => { }
        );
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        setTimeout(
        function() 
        {
            $('.selectpicker').selectpicker('refresh');
        }, 200);
    }

    navigateTo(value){
        if (value == -1) {
            this.sharedService.setCurrentProject(null);
            this.router.navigate(['/issues']);
        }
        else {
            let currentProject = this.projects.filter(p => p.projectId == value)[0];
            this.sharedService.setCurrentProject(currentProject);
            this.router.navigate(['/projects/' + this.sharedService.getCurrentProject().projectId + '/issues']);
        }
    }

    getRouterLink(): string {
        if (this.sharedService.getCurrentProject() != null){
            return '/projects/' + this.sharedService.getCurrentProject().projectId + '/issues';
        } else {
            return '/issues';
        }
    }
}
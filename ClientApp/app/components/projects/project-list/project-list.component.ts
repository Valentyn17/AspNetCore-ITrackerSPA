import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../shared/project.service';
import { Router } from '@angular/router';
import { SharedService } from './../../../app.service.shared';
import { IProject } from './../shared/project';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-select';

@Component({
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit {
    errorMessage: string;
    projects: IProject[];
    subscription: Subscription;

    constructor(private projectService: ProjectService,
        private sharedService: SharedService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.projectService.getProjects().subscribe(
            data => 
            {
                this.projects = data;
                // Publish project list
                this.sharedService.update(this.projects);
            },
            error => this.errorMessage = <any>error
        );
    }

    updateProject(project: IProject): void {
        this.sharedService.setCurrentProject(project);
    }

    deleteProject(project: IProject): void {
        if(confirm("Are you sure you want to delete this project?")) {
            this.projectService.deleteProject(project.projectId).subscribe(
                data => {
                    if (data.statusCode === 200){
                        var index = this.projects.indexOf(project);
                        if (index > -1)
                            this.projects.splice(index, 1);

                        this.sharedService.update(this.projects);
                    }
                    else {
                        this.errorMessage = "Invalid Request";
                    }
                },
                err => {
                    this.errorMessage = err;
                }
            );
        }
    }
}
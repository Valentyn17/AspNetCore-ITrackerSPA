import { SharedService } from './../../../app.service.shared';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from './../shared/project.service';
import { IProject } from './../shared/project';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {
    project: IProject = { projectId:-1, name: "", url: "", description: "", createdAt: "" };
    projectId: number;
    errorMessage: string;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private projectService: ProjectService,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.projectId = +this.activatedRoute.snapshot.params['id'];

        if (this.projectId >= 0) {
            this.projectService.getProject(this.projectId)
                .subscribe(project => this.project = project, error => this.errorMessage = <any>error);
        }
    }

    onSubmit(form: NgForm) {
        if (this.projectId >= 0) {
            this.projectService.updateProject(this.project).subscribe(
                data =>{
                    if (data.statusCode === 200)
                        this.router.navigate(['/projects']);
                    else {
                        this.errorMessage = "Invalid Request";
                    }
                },
                error => this.errorMessage = error
            );
        }
        else {
            this.projectService.createProject(this.project).subscribe(
                data => {
                    if (data.statusCode === 200)
                        this.router.navigate(['/projects']);
                    else {
                        this.errorMessage = "Invalid Request";
                    }
                },
                error => this.errorMessage = error
            );
        }
    }
}
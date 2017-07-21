import { ProjectService } from './../../projects/shared/project.service';
import { IProject } from './../../projects/shared/project';
import { NgForm } from '@angular/forms';
import { IssueService } from './../shared/issues.service';
import { SharedService } from './../../../app.service.shared';
import { IIssue } from './../shared/issue';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component, Inject, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-select';

@Component({
    templateUrl: './issue-create.component.html',
    styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {
    issue: IIssue;
    projects: IProject[];
    errorMessage: string;

    fileToUpload: any;

    constructor(private issueService: IssueService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService,
        private projectService: ProjectService) {
    }

    ngOnInit(): void {
        // Default - empty issue
        this.issue = {
            issueId: -1,
            title: "",
            description: "",
            issueType: 0,
            priority:1,
            statusType:0,
            createdAt:"",
            updatedAt:"",
            creator:""
        };

        this.projects = this.sharedService.projects;
    }

    onSubmit(form: NgForm) {
        // Not the best thing to do this client-side but ok...
        let nickname = JSON.parse(localStorage.getItem('profile')).nickname;
        this.issue.creator = (nickname === undefined) ? 'Unknown' : nickname;

        // Any file to upload?
        this.issueService.createIssue(this.issue).subscribe(
            data => {
                if (data.issueId > -1) {
                    this.uploadFile(data.issueId);
                }
                else
                    this.errorMessage = "Invalid Request. Check your values!";
            },
            error => {
                this.errorMessage = error;
            }
        );
    }

    uploadFile(issueId: any) {
        if (this.fileToUpload != null) {
            this.issueService.uploadFile(issueId, this.fileToUpload).subscribe(
                data => {
                    console.log('File uploaded!');
                },
                error => {
                    console.error('File not uploaded!');
                },
                () => {
                    this.router.navigate(['/issues']);
                }
            );
        }
        else {
            this.router.navigate(['/issues']);
        }
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.fileToUpload = fileList[0];
        }
    }
}
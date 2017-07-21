import { SharedService } from './../../../app.service.shared';
import { IssueService } from './../shared/issues.service';
import { IIssue } from './../shared/issue';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Component, Inject, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-select';

@Component({
    templateUrl: './issue-list.component.html',
    styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
    issues: IIssue[];
    errorMessage: string;

    constructor(private issueService: IssueService,
        private activatedRoute: ActivatedRoute, 
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        $('.selectpicker').selectpicker('refresh');
        // subscribe to router event
        this.activatedRoute.params.subscribe((params: Params) => {
            let projectId = params['id'];
            if (projectId > -1)
                this.issueService.getIssuesOfProject(projectId)
                    .subscribe(issues => this.issues = issues, error => this.errorMessage = <any>error);
            else
                this.issueService.getIssues()
                    .subscribe(issues => this.issues = issues, error => this.errorMessage = <any>error);
        });
    }

    deleteIssue(issue: IIssue): void {
        if(confirm("Are you sure you want to delete this issue?")) {
            this.issueService.deleteIssue(issue.issueId).subscribe(
                data => {
                    if (data.statusCode === 200){
                        var index = this.issues.indexOf(issue);
                        if (index > -1) {
                            this.issues.splice(index, 1);
                        }
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

    priorityToClass(priority: number) {
        switch (priority) {
            case 0:
                return 'glyphicon glyphicon-arrow-down priority-low';
            case 2:
                return 'glyphicon glyphicon-arrow-up priority-high';
            default:
                return 'glyphicon glyphicon-arrow-up priority-normal';
        }
    }

    priorityToText(priority: number) {
        switch (priority) {
            case 0:
                return 'Low';
            case 2:
                return 'High';
            default:
                return 'Normal';
        }
    }

    statusTypeToClass(statusType: number) {
        switch(statusType) {
            case 0:
                return 'label label-primary';
            case 1:
                return 'label label-warning';
            case 2:
                return 'label label-success';
            case 3:
                return 'label label-primary';
            case 4:
                return 'label label-danger';
            default:
                return 'label label-default';
        }
    }

    statusTypeToText(statusType: number) {
        switch(statusType) {
            case 0:
                return 'Open';
            case 1:
                return 'In Progress';
            case 2:
                return 'Resolved';
            case 3:
                return 'Reopened';
            case 4:
                return 'Closed';
            default:
                return 'Unknown';
        }
    }

    getIssueTypeText(val: number) {
        switch(val) {
            case 0:
                return 'Bug';
            case 1:
                return 'Task';
            case 2:
                return 'Change';
            case 3:
                return 'Enhancement';
            default:
                return 'Unknown';
        }
    }
}
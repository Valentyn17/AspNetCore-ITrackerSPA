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
    templateUrl: './issue-edit.component.html',
    styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
    issue: IIssue;
    errorMessage: string;

    constructor(private issueService: IssueService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        // subscribe to router event
        this.activatedRoute.params.subscribe((params: Params) => {
            let issueId = params['id'];
            if (issueId > -1)
                this.issueService.getSingleIssue(issueId).subscribe(
                    issue => {
                        this.issue = issue;
                    },
                    error => {
                        this.errorMessage = <any> error;
                    }
                );
        });
    }

    onSubmit(form: NgForm) {
        this.issueService.updateIssue(this.issue).subscribe(
            data => {
                if (data.statusCode === 200)
                    this.router.navigate(['/issues']);
                else
                    this.errorMessage = "Invalid Request. Check your values!";
            },
            error => {
                this.errorMessage = error;
            }
        );
    }
}
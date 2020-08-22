import { Component, OnInit } from '@angular/core';
import { Issue } from '../shared/issue';
import { IssueService } from '../shared/issue.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  issue: Issue;
  errorMessage: string;

  constructor(private issueService: IssueService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let issueId = params['id'];
      if (issueId > -1)
        this.issueService.getIssue(issueId).subscribe(result => {
          this.issue = result;
        }, error => this.errorMessage = <any>error);
    });
  }

  onSubmit(form: NgForm) {
    this.issueService.updateIssue(this.issue).subscribe(result => {
      this.router.navigate(['/issues']);
    }, error => this.errorMessage = error);
  }

}

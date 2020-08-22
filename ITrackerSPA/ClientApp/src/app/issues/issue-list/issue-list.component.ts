import { Component, OnInit } from '@angular/core';
import { IssueService } from '../shared/issue.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Issue } from '../shared/issue';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[];
  errorMessage: string;
  filter1 = -1;
  filter2 = -1;
  filter3 = -1;

  constructor(private issueService: IssueService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //jQuery('.selectpicker').selectpicker();
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let projectId = params['id'];
      if (projectId > -1)
        this.issueService.getIssuesByProject(projectId)
          .subscribe(issues => this.issues = issues, error => this.errorMessage = <any>error);
      else
        this.issueService.getIssues()
          .subscribe(issues => this.issues = issues, error => this.errorMessage = <any>error);
    });
  }

  deleteIssue(issue: Issue): void {
    if (confirm("Are you sure you want to delete this issue?")) {
      this.issueService.deleteIssue(issue.issueId).subscribe(result => {
        var index = this.issues.indexOf(issue);
        if (index > -1) {
          this.issues.splice(index, 1);
        }
      }, error => this.errorMessage = <any>error);
    }
  }

  priorityToClass(priority: number) {
    switch (priority) {
      case 0:
        return 'fas fa-arrow-down priority-low';
      case 2:
        return 'fas fa-arrow-up priority-high';
      default:
        return 'fas fa-arrow-up priority-normal';
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
    switch (statusType) {
      case 0:
        return 'badge badge-primary';
      case 1:
        return 'badge badge-warning';
      case 2:
        return 'badge badge-success';
      case 3:
        return 'badge badge-primary';
      case 4:
        return 'badge badge-danger';
      default:
        return 'badge badge-default';
    }
  }

  statusTypeToText(statusType: number) {
    switch (statusType) {
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
    switch (val) {
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

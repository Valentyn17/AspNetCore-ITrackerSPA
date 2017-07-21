import { IssueStatusFilterPipe } from './shared/issue-filterByStatus.pipe';
import { IssuePriorityFilterPipe } from './shared/issue-filterByPriority.pipe';
import { IssueTypeFilterPipe } from './shared/issue-filterByType.pipe';
import { AttachmentGuardService } from './../attachments/shared/attachment-guard.service';
import { AttachmentListComponent } from './../attachments/attachment-list/attachment-list.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueFilterPipe } from './shared/issue-filter.pipe';
import { IssueService } from './shared/issues.service';
import { IssueGuardService } from './shared/issue-guard.service';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './../../auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        IssueListComponent,
        IssueEditComponent,
        IssueCreateComponent,
        IssueFilterPipe,
        IssuePriorityFilterPipe,
        IssueTypeFilterPipe,
        IssueStatusFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'issues',
                canActivate: [AuthGuard],
                component: IssueListComponent
            },
            {
                path: 'projects/:id/issues',
                pathMatch: 'full',
                canActivate: [AuthGuard, IssueGuardService],
                component: IssueListComponent,
            },
            {
                path: 'issues/:id/edit',
                canActivate: [AuthGuard, IssueGuardService],
                component: IssueEditComponent,
            },
            {
                path: 'issues/create',
                canActivate: [AuthGuard],
                component: IssueCreateComponent
            }
        ])
    ],
    providers: [
        IssueService,
        IssueGuardService
    ]
})

export class IssueModule { }
import { FormsModule } from '@angular/forms';
import { ProjectFilterPipe } from './shared/project-filter.pipe';
import { AuthGuard } from './../../auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectGuardService } from './shared/project-guard.service';
import { RouterModule } from '@angular/router';
import { ProjectService } from './shared/project.service';
import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';


@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectEditComponent,
        ProjectFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'projects',
                canActivate: [AuthGuard],
                component: ProjectListComponent
            },
            {
                path: 'projects/:id/edit',
                canActivate: [AuthGuard, ProjectGuardService],
                component: ProjectEditComponent,
            },
            {
                path: 'projects/create',
                canActivate: [AuthGuard],
                component: ProjectEditComponent
            }
        ])
    ],
    providers: [
        ProjectService,
        ProjectGuardService
    ]
})

export class ProjectModule { }
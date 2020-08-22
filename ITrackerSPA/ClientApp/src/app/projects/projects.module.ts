import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFilterPipe } from './shared/project-filter.pipe';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthorizeGuard } from '../../api-authorization/authorize.guard';
import { ProjectGuard } from './shared/project.guard';
import { ProjectService } from './shared/project.service';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectEditComponent,
    ProjectFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'projects',
        canActivate: [AuthorizeGuard],
        component: ProjectListComponent
      },
      {
        path: 'projects/:id/edit',
        canActivate: [AuthorizeGuard, ProjectGuard],
        component: ProjectEditComponent,
      },
      {
        path: 'projects/create',
        canActivate: [AuthorizeGuard],
        component: ProjectEditComponent
      }
    ])
  ],
  providers: [
    ProjectService,
    ProjectGuard
  ]
})
export class ProjectsModule { }

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Router } from '@angular/router';
import { Project } from '../shared/project';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  errorMessage: string;
  projects: Project[];

  constructor(private projectService: ProjectService,
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(result => {
      this.projects = result;
      // Publish project list
      this.sharedService.update(this.projects);
    }, error => this.errorMessage = <any>error);
  }

  updateProject(project: Project): void {
    this.sharedService.setCurrentProject(project);
  }

  deleteProject(project: Project): void {
    if (confirm("Are you sure you want to delete this project?")) {
      this.projectService.deleteProject(project.projectId).subscribe(data => {
        var index = this.projects.indexOf(project);
        if (index > -1)
          this.projects.splice(index, 1);

        //this.sharedService.update(this.projects);
      }, error => this.errorMessage = <any>error);
    }
  }
}

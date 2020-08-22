import { Injectable, Inject } from '@angular/core';
import { Project } from './projects/shared/project';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  projects: Project[];
  currentProject: Project;
  projectsUpdate: Subject<Project[]> = new Subject<Project[]>();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  update(projects: Project[]) {
    this.projects = projects;
    this.projectsUpdate.next(this.projects);
  }

  getCurrentProject(): Project {
    return this.currentProject;
  }

  setCurrentProject(project: Project): void {
    this.currentProject = project;
  }
}

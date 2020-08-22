import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'api/projects');
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'api/projects/' + id);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(this.baseUrl + 'api/projects', project);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(this.baseUrl + 'api/projects/' + project.projectId, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/projects/' + id);
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from './issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl + 'api/issues');
  }

  getIssue(id: number): Observable<Issue> {
    return this.http.get<Issue>(this.baseUrl + 'api/issues/' + id);
  }

  getIssuesByProject(projectId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl + 'api/projects/' + projectId + '/issues');
  }

  createIssue(issue: Issue): Observable<any> {
    return this.http.post(this.baseUrl + 'api/issues', issue);
  }

  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(this.baseUrl + 'api/issues/' + issue.issueId, issue);
  }

  deleteIssue(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/issues/' + id);
  }

  uploadFile(issueId: any, file: any): Observable<any> {
    let input = new FormData();
    input.append("file", file);

    return this.http.put(this.baseUrl + 'api/attachments/Upload/' + issueId, input);
  }
}

import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { IIssue } from './issue';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject, OnInit } from '@angular/core';
import 'rxjs/Rx'

@Injectable()
export class IssueService {
    private baseUrl = '';

    constructor(private authHttp: AuthHttp, private http: Http, @Inject('ORIGIN_URL') originUrl: string){
        this.baseUrl = originUrl;
    }

    getIssues(): Observable<IIssue[]> {
        return this.authHttp.get(this.baseUrl + '/api/Issues')
            .map((response: Response) => <IIssue[]>response.json())
            .catch(this.handleError);
    }

    getIssuesOfProject(id: number): Observable<IIssue[]> {
        return this.authHttp.get(this.baseUrl + '/api/Projects/' + id + '/Issues')
            .map((response: Response) => <IIssue[]>response.json())
            .catch(this.handleError);
    }

    getSingleIssue(id: number): Observable<IIssue> {
        return this.authHttp.get(this.baseUrl + '/api/Issues/' + id)
            .map((response: Response) => <IIssue>response.json())
            .catch(this.handleError);
    }

    createIssue(issue: IIssue): Observable<any> {
        let body = JSON.stringify(issue);
        return this.authHttp.post(this.baseUrl + '/api/Issues', body)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    updateIssue(issue: IIssue): Observable<any> {
        let body = JSON.stringify(issue);

        return this.authHttp.put(this.baseUrl + '/api/Issues/' + issue.issueId, body)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deleteIssue(id: any): Observable<any> {
        return this.authHttp.delete(this.baseUrl + '/api/Issues/' + id)
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    uploadFile(issueId: any, file: any): Observable<any> {
        let input = new FormData();
        input.append("file", file);

        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.baseUrl + '/api/Attachments/Upload/' + issueId, input, options)
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        return Observable.throw(error.json().error || 'Server error');
    }
}
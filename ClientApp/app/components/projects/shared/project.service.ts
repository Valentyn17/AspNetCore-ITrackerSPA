import { AuthService } from './../../../auth/auth.service';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { IProject } from './project';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/Rx'

@Injectable()
export class ProjectService {
    private baseUrl;
    public projects: IProject[];

    constructor(public authHttp: AuthHttp, private http: Http, @Inject('ORIGIN_URL') originUrl: string) {
        this.baseUrl = originUrl;
    }

    getProjects(): Observable<IProject[]> {
        return this.authHttp.get(this.baseUrl + '/api/Projects')
            .map((res: Response) => <IProject[]>res.json())
            .catch(this.handleError);
    }

    getProject(id: number): Observable<IProject> {
        return this.authHttp.get(this.baseUrl + '/api/Projects/' + id)
            .map((response: Response) => <IProject>response.json())
            .catch(this.handleError);
    }

    createProject(project: IProject): Observable<any> {
        let body = JSON.stringify(project);
        return this.authHttp.post(this.baseUrl + '/api/Projects/', body)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    updateProject(project: IProject): Observable<any> {
        let body = JSON.stringify(project);
        return this.authHttp.put(this.baseUrl + '/api/Projects/' + project.projectId, body)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    deleteProject(id: any): Observable<any> {
        return this.authHttp.delete(this.baseUrl + '/api/Projects/' + id)
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.fields || { };
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    generate(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/SampleData/Generate')
                        .map((response: Response) => <any> response.json())
                        .catch(this.handleError);
    }
}
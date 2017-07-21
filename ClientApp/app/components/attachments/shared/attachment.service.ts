import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { IAttachment } from './attachment';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/Rx'

@Injectable()
export class AttachmentService {
    private baseUrl = '';

    constructor(private authHttp: AuthHttp, @Inject('ORIGIN_URL') originUrl: string){
        this.baseUrl = originUrl;
    }

    getAttachments(): Observable<IAttachment[]> {
        return this.authHttp.get(this.baseUrl + '/api/Attachments/')
            .map((res: Response) => <IAttachment[]> res.json())
            .catch(this.handleError);
    }

    getAttachmentsByIssueId(id: number): Observable<IAttachment[]> {
        return this.authHttp.get(this.baseUrl + '/api/Issues/' + id + '/Attachments')
            .map((res: Response) => <IAttachment[]> res.json())
            .catch(this.handleError);
    }

    deleteAttachment(id: number): Observable<any> {
        return this.authHttp.delete(this.baseUrl + '/api/Attachments/' + id)
            .map((res: Response) => <any>res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
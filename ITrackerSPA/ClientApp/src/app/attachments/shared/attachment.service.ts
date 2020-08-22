import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from './attachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAttachments(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.baseUrl + 'api/attachments');
  }

  getAttachmentsByIssue(issueId: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(this.baseUrl + 'api/issues/' + issueId + '/attachments');
  }

  deleteAttachment(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/attachments/' + id);
  }
}

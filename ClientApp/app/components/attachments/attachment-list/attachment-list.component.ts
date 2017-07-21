import { ActivatedRoute, Params, Router } from '@angular/router';
import { AttachmentService } from './../shared/attachment.service';
import { IAttachment } from './../shared/attachment';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    templateUrl: './attachment-list.component.html',
    styleUrls: ['./attachment-list.component.css']
})

export class AttachmentListComponent implements OnInit {
    attachments: IAttachment[];
    errorMessage: string;

    constructor(private attachmentService: AttachmentService, 
        private activatedRoute: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            let issueId = params['id'];
            if (!issueId) {
                this.attachmentService.getAttachments()
                    .subscribe(attachments => this.attachments = attachments, error => this.errorMessage = <any>error);
            }
            else {
                this.attachmentService.getAttachmentsByIssueId(issueId)
                    .subscribe(attachments => this.attachments = attachments, error => this.errorMessage = <any>error);
            }
        });
    }

    deleteAttachment(attachment: IAttachment) {
        if(confirm("Are you sure you want to delete this attachment?")) {
            this.attachmentService.deleteAttachment(attachment.attachmentId).subscribe(
                data => {
                    var index = this.attachments.indexOf(attachment);
                    if (index > -1)
                        this.attachments.splice(index, 1);
                },
                error => {
                    this.errorMessage = error;
                }
            );
        }
    }
}
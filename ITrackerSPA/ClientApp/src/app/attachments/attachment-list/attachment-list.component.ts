import { Component, OnInit } from '@angular/core';
import { AttachmentService } from '../shared/attachment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Attachment } from '../shared/attachment';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {
  attachments: Attachment[];
  errorMessage: string;

  constructor(private attachmentService: AttachmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let issueId = params['id'];
      if (!issueId) {
        this.attachmentService.getAttachments()
          .subscribe(attachments => this.attachments = attachments, error => this.errorMessage = <any>error);
      }
      else {
        this.attachmentService.getAttachmentsByIssue(issueId)
          .subscribe(attachments => this.attachments = attachments, error => this.errorMessage = <any>error);
      }
    });
  }

  deleteAttachment(attachment: Attachment) {
    if (confirm("Are you sure you want to delete this attachment?")) {
      this.attachmentService.deleteAttachment(attachment.attachmentId).subscribe(result => {
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

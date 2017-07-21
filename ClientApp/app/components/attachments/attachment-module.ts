import { AttachmentGuardService } from './shared/attachment-guard.service';
import { AttachmentService } from './shared/attachment.service';
import { AttachmentFilterPipe } from './shared/attachment-filter.pipe';
import { AttachmentListComponent } from './attachment-list/attachment-list.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './../../auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AttachmentListComponent,
        AttachmentFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'attachments',
                canActivate: [AuthGuard],
                component: AttachmentListComponent
            },
            {
                path: 'issues/:id/attachments',
                canActivate: [AuthGuard, AttachmentGuardService],
                component: AttachmentListComponent,
            },
        ])
    ],
    providers: [
        AttachmentService,
        AttachmentGuardService
    ]
})

export class AttachmentModule { }
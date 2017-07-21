import { ProfileComponent } from './components/profile/profile.component';
import { SharedService } from './app.service.shared';
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { IssueModule } from './components/issues/issue-module';
import { AttachmentModule } from './components/attachments/attachment-module';
import { ProjectModule } from './components/projects/project-module';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { DropdownModule } from 'ng2-dropdown';

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule, FormsModule, HttpModule,
        ProjectModule,
        IssueModule,
        AttachmentModule,
        DropdownModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        AUTH_PROVIDERS,
        AuthService,
        AuthGuard,
        SharedService,
        AuthHttp,
        {
            provide:AuthConfig,
            useValue: new AuthConfig({
                tokenName: 'access_token',
                tokenGetter: (() => localStorage.getItem('access_token')),
                globalHeaders: [{ 'Content-Type': 'application/json' }],
            })
        }
    ]
};
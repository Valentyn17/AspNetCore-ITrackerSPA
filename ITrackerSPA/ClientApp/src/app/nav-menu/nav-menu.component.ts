import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../projects/shared/project.service';
import { Project } from '../projects/shared/project';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isExpanded = false;
  isAuthenticated = false;
  projects: Project[];
  subscription: Subscription;

  constructor(private projectService: ProjectService,
    private sharedService: SharedService,
    private authorizeService: AuthorizeService,
    private router: Router) {
    this.getProjects();
  }

  ngOnInit(): void {
    this.subscription = this.sharedService.projectsUpdate.subscribe(data => {
      this.projects = data;
    }, error => console.log(error));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getProjects(): void {
    this.authorizeService.isAuthenticated().subscribe(result => {
      if (result == true && !this.isAuthenticated) {
        this.isAuthenticated = true;
        this.projectService.getProjects().subscribe(result => {
          this.projects = result;
          //console.log(result);
        });
      }
    });

  }

  onProjectChange(value) {
    if (value == -1) {
      this.sharedService.setCurrentProject(null);
      this.router.navigate(['/issues']);
    }
    else {
      let currentProject = this.projects.filter(p => p.projectId == value)[0];
      this.sharedService.setCurrentProject(currentProject);
      this.router.navigate(['/projects/' + this.sharedService.getCurrentProject().projectId + '/issues']);
    }
  }
}

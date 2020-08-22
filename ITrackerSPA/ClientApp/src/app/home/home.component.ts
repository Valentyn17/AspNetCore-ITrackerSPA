import { Component } from '@angular/core';
import { ProjectService } from '../projects/shared/project.service';
import { SharedService } from '../shared.service';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private projectService: ProjectService,
    private sharedService: SharedService,
    private authService: AuthorizeService) {
    if (authService.isAuthenticated()) {
      //projectService.getProjects().subscribe(result => {
      //  this.sharedService.update(result);
      //}, error => console.log(error));
      //console.log('home constructor');
    }
  }
}

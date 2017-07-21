import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class AttachmentGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = +route.url[1].path;
    
    if (isNaN(id) || id < 1) {
      alert('Invalid attachment Id');
      this.router.navigate(['/attachments']);
      return false;
    };
    return true;
  }

}
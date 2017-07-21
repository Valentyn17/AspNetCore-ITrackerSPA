import { Subject } from 'rxjs/Subject';
import { IProject } from './components/projects/shared/project';
import { Injectable } from '@angular/core';


@Injectable()
export class SharedService {
    currentProject: IProject;
    projects: IProject[];

    projectsUpdate: Subject<IProject[]> = new Subject<IProject[]>();

    update(projects: IProject[]) {
        this.projects = projects;
        this.projectsUpdate.next(this.projects);
    }

    getCurrentProject(): IProject {
        return this.currentProject;
    }

    setCurrentProject(project: IProject): void {
        this.currentProject = project;
    }
}
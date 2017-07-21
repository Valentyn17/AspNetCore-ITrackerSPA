import { IProject } from './project';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

    transform(value: IProject[], filterBy: string): IProject[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((issue: IProject) =>
            issue.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

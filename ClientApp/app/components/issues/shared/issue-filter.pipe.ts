import { IIssue } from './issue';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'issuesFilter'
})
export class IssueFilterPipe implements PipeTransform {

    transform(value: IIssue[], filterBy: string): IIssue[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((issue: IIssue) =>
            issue.title.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

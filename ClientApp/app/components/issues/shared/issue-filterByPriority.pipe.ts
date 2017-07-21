import { IIssue } from './issue';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'priorityFilter'
})

export class IssuePriorityFilterPipe implements PipeTransform {
    transform(value: IIssue[], filter: number): IIssue[] {
        filter = filter > -1 ? filter : null;
        return filter ? value.filter((product: IIssue) =>
            product.priority == filter) : value;
    }
}
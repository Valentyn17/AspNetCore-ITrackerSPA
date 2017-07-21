import { IAttachment } from './attachment';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'attachmentFilter'
})
export class AttachmentFilterPipe implements PipeTransform {

    transform(value: IAttachment[], filterBy: string): IAttachment[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((issue: IAttachment) =>
            issue.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import {PageState} from "../../providers/data-service/data-service";

@Pipe({
  name: 'myFilter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Filters an array of values by a string.
   */
  transform(items: any[], filter: string, state: PageState) {
    if (!items) return items;
    const lowercaseFilter = filter.toLowerCase();
    const keepDeleted = (state === PageState.DELETED);
    return items.filter(item =>  {
      const lowercaseItem = item.name ? item.name.toLowerCase() : "";
      const otherFilter = ((item.type === "file")) ?
        (keepDeleted ? (!!item.deleted_at) : !(!!item.deleted_at)) : true;
      return (lowercaseItem.includes(lowercaseFilter) && otherFilter);
    });
  }
}

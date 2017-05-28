import { Pipe, PipeTransform } from '@angular/core';
import {PageState} from "../../providers/data-service/data-service";

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Filters an array of values by a string.
   */
  transform(items: any[], filter: string, state: PageState) {
    if (!items) return items;
    const lowercaseFilter = filter.toLowerCase();
    return items.filter(item =>  {
      const lowercaseItem = item.name ? item.name.toLowerCase() : "";
      return (lowercaseItem.includes(lowercaseFilter));
    });
  }
}

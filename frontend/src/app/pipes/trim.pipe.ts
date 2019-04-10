import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'trim'

})
export class TrimPipe implements PipeTransform {
  public transform (value: string): string {
    if (!value) {
      return null;
    }
    return value.replace(/ /g, '-');
  }
}

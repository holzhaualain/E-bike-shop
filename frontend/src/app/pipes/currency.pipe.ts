import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountConverter'
})
export class AmountConverterPipe implements PipeTransform {

  public transform(value: any | string): string {
    if (value)  {
      return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1\'');
    } else {
      return value;
    }
  }

}

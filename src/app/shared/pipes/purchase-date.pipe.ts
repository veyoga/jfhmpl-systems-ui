import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'purchaseDate'
})
export class PurchaseDatePipe implements PipeTransform {

  transform(value: string, format:string): string {
    if(format==='month-year'){
      return moment(value).format('MMM-YY');
    }
    if(format==='date'){
      return moment(value).format('DD'); 
    }
    return value;
  }

}

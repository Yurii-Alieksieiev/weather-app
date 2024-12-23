import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value);
  }
}

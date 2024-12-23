import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(string: string): string {
    return `${string[0].toUpperCase()}${string.slice(1)}`;
  }
}

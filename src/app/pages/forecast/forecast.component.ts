import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {OpenWeatherService} from '../../services/open-weather.service';
import {groupBy, mergeMap, Observable, reduce, switchMap, take, toArray} from 'rxjs';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {
  MatTableModule
} from '@angular/material/table';
import {TemperaturePipe} from '../../pipes/temperature.pipe';
import {timestampToDate} from '../../utils/timestamp-to-date';
import {CapitalizePipe} from '../../pipes/capitalize.pipe';
import {ICityInfo} from '../../interfaces/city.interface';

@Component({
  selector: 'app-forecast',
  imports: [
    MatCardModule,
    NgIf,
    AsyncPipe,
    MatTableModule,
    DatePipe,
    TemperaturePipe,
    DecimalPipe,
    CapitalizePipe,
    NgForOf
  ],
  templateUrl: './forecast.component.html',
  standalone: true,
  styleUrl: './forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _openWeatherService = inject(OpenWeatherService);
  weatherDetails = signal<ICityInfo>({} as ICityInfo);

  forecast$: Observable<{ date: string, items: ICityInfo[] }[]> | undefined;

  ngOnInit(): void {
    this.weatherDetails.set(this._route.snapshot.data['weatherDetails']);
    this.forecast$ = this._openWeatherService.getForecast(this.weatherDetails().name).pipe(
      take(1),
      switchMap((res: any) => res.list),
      groupBy((item: any) => item.dt_txt.split(' ')[0]),
      mergeMap(group =>
        group.pipe(
          reduce((acc: ICityInfo[], curr: ICityInfo) => [...acc, curr], []),
          mergeMap(items => [{ date: group.key, items }])
        )
      ),
      toArray()
    );
  }

  protected readonly timestampToDate = timestampToDate;
}

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {OpenWeatherService} from './open-weather.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastResolverService implements Resolve<any> {
  constructor(
    private readonly _openWeatherService: OpenWeatherService,
    private readonly _router: Router,
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const city = route.queryParamMap.get('city');

    if (!city) {
      this._router.navigate(['**']);
      return of(undefined);
    }

    return this._openWeatherService.getCurrentWeatherDetails(city).pipe(
      catchError(error => {
        this._router.navigate(['**']);
        console.log(error);
        return of('Something went wrong!');
      })
    );
  }
}

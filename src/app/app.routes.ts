import { Routes } from '@angular/router';
import {ForecastComponent} from './pages/forecast/forecast.component';
import {LandingComponent} from './pages/landing/landing.component';
import {ForecastResolverService} from './services/forecast-resolver.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'forecast',
    component: ForecastComponent,
    resolve: {
      weatherDetails: ForecastResolverService
    }
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

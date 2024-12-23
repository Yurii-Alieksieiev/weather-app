import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private readonly _httpClient = inject(HttpClient);
  private apiKey = environment.openWeatherApiKey;
  baseUrl = 'https://api.openweathermap.org/data/2.5/';

  searchCity(city: any) {
    const url =`${this.baseUrl}find`;
    const params = new HttpParams()
      .append('appid', this.apiKey)
      .append('limit', 5)
      .append('q', city);
    return this._httpClient.get(url, { params });
  }

  getCurrentWeatherDetails(city: string) {
    const url = `${this.baseUrl}weather`;
    const params = new HttpParams()
      .append('appid', this.apiKey)
      .append('units', 'metric')
      .append('q', city);
    return this._httpClient.get(url, { params });
  }

  getForecast(city: string) {
    const url = `${this.baseUrl}forecast`;
    const params = new HttpParams()
      .append('appid', this.apiKey)
      .append('units', 'metric')
      .append('q', city)
    return this._httpClient.get(url, { params });
  }
}

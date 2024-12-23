export interface ICityShortInfo {
  name: string;
  sys: {
    country: string;
  }
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ICityInfo {
  name: string;
  clouds: ICloudsInfo;
  dt_txt?: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  }
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  }
  visibility: number;
  weather: IWeatherInfo[];
  wind: IWindInfo;
}

interface IWeatherInfo {
  description: string;
}

interface IWindInfo {
  speed: string;
}

interface ICloudsInfo {
  all: number;
}

import { Component, OnInit, Input } from '@angular/core';
import { weatherBit } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { CityDetails } from '../models/city-details';
import { WeatherForecast } from '../models/weather-forecast';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent implements OnInit {
  weatherBitUrl: string;
  weatherForecasts: WeatherForecast[];
  @Input() searchText: string;
  cityDetails: CityDetails;

  constructor(private http: HttpClient) {
    this.cityDetails = {
      cityName: '',
      stateCode: ''
    };
    this.weatherForecasts = [];
    this.weatherBitUrl = ``;
  }

  getWeather() {
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    this.http.get(this.weatherBitUrl).subscribe((results: any) => {
      console.log('START OF RESULTS....');
      console.log(results);
      console.log('END OF RESULTS....');
      this.weatherForecasts = (results['data'] as any[]).map(
        forecast => new WeatherForecast(forecast['datetime'], forecast['max_temp'], forecast['min_temp']));
      this.cityDetails.cityName = results['city_name'];
      this.cityDetails.stateCode = results['state_code'];
    });
  }

  ngOnInit() {
  }

}

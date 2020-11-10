import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(public Http: HttpClient) { }
  
  GetWeatherData(params) {
    let Data = this.Http.get(params.URL+params.CityName+'&units=metric&appid=5c16d21eb8513248fa2dda93a5b25fcc');
    return Data;
  }
  
}

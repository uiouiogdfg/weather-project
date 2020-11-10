import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CustomService } from '../../Service/custom.service';
import { NgxSpinnerService } from "ngx-spinner";
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public service : CustomService,private spinner : NgxSpinnerService) { }

  DataResponse : any = '';
  
    chartOptions : any;
    highcharts = Highcharts;
    highcharts2 = Highcharts;
    highcharts3 = Highcharts;
	 chartOptions3 : any;
    CityName : any = 'chennai';

  ngOnInit(){
	  this.GetData();
   }
  
  GetData(){
     
	  if(this.CityName != '' && this.CityName != null){
     
      let parameters = {
          CityName : this.CityName,
          URL : 'http://api.openweathermap.org/data/2.5/forecast?q='
      }
     this.spinner.show();
	  this.service.GetWeatherData(parameters).subscribe((data: any) => {
      this.spinner.hide();
        if(data != '' && data != null){
         this.GetFormatData(data);
        }
	  })
	  }
  }
  
  LastFiveDay = [];
  WeatherData = [];

  LatestFiveDayResult = [];
  
  GetFormatData(data){
	  
     this.LastFiveDay = [];
     
     this.LatestFiveDayResult = [];

     this.WeatherData = [];
	  
	  let response = data.list;
	  
	  for(let i = 1; i<=6; i++){
		  this.LastFiveDay.push(response[i].main);
     }
     
     for(let i = 1; i<=10; i++){
      this.WeatherData.push(response[i]);
    }

    console.log("ALDTA",this.WeatherData);
	  
	  let Temperature = [];
	  
	  this.LastFiveDay.forEach(value=>{
      Temperature.push(value.temp_max)
     })
     
     this.GetChart(Temperature);
   }

   GetChart (data : any) {

      this.chartOptions3 = {         
         title : {
            text: 'Trend of '+this.CityName+' Temperature'
         },
         tooltip : {
            valueSuffix: ' celsius'
         },
         yAxis: {
               title: {
                   text: 'celsius'
               },
           },
         plotOptions : {
            column: {
               dataLabels: {
                  enabled: true
               }
            },
            series: {
               stacking: 'normal'
            }
         },
         credits:{
            enabled: false
         },      
         series : [{
            type: 'line',
            zoomType:'xy',
            name: 'Days',
            data: data
         }]
      };
     }
   
   }
	

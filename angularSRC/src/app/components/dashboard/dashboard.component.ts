import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    reponsive: true
  };

  public barChartLabels = null;
  public barChartType = null;
  public barChartLegend = null;
  public barChartData = null;

  public daughnutChartLabels = null;
  public daughnutChartType = null;
  public daughnutChartData = null;

  public userList = null;



  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  ngOnInit() {
    this.authService.getDashboard().subscribe(data => {

      const barCharts = data.chartbar;
      const chartDonut = data.chartDonut;
      const tableUsers = data.tableUsers;

      // console.log(tableUsers)

      if(data){
        ///// Bar Chart
        this.barChartLabels = barCharts.labels;
        this.barChartType = barCharts.type;
        this.barChartLegend = barCharts.legend;
        this.barChartData = barCharts.data;
        //// Doughnut Chart
        this.daughnutChartLabels = chartDonut.labels;
        this.daughnutChartType = chartDonut.type;
        this.daughnutChartData = chartDonut.data;
        //// User List
        this.userList = tableUsers;
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-finish-test',
  templateUrl: './finish-test.component.html',
  styleUrls: ['./finish-test.component.scss']
})
export class FinishTestComponent implements OnInit {

  public captures: Array<any>;
  public video: ElementRef;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Right Answers', 'Wrong Answers'];
  public pieChartData: SingleDataSet = [500, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  

  answers: Array<{ question: number, answer: string, givenAnswer: boolean }> = [];
  constructor(private router: Router) {
    this.captures = [];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.answers = this.router.getCurrentNavigation().extras.state.example;
    this.captures = this.router.getCurrentNavigation().extras.state.captures;
    this.video = this.router.getCurrentNavigation().extras.state.video;
    
  }

  ngOnInit() {
    let rightAnswers = 0;
    let wrongAnswers = 0;
    this.answers.map((item) => {
      if (item['givenAnswer']) {
        rightAnswers++;
      }
      else {
        wrongAnswers++;
      }
    })
    this.pieChartData = [rightAnswers * 100, wrongAnswers * 100];

    
  }

}

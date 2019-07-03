import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { TestServiceService } from '../Shared/test-service.service';

@Component({
  selector: 'app-finish-test',
  templateUrl: './finish-test.component.html',
  styleUrls: ['./finish-test.component.scss']
})
export class FinishTestComponent implements OnInit {

  public captures: Array<any>;

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

  constructor(private router: Router, private testServiceService: TestServiceService) {
    this.captures = [];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.answers = this.testServiceService.getDetails()['answers']; 
    this.captures = this.testServiceService.getDetails()['captures'];
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

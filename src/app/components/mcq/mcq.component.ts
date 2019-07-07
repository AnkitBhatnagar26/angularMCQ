import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../Shared/http-service.service';
import { CommonServiceService } from '../../Shared/common-service.service';
import { QuestionArray } from '../../QuestionArray';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {
  questions: QuestionArray[] = [];
  constructor(private httpServiceService: HttpServiceService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    this.httpServiceService.getJSON('api/v1/questions')
      .subscribe(data => {
        this.questions = data.questions;
        console.log(this.questions,'this.questions');
        this.commonServiceService.setQuestionsData(this.questions);
      });
  }

}


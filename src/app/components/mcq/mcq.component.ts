import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../Shared/http-service.service';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {
  questions: Array<{ question: string, options: Array<string>, type: string }> = [];
  constructor(private httpServiceService: HttpServiceService) { }

  ngOnInit() {
    this.httpServiceService.getJSON('api/v1/questions')
      .subscribe(data => {
        this.questions = data.questions;
      });
  }

}

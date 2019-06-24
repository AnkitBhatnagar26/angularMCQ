import { Component, OnInit } from '@angular/core';
import { McqServiceService } from '../mcq-service.service';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {
  questions: Array<{question: string, options: Array<string>, type: string}> = [];
  constructor(private mcqServiceService: McqServiceService) { }

  ngOnInit() {
    this.mcqServiceService.getJSON()
      .subscribe(data => {
        this.questions = data;
        console.log(this.questions)
      });
  }

}

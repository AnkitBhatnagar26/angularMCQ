import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { McqServiceService } from '../mcq-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  groupOfDefault: boolean;

  @ViewChild("video", { static: false })
  public video: ElementRef;

  @ViewChild("canvas", { static: false })
  public canvas: ElementRef;

  public captures: Array<any>;

  questions: Array<{ id: number, givenAns: boolean, answer: string, question: string, options: Array<string>, type: string }> = [];
  answers: Array<{ question: number, answer: string }> = [];
  slideIndex: number = 0;

  interval;

  constructor(private mcqServiceService: McqServiceService, private router: Router) {
    this.captures = [];
  }


  ngOnInit() {
    this.mcqServiceService.getJSON()
      .subscribe(data => {
        this.questions = data;
        console.log(this.questions);
      });
    this.interval = setInterval(() => {
      this.capture();
    }, 5000);
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.video.nativeElement.srcObject = stream;
          return this.video.nativeElement.play();
        })
    }
  }

  public capture() {
    this.video.nativeElement.className = "blur"
    setTimeout(() => {
      this.video.nativeElement.className = "";
    }, 200);
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  nextSlide() {
    if (this.slideIndex === this.questions.length - 1)
      return;
    this.slideIndex++;

    this.questions.map((item) => {
      this.answers.map((item1) => {
        if (item.id === item1.question) {
          if (item1.answer === item.answer) {
            return item1['givenAnswer'] = true;
          } else {
            return item1['givenAnswer'] = false;
          }
        }
      });
    })
    console.log(this.answers);
  }

  previousSlide() {
    if (this.slideIndex === 0)
      return;
    this.slideIndex--;
  }

  previousBtnDisabled() {
    if (this.slideIndex === 0)
      return true;
  }

  openQuestion(q) {
    this.slideIndex = q.id - 1;
  }

  finishTest() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          return this.video.nativeElement.srcObject = stream.getTracks()[0].stop();
        })
    }
    clearInterval(this.interval);
    this.router.navigate(['/', 'finishTest'], { state: { example: this.answers, captures: this.captures } });
  }

  onRadioChange(answer: string, question: number) {
    console.log(question, answer);
    this.questions[this.slideIndex]['givenAns'] = true;
    this.answers.map((item, index) => {
      if (item.question == question) {
        this.answers.splice(index, 1);
      }
    });

    this.answers.push({ question, answer })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
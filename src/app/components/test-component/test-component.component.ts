import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HttpServiceService } from '../../Shared/http-service.service';
import { TestServiceService } from '../../Shared/test-service.service';
import { QuestionArray } from '../../QuestionArray';
import { CommonServiceService } from '../../Shared/common-service.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  carousel;
  groupOfDefault: boolean;

  @ViewChild("video", { static: false })
  public video: ElementRef;

  @ViewChild("canvas", { static: false })
  public canvas: ElementRef;

  public captures: Array<any>;

  questions: QuestionArray[] = [];
  answers: Array<{ question: number, answer: string }> = [];
  slideIndex: number = 0;

  interval: any;
  questionContainer: any

  constructor(
    private router: Router,
    private httpServiceService: HttpServiceService,
    private testServiceService: TestServiceService,
    private location: PlatformLocation,
    private toastr: ToastrService,
    private commonServiceService: CommonServiceService
  ) {
    this.location.onPopState(() => {
      this.router.navigateByUrl('/startTest');
      history.forward();
      this.toastr.warning(' Otherwise your exam will start again.', 'Please do not press browser back button');
    });
    this.captures = [];
    this.questionContainer = document.getElementsByClassName('question-container');
  }


  ngOnInit() {
    this.questions = this.commonServiceService.getQuestionsData();
    // this.interval = setInterval(() => {
    //   this.capture();
    // }, 2000);
  }


  public ngAfterViewInit() {
    this.carousel = document.getElementById('carouselExampleControls');
    console.log(this.carousel, 'this.carousel')
    // this.carousel.addeventListener('slide.bs.carousel', function(){
    //   console.log('sliding');
    // })
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true })
    //     .then((stream) => {
    //       this.video.nativeElement.srcObject = stream;
    //       return this.video.nativeElement.play();
    //     })
    // }
  }

  public capture() {
    this.video.nativeElement.className = "blur"
    setTimeout(() => {
      this.video.nativeElement.className = "";
    }, 200);
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  randomBgColor() {
    var colors = ['#08F7FE33', '#09FBD333', '#FE53BB33', '#FFACFC33', '#75D5FD33', '#FDC7D733', '#13CA9180'];
    this.questionContainer[0].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }

  nextSlide() {
    if (this.slideIndex === this.questions.length - 1)
      return;
    this.slideIndex++;
    this.randomBgColor();

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
  }

  previousSlide() {
    if (this.slideIndex === 0)
      return;
    this.slideIndex--;
    this.randomBgColor();
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
          this.video.nativeElement.srcObject = stream.getTracks()[0].stop();
          clearInterval(this.interval);
          let detailsObj = {
            "answers": this.answers,
            "captures": this.captures
          };
          this.testServiceService.setDetails(detailsObj);
          this.router.navigate(['finishTest']);
          this.sendHttpMail();
        })
    }

  }

  sendHttpMail() {
    let user = {
      name: 'Test Account',
      email: 'anky.king26@gmail.com'
    }
    this.httpServiceService.sendMail('api/v1/sendMail', user).subscribe((response) => {
      console.log(response, 'response');
    });
  }

  onRadioChange(answer: string, question: number) {
    console.log(answer, question);
    this.questions[this.slideIndex]['givenAns'] = true;
    this.answers.map((item, index) => {
      if (item.question == question) {
        this.answers.splice(index, 1);
      }
    });

    this.answers.push({ question, answer });
    console.log(this.questions, this.answers, this.slideIndex)
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}

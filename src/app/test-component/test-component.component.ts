import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { McqServiceService } from '../mcq-service.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @ViewChild("video", { static: false })
  public video: ElementRef;

  @ViewChild("canvas", { static: false })
  public canvas: ElementRef;

  public captures: Array<any>;
  
  questions: Array<{ question: string, options: Array<string>, type: string }> = [];
  slideIndex: number = 0;

  constructor(private mcqServiceService: McqServiceService) {
    this.captures = [];
  }

  
  ngOnInit() {
    this.mcqServiceService.getJSON()
      .subscribe(data => {
        this.questions = data;
      });
      // setInterval(() => {
      //   this.capture();
      // }, 20000);
  }

  // public ngAfterViewInit() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then((stream) => {
  //         this.video.nativeElement.srcObject = stream;
  //         return this.video.nativeElement.play();
  //       })
  //   }
  // }
  
  public capture() {
    this.video.nativeElement.className="blur"
    setTimeout(() => {
      this.video.nativeElement.className = "";
    },200);
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  nextSlide() {
    if (this.slideIndex === this.questions.length - 1)
      return;
    this.slideIndex++;
  }

  previousSlide() {
    if (this.slideIndex === 0)
      return;
    this.slideIndex--;
  }

  previousBtnDisabled() {
    if(this.slideIndex === 0)
      return true;
  }

  nextBtnDisabled() {
    if(this.slideIndex === this.questions.length - 1){
      return true;
    }
  }

  openQuestion(q){
    this.slideIndex = q.id - 1;
  }
}

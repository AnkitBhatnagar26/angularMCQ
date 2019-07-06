import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Modal } from './modal';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit {
  // body = document.querySelector("body");
  // modal = document.querySelector(".modal");
  // modalButton = document.querySelector(".modal-button");
  // closeButton = document.querySelector(".close-button");
  // scrollDown = document.querySelector(".scroll-down");
  isOpened = false;
  model = new Modal('', '')

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.openModal();
    }, 3000);
  }

  onSubmit() {
    console.log(this.model);
    this.closeModal();
    this.toastr.success('Your details will be saved with us.', 'Thank you for submitting!');
  }

  openModal() {
    this.isOpened = true;
  };

  closeModal() {
    this.isOpened = false;
  };

}

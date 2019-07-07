import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Modal } from './modal';
import { CommonServiceService } from '../../Shared/common-service.service';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit {
  isOpened = false;
  model = new Modal('', '')

  constructor(private toastr: ToastrService, private commonServiceService: CommonServiceService) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.openModal();
    }, 1000);
  }

  onSubmit() {
    console.log(this.model);
    this.commonServiceService.setUserLoggedIn();
    this.closeModal();
    this.toastr.success('Your details will be saved with us.', 'You can start your test!');
  }

  openModal() {
    this.isOpened = true;
  };

  closeModal() {
    this.isOpened = false;
  };

}

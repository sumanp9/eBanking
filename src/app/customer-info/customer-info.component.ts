import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Customer} from '../home/home.component';
import {EBankingService} from '../service/e-banking.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  userName: string;
  customer: Customer;
  constructor(@Inject(MAT_DIALOG_DATA) loginName: string,
              private service: EBankingService) {
    this.userName = loginName;
  }

  ngOnInit(): void {
    this.service.getUserDetails(this.userName).subscribe((userInfo) => {
      this.customer = userInfo;
    });
  }

}

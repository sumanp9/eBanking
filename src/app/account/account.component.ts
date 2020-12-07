import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InternalService} from '../service/internal.service';
import {Router} from '@angular/router';
import {EBankingService} from '../service/e-banking.service';
import {Customer} from '../home/home.component';

export interface AccountDetails {
  savingsId: number;
  checkingId: number;
  savingsBalance: number;
  checkingBalance: number;
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  customer: Customer;
  changeText: boolean;
  checkingText: boolean;
  customerAccountDetails: AccountDetails;


  constructor(private dialog: MatDialog,
              private internalService: InternalService,
              private router: Router,
              private service: EBankingService) {
    this.customer = this.internalService.serviceData;
  }

  ngOnInit(): void {
    if (this.customer === null || this.customer === undefined ){
      this.router.navigateByUrl('');
    } else {
      this.refreshPage();

    }
  }



  private refreshPage(): void {
    this.service.getAccountDetails(this.customer.userName).subscribe((details: AccountDetails) => {
      this.customerAccountDetails = details;
    });
  }

  getChecking(): void {

  }

  getSavings(): void {
    this.router.navigateByUrl('/savings');
  }
}

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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

  customer = localStorage.getItem('User');
  changeText: boolean;
  checkingText: boolean;
  customerAccountDetails: AccountDetails;


  constructor(private dialog: MatDialog,
              private router: Router,
              private service: EBankingService) {
  }

  ngOnInit(): void {
    if (this.customer === null || this.customer === undefined ){
      this.router.navigateByUrl('');
    } else {
      this.refreshPage();

    }
  }



  private refreshPage(): void {
    this.service.getAccountDetails(this.customer).subscribe((details: AccountDetails) => {
      this.customerAccountDetails = details;
    });
  }

  getChecking(): void {
    this.router.navigateByUrl('/checking');
  }

  getSavings(): void {
    this.router.navigateByUrl('/savings');
  }
}

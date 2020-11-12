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

interface  a {
  id: number;
  name: string;
  balance: number;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  customer: Customer;
  accountDetails = 'Checking';
  customerAccountDetails: a[];
  displayedColumns: string[] = ['id', 'accountType', 'balance', 'buttons'];


  constructor(private dialog: MatDialog,
              private internalService: InternalService,
              private router: Router,
              private service: EBankingService) {
    this.customer = this.internalService.serviceData;
  }

  ngOnInit(): void {
    console.log(this.customer);
    // navigate to homepage if customer is null.
    if (this.customer == null) {
      this.router.navigateByUrl('');
    }
    this.refreshPage();
  }

  logout(): void {
    this.router.navigateByUrl('');
  }

  showChecking(): void{

  }

  showSavings(): void{

  }

  getAccountDetails(): void {
    //TODO: what type of account is it? Checking or savings
  }

  //
  private refreshPage(): void {
    this.service.getAccountDetails(this.customer.userName).subscribe((details: AccountDetails) => {
      console.log(details);
      this.customerAccountDetails = [{id: details.savingsId, balance: details.savingsBalance, name: 'Savings'},
        {id: details.checkingId, balance: details.checkingBalance, name: 'Checking'}];
    });
  }
}

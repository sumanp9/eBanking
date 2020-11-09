import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InternalService} from '../service/internal.service';
import {Router} from '@angular/router';
import {EBankingService} from '../service/e-banking.service';
import {Customer} from '../home/home.component';

export interface BankingOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  customer: Customer;

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
  }

  logout(): void {
    this.router.navigateByUrl('');
  }

  acctDetails(): void {
    alert('Hello');
  }

}

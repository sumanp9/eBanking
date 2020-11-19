import { Component, OnInit } from '@angular/core';
import {Customer} from '../home/home.component';
import {Router} from '@angular/router';
import {AccountDetails} from '../account/account.component';
import {InternalService} from '../service/internal.service';
import {EBankingService} from '../service/e-banking.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  customer: Customer;
  customerAccountDetails: AccountDetails;


  constructor(private router: Router,
              private service: EBankingService,
              private internalService: InternalService) {
    this.customer = this.internalService.serviceData;

  }

  ngOnInit(): void {
    if (this.customer == null) {
      this.router.navigateByUrl('');
    }
    this.refreshPage();
  }

  logout(): void {
    this.router.navigateByUrl('');

  }

  refreshPage(): void {
    this.service.getAccountDetails(this.customer.userName).subscribe((details: AccountDetails) => {
        console.log(details);
        this.customerAccountDetails = details;
      });
    }
  }


import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountDetails} from '../account/account.component';
import {EBankingService} from '../service/e-banking.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  customer = localStorage.getItem('User');
  customerAccountDetails: AccountDetails;


  constructor(private router: Router,
              private service: EBankingService,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    if (this.customer === null || this.customer === undefined ){
      this.router.navigateByUrl('');
    }
    this.refreshPage();
  }

  logout(): void {
    this.authService.logout();
  }

  refreshPage(): void {
    this.service.getAccountDetails(this.customer).subscribe((details: AccountDetails) => {
        console.log(details);
        this.customerAccountDetails = details;
      });
    }

  navigateToHome(): void {
    this.router.navigateByUrl('account');
  }
}


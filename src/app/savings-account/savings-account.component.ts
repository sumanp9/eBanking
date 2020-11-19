import {Component, OnInit, TemplateRef} from '@angular/core';
import {EBankingService, Savings} from '../service/e-banking.service';
import {Router} from '@angular/router';
import {InternalService} from '../service/internal.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.scss']
})
export class SavingsAccountComponent implements OnInit {

  userName: string;
  savingsAccount: Savings;
  depositAmount: number;
  amounts: number[] = [10, 50, 100, 500];

  constructor(private service: EBankingService,
              private router: Router,
              private internalService: InternalService,
              private dialog: MatDialog) {
    this.userName =  internalService.serviceData.userName;
  }

  ngOnInit(): void {
    if (this.userName == null || this.userName === '') {
      this.router.navigateByUrl('');
    } else {
      this.refreshPage();
    }

  }

  private refreshPage(): void {
    this.service.getSavingsInfo(this.userName).subscribe((result) => {
      this.savingsAccount = result;
    } );
  }

  getAccountDetails(acctDetails: TemplateRef<any>): void{
    this.dialog.open(acctDetails);
  }

  openDialog(template: TemplateRef<any>): void {
    this.dialog.open(template);
  }

  depositSavings(): void {
    this.service.deposit(this.depositAmount, this.savingsAccount.id).subscribe((result) => {
      if (result) {
        this.dialog.closeAll();
        this.refreshPage();
      }
    });
  }

  withdrawSavings(): void{
    this.service.withdraw(this.depositAmount, this.savingsAccount.id).subscribe( (result) => {
      if (result) {
        this.dialog.closeAll();
        this.refreshPage();
      }
    });
  }
}

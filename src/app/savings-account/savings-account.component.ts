import {Component, OnInit, TemplateRef} from '@angular/core';
import {AccountType, EBankingService, Savings, ToAccount, TransactionHistory, TransferDetails} from '../service/e-banking.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TransferComponent} from '../transfer/transfer.component';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {TransactionHistoryComponent} from '../transaction-history/transaction-history.component';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.scss']
})
export class SavingsAccountComponent implements OnInit {

  userName = localStorage.getItem('User');
  savingsAccount: Savings;
  depositAmount: number;
  amounts: number[] = [10, 50, 100, 500];
  toAccount: ToAccount;
  acctType: AccountType.Savings;

  constructor(private service: EBankingService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    if (this.userName === null) {
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

  transfer(): void{
    this.toAccount = {balance: this.savingsAccount.balance, accountType: AccountType.Savings};
    this.dialog.open(TransferComponent, {data: this.toAccount}).afterClosed().subscribe((result: TransferDetails) => {
      if (result) {
        if (result.otherAccountNum != null) {
          this.service.transferMoneytoAnotherAccount(result.accountType, result.amount, result.otherAccountNum, this.userName)
            .subscribe(() => {
              this.refreshPage();
            });
        } else {
          console.log('Here');
          this.service.transferMoney(result.accountType, result.amount, this.userName).subscribe(() => {
            this.refreshPage();
          });
        }
      }
      });
  }

  customerInformation(): void {
    this.dialog.open(CustomerInfoComponent, {data: this.userName});
  }

  transactionHistory(): void {
    this.service.transferringAcctType('SAVINGS');
    this.dialog.open(TransactionHistoryComponent, {data: this.savingsAccount.id, width: '500px'}).afterClosed().subscribe();

  }
}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {AccountType, Checking, EBankingService, ToAccount, TransferDetails} from '../service/e-banking.service';
import {MatDialog} from '@angular/material/dialog';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {TransferComponent} from '../transfer/transfer.component';

@Component({
  selector: 'app-checking-account',
  templateUrl: './checking-account.component.html',
  styleUrls: ['./checking-account.component.scss']
})
export class CheckingAccountComponent implements OnInit {

  customerId = Number(localStorage.getItem('userId'));
  checkingAccount: Checking;
  userName = localStorage.getItem('User');
  amounts: number[] = [10, 50, 100, 500];
  depositAmount: number;
  toAccount: ToAccount;
  customer = localStorage.getItem('User');

  constructor(private router: Router,
              private service: EBankingService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    (this.customerId === null || this.customerId === undefined) ?
      this.router.navigateByUrl('') :
      this.refreshPage();
  }

  private refreshPage(): void{
    this.service.getCheckingInfo(this.customerId).subscribe((checking => {
      this.checkingAccount = checking;
    }));
  }

  getAccountDetails(acctDetails: TemplateRef<any>): void{
      this.dialog.open(acctDetails);
  }

  openDialog(deposit: TemplateRef<any>): void {
    this.dialog.open(deposit);
  }



  transfer(): void {
    this.toAccount = {balance: this.checkingAccount.balance , accountType: AccountType.Checking};
    this.dialog.open(TransferComponent, {data: this.toAccount}).afterClosed().subscribe((result: TransferDetails) => {
      if (result) {
        if (result.otherAccountNum != null){
          this.transferToAnotherAccount(result);
        } else {
          this.transferTo(result);
        }
      }
    });
  }

  // TODO: display more information than just username
  customerInformation(): void {
    this.dialog.open(CustomerInfoComponent, {data: this.userName});
  }

  depositChecking(): void {
    this.service.deposit(this.depositAmount, this.checkingAccount.id).subscribe(result => {
      if (result) {
        this.dialog.closeAll();
        this.refreshPage();
      }
    });
  }

  withdrawChecking(): void {
    this.service.withdraw(this.depositAmount, this.checkingAccount.id).subscribe(result => {
      if (result) {
        this.dialog.closeAll();
        this.refreshPage();
      }
    });
  }

  private transferToAnotherAccount(transferDetails: TransferDetails): void {
    this.service.transferMoneytoAnotherAccount(transferDetails.accountType = 'Checking',
      transferDetails.amount, transferDetails.otherAccountNum, this.userName).subscribe(() => {
        this.refreshPage();
    });
  }

  private transferTo(result: TransferDetails): void {
    this.service.transferMoney(result.accountType, result.amount, this.userName).subscribe(() => {
      this.refreshPage();
    });
  }
}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {AccountType, Checking, EBankingService, ToAccount, TransferDetails} from '../service/e-banking.service';
import {InternalService} from '../service/internal.service';
import {MatDialog} from '@angular/material/dialog';
import {Customer} from '../home/home.component';
import {CustomerInfoComponent} from '../customer-info/customer-info.component';
import {TransferComponent} from '../transfer/transfer.component';

@Component({
  selector: 'app-checking-account',
  templateUrl: './checking-account.component.html',
  styleUrls: ['./checking-account.component.scss']
})
export class CheckingAccountComponent implements OnInit {

  customer: Customer;
  checkingAccount: Checking;
  userName: string;
  amounts: number[] = [10, 50, 100, 500];
  depositAmount: number;
  toAccount: ToAccount;

  constructor(private router: Router,
              private service: EBankingService,
              private internalService: InternalService,
              private dialog: MatDialog) {
    this.customer = this.internalService.serviceData;
    this.userName =  this.customer.userName;
  }

  ngOnInit(): void {
    (this.customer === null || this.customer === undefined) ?
      this.router.navigateByUrl('') :
      this.refreshPage();
  }

  private refreshPage(): void{
    this.service.getCheckingInfo(this.customer.id).subscribe((checking => {
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
    this.service.withdraw(this.depositAmount, this.checkingAccount.id).subscribe(result =>{
      if (result) {
        this.dialog.closeAll();
        this.refreshPage();
      }
    });
  }

  private transferToAnotherAccount(transferDetails: TransferDetails): void {
    this.service.transferMoneytoAnotherAccount(transferDetails.accountType,
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

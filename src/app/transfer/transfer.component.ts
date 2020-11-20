import {Component, Inject, OnInit} from '@angular/core';
import {EBankingService, Savings, TransferAmount} from '../service/e-banking.service';
import {InternalService} from '../service/internal.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transfer: TransferAmount;
  anotherAccountSelect: boolean;
  otherAcctNumber: number;
  amount: number;
  selected = 'Checking Account';
  userName: string;
  accountBalance: number;

  constructor(@Inject(MAT_DIALOG_DATA) balance: number,
              private internalService: InternalService,
              private service: EBankingService,
              private dialogRef: MatDialogRef<TransferComponent>) {
    this.userName =  internalService.serviceData.userName;
    this.accountBalance = balance;
  }

  ngOnInit(): void {
  }


  otherAccount(): void {
    this.anotherAccountSelect = false;
  }

  otherEbankingAcct(): void{
    this.anotherAccountSelect = true;
  }

  transferAmount(): void {
    console.log(this.amount);
    console.log(this.accountBalance);
    console.log(this.selected);
    if (this.amount > 0 && this.amount <= this.accountBalance) {
      if (this.selected === 'Another Ebanking Account') {
      }
      else{
        console.log('Here');
        this.service.transferMoney(this.selected, this.amount, this.userName).subscribe((result) => {

          this.dialogRef.close();
        });
      }
    }
  }
}

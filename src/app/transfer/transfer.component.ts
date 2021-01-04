import {Component, Inject, OnInit} from '@angular/core';
import {EBankingService, ToAccount, TransferAmount, TransferDetails} from '../service/e-banking.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
  selected: string;
  toAccount: ToAccount;

  transferDetails: TransferDetails;

  constructor(@Inject(MAT_DIALOG_DATA) toAccount: ToAccount,
              private service: EBankingService,
              private dialogRef: MatDialogRef<TransferComponent>) {
    this.toAccount = toAccount;
    this.selected = '';

  }

  ngOnInit(): void {
    this.toAccount.accountType === 1 ? this.selected = 'Savings Account' : this.selected = 'Checking Account';
  }


  otherAccount(): void {
    this.anotherAccountSelect = false;
  }

  otherEbankingAcct(): void{
    this.anotherAccountSelect = true;
  }

  transferAmount(): void {
    if (this.amount > 0 && this.amount <= this.toAccount.balance) {
        this.transferDetails = {accountType: (this.selected === 'Savings Account' ? 'Checking' : 'Savings') , amount: this.amount, otherAccountNum: this.otherAcctNumber};
        this.dialogRef.close(this.transferDetails);
    }
  }
}

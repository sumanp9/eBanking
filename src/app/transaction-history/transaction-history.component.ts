import {Component, Inject, OnInit} from '@angular/core';
import {EBankingService, TransactionHistory} from '../service/e-banking.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  accountTypeId: number;
  accountType: string;
  transactionsHistory: Array<TransactionHistory>;
  displayedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) accountTypeId: number,
              private service: EBankingService) {
    this.accountTypeId = accountTypeId;
    this.displayedColumns = ['Date', 'FromAccount', 'direction', 'ToAccount' , 'Amount'];
  }

  ngOnInit(): void {
    this.refreshPage();
  }

  private refreshPage(): void {
    this.accountType = this.service.getTransferringAcct();
    this.service.getTransactionHistory(this.accountType, this.accountTypeId).subscribe((transactions: TransactionHistory[]) => {
      this.transactionsHistory = transactions;
    });
  }
}

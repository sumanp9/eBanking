import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../home/home.component';
import {Observable} from 'rxjs';
import {AccountDetails} from '../account/account.component';

export interface Savings{
  id: number;
  balance: number;
}

export interface Checking{
  id: number;
  balance: number;
}

export interface TransferAmount{
  accountNumber: number;
  amount: number;
}

export interface ToAccount {
  balance: number;
  accountType: AccountType;
}
export interface TransferDetails{
  accountType: string;
  amount: number;
  otherAccountNum: number;
}

export enum AccountType{
  Savings,
  Checking
}


@Injectable({
  providedIn: 'root'
})
export class EBankingService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  registerUser(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.url + 'registerCustomer', customer);
  }

  getAccountDetails(userName: string): Observable<AccountDetails> {
    return this.http.post<AccountDetails>(this.url + 'getAccountDetails', userName);
  }

  getSavingsInfo(userName: string): Observable<Savings> {
    return this.http.post<Savings>(this.url + 'getSavings', userName);
  }
  getCheckingInfo(customerId: number): Observable<Checking>  {
      return this.http.post<Checking>(this.url + 'getChecking', customerId);
  }

  deposit(depositAmount: number, savingsAccountId: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'depositSavings/' + depositAmount, savingsAccountId);
  }

  withdraw(amount: number, savingsAccountId: number): Observable<boolean>{
    return this.http.post<boolean>(this.url + 'withdrawSavings/' + amount, savingsAccountId);
  }

  transferMoney(selected: string, amount: number, userName: string): Observable<any> {
    if (selected === 'Checking Account') {
      return this.http.post<any>(this.url + 'transferTo/checking/' + amount, userName);
    } else{
       return this.http.post<any>(this.url + 'transferTo/savings/' + amount, userName);
      // Why is if else necessary
    }
  }
  transferMoneytoAnotherAccount(selected: string, amount: number, otherAcctNumber: number, senderUserName: string): Observable<any> {
    return this.http.post<any>(this.url + 'transferTo/anotherAccount/' + amount, {senderUserName, otherAcctNumber});

  }
  getUserDetails(userName: string): Observable<Customer> {
    return this.http.post<Customer>(this.url + 'getCustomerInfo', userName);
  }


}

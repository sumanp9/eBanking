import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../home/home.component';
import {Observable} from 'rxjs';
import {AccountDetails} from '../account/account.component';

export interface Savings{
  id: number;
  balance: number;
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

  loginUser(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.url + 'login', customer);
  }

  getAccountDetails(userName: string): Observable<AccountDetails> {
    return this.http.post<AccountDetails>(this.url + 'getAccountDetails', userName);
  }

  getSavingsInfo(userName: string): Observable<Savings> {
    return this.http.post<Savings>(this.url + 'getSavings', userName);
  }

  deposit(depositAmount: number, savingsAccountId: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'depositSavings/' + depositAmount, savingsAccountId);
  }

  withdraw(amount: number, savingsAccountId: number): Observable<boolean>{
    return this.http.post<boolean>(this.url + 'withdrawSavings/' + amount, savingsAccountId);
  }
}

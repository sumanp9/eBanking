import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../home/home.component';
import {Observable} from 'rxjs';
import {AccountDetails} from '../account/account.component';

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
}

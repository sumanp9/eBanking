import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../home/home.component';
import {Observable} from 'rxjs';

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
}

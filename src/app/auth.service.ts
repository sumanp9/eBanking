import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Customer} from './home/home.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private url = 'http://localhost:8080/';

  private loggedIn =  new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');

 login(customer: Customer): void {
   this.loginUser(customer).subscribe((cust) => {
     if (cust) {
       localStorage.setItem('isLoggedIn', 'true');
       localStorage.setItem('token', 'hello');
       this.loggedIn.next(true);
       this.router.navigateByUrl('/account');
     }
     this.getUserId(localStorage.getItem('User')).subscribe((userId: number) => {
       localStorage.setItem('userId', String(userId));
     });
     // else statement to display error UI
   });

 }


 logout(): void {
   localStorage.setItem('isLoggedIn', 'false');
   localStorage.setItem('User', '');
   this.loggedIn.next(false);
   this.router.navigateByUrl('');
 }

  private loginUser(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.url + 'login', customer);
  }

  private getUserId(userName: string): Observable<number> {
    return this.http.post<number>(this.url + 'getUserId', userName);
  }

}

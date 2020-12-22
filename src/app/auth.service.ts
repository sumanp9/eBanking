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

/*
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
 }
*/
 login(customer: Customer): void {
   this.loginUser(customer).subscribe((cust) => {
     if (cust) {
       // this.internalService.serviceData = cust;
       localStorage.setItem('isLoggedIn', 'true');
       localStorage.setItem('token', 'hello');
       this.loggedIn.next(true);
       this.router.navigateByUrl('/account');
     }
     // else statement to display error UI
   });

 }


 logout(): void {
   localStorage.setItem('isLoggedIn', 'false');
   this.loggedIn.next(false);
   this.router.navigateByUrl('');
 }
  /*
    private hasToken(): boolean {
      return !!localStorage.getItem('token');
    }
  */
  private loginUser(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.url + 'login', customer);
  }

}

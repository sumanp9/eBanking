import {Component, OnInit, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EBankingService} from '../service/e-banking.service';
import {Router} from '@angular/router';


export interface Customer {
  fName: string;
  lName: string;
  email: string;
  userName: string;
  password: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customer: Customer;
  password: string;
  userName: string;
  lName: any;
  rePassword: string;

  constructor(private dialog: MatDialog,
              private service: EBankingService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customer = {fName: '', lName: '', email: '', password: '', userName: ''}
  }



  openDialog(component: TemplateRef<any>, exists: boolean): void {
    this.dialog.open(component, { width: '300px'});
  }

  signIn(customer: Customer): void {
    // TODO: cannot be null (username and password)
    this.service.loginUser(customer);

  }

  register(customer: Customer, rePassword: string): void{
    console.log(customer);
    console.log(rePassword);
    if (customer.password !== null && customer.password === rePassword) {
      this.service.registerUser(customer).subscribe((cust) => {
        if (cust != null) {
          this.router.navigateByUrl('home');
        }
      });
    }
  }
}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EBankingService} from '../service/e-banking.service';
import {Router} from '@angular/router';
import {InternalService} from '../service/internal.service';


export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  address: string;
  phoneNumber: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customer: Customer;
  rePassword: string;
  errorMessage: string;

  constructor(private dialog: MatDialog,
              private service: EBankingService,
              private internalService: InternalService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customer = {firstName: '', lastName: '', email: '', password: '', userName: '', address: '', phoneNumber: ''};
  }



  openDialog(component: TemplateRef<any>, exists: boolean): void {
    this.dialog.open(component, { width: '300px'});
  }

  signIn(customer: Customer): void {
    // TODO: cannot be null (username and password)
    this.service.loginUser(customer).subscribe((cust) => {
      if (cust) {
        this.internalService.serviceData = cust;
        this.dialog.closeAll();
        this.router.navigateByUrl('/account');
      }
      //else statement to display error UI
    });

  }

  register(customer: Customer, rePassword: string): void{
    console.log(customer);
    console.log(rePassword);
    if (customer.password !== null && customer.password === rePassword) {
      this.service.registerUser(customer).subscribe((cust) => {
        if (cust != null) {
          this.internalService.serviceData = cust;
          this.router.navigateByUrl('/account');
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Unable to register the customer. Please try again';
      });
    }
  }


}

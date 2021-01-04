import {Component, OnInit, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EBankingService} from '../service/e-banking.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';


export interface Customer {
  id: number;
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
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customer = {id: null, firstName: '', lastName: '', email: '', password: '', userName: '', address: '', phoneNumber: ''};
  }



  openDialog(component: TemplateRef<any>, exists: boolean): void {
    this.dialog.open(component, { width: '300px'});
  }

  signIn(customer: Customer): void {
    // TODO: cannot be null (username and password)
    this.dialog.closeAll();
    this.authService.login(customer);
  }



  register(customer: Customer, rePassword: string): void{
    if (customer.password !== null && customer.password === rePassword) {
      this.service.registerUser(customer).subscribe((cust) => {
        if (cust != null) {
          this.dialog.closeAll();
          this.authService.login(customer);
          this.router.navigateByUrl('/account');
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Unable to register the customer. Please try again';
      });
    }
  }


}

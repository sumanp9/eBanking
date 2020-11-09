import { Injectable } from '@angular/core';
import {Customer} from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  // Service to transfer data between components
    serviceData: Customer;

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {SavingsAccountComponent} from './savings-account/savings-account.component';
import {CheckingAccountComponent} from './checking-account/checking-account.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'savings', component: SavingsAccountComponent},
  {path: 'checking', component: CheckingAccountComponent}
  //{path: '404', component: NotFoundComponent} : Future
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

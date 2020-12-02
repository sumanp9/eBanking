import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { AccountComponent } from './account/account.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SavingsAccountComponent } from './savings-account/savings-account.component';
import {MatSelectModule} from '@angular/material/select';
import {TransferComponent} from './transfer/transfer.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    ToolbarComponent,
    SavingsAccountComponent,
    TransferComponent,
    CustomerInfoComponent
  ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatDividerModule,
        MatToolbarModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatExpansionModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
        MatSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

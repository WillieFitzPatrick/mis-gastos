import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Routing Module
import { AppRoutingModule } from './app-routing.module';

//Material-Angular Components
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { TestComponent } from './test/test.component';
import { ExpenseFormComponent } from './expense/expense.component';
import { ITooltipModule } from './directives/i-tooltip/i-tooltip.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent,
    IncomeComponent,
    ExpenseComponent,
    TestComponent,
    ExpenseFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatBottomSheetModule,
    AppRoutingModule,
    ITooltipModule
  
  ],
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter}],
  entryComponents: [ExpenseFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
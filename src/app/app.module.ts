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
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule} from '@angular/material/expansion';
// import { CdkAccordionModule} from '@angular/cdk/accordion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { IncomeComponent } from './income/income.component';
import { TestComponent } from './test/test.component';
import { ExpenseComponent, ExpenseFormComponent } from './expense/expense.component';
import { IncomeFormComponent } from './income/income.component';
import { ITooltipModule } from './directives/i-tooltip/i-tooltip.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryComponent,
    IncomeComponent,
    ExpenseComponent,
    ExpenseFormComponent,
    TestComponent,
    IncomeFormComponent,
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
    MatBadgeModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    ITooltipModule,
    MatExpansionModule,
    // CdkAccordionModule
    
  
  ],
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter}],
  entryComponents: [ExpenseFormComponent, IncomeFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
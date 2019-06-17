import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../data.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IExpense, ICategory } from '../models';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

    expenses: IExpense[];

    constructor(private ds: DataService,
                private bottomSheet: MatBottomSheet,
                private r2: Renderer2) { }

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.ds.getExpenses().subscribe((data) => {
            this.expenses = data;
        });
    }

    getDates() {
        let _dates = [];
        this.expenses.forEach( e => {
            let _date = new Date( e.date );
            _dates.push( _date.toISOString().substring(0,10) );
        });
        return [...new Set(_dates)];
    }
    getExpenses( date ) {
        let _expenses = [];
        this.expenses.forEach( e => {
            let _date = new Date( e.date );
            if ( _date.toISOString().substring(0,10) === date ) {
                _expenses.push( e );
            }
        });
        return _expenses;        
    }

    addExpense() {
        const ref = this.bottomSheet.open(ExpenseFormComponent);
        ref.afterDismissed().subscribe(() => {
            this.getData();
        }

        )
    }

    swipe( exp, eventType, el) {
        console.log( eventType)
        console.log( el._element.nativeElement)
        if ( eventType === "swipeleft") {
            this.r2.setAttribute(el._element.nativeElement, "style", `--swipe-button-width: 150px`);
        } else {
            this.r2.setAttribute(el._element.nativeElement, "style", `--swipe-button-width: 0`);
        }
    }
    swOnTap( exp, el) {
        console.log( "onTap")
        console.log( el)

        this.r2.setAttribute(el._element.nativeElement, "style", `--swipe-button-width: 0`);
    }

}

@Component({
    selector: 'app-expense-form',
    templateUrl: 'expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']

})
export class ExpenseFormComponent {

    xForm: FormGroup;

    constructor(private fb: FormBuilder,
        private ds: DataService,
        private expenseFormRef: MatBottomSheetRef<ExpenseFormComponent>) { }

    ngOnInit() {
        this.createForm()
    }

    createForm() {
        let tmpDate = new Date();

        let hoy = tmpDate.toISOString().substring(0,10);
        this.xForm = this.fb.group({
            date: [hoy],
            amount: [],
            descrip: [''],
            category: ['']
        });

    }

    saveForm() {
        if (this.xForm.get("amount").value && this.xForm.get("amount").value !== 0) {
            let _category: ICategory = {
                Id: parseInt(this.xForm.get("category").value,10), 
                descrip: '', 
                active: true 
            }
            let formData: IExpense = {
                id: 0,
                date: new Date(), //this.xForm.get("date").value,
                amount: this.xForm.get("amount").value,
                descrip: this.xForm.get("descrip").value,
                category: _category,
                active: true
            }

            this.ds.saveExpense(formData).subscribe((data) => {
                console.log("grabado");
                this.expenseFormRef.dismiss();
            });
        }
    }
    closeForm() {
        this.expenseFormRef.dismiss();
    }

}


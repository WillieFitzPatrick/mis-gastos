import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IExpense } from '../models';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

    expenses: IExpense[];

    constructor(private ds: DataService,
        private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.ds.getExpenses().subscribe((data) => {
            this.expenses = data;
        });
    }

    addExpense() {
        const ref = this.bottomSheet.open(ExpenseFormComponent);
        ref.afterDismissed().subscribe(() => {
            this.getData();
        }

        )
    }
}

@Component({
    selector: 'app-expense-form',
    templateUrl: 'expense-form.component.html',
    styleUrls: ['./expense-form.component.scss']

})
export class ExpenseFormComponent {
    // fecha: string;
    // importe: number;
    // descrip: string;
    // categoria: string;
    xForm: FormGroup;
    constructor(private fb: FormBuilder,
        private ds: DataService,
        private expenseFormRef: MatBottomSheetRef<ExpenseFormComponent>) { }

    ngOnInit() {
        this.createForm()
    }
    createForm() {
        let tmpDate = new Date();
        let hoy = tmpDate.getDate() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();

        this.xForm = this.fb.group({
            date: [hoy],
            amount: [0],
            descrip: [''],
            category: ['']
        });

    }
    // saveForm(event: MouseEvent): void {
    //   this.expenseFormRef.dismiss();
    //   event.preventDefault();
    // }


    saveForm() {
        if (this.xForm.get("amount").value && this.xForm.get("amount").value !== 0) {
            let formData: IExpense = {
                id: 0,
                date: new Date(), //this.xForm.get("date").value,
                amount: this.xForm.get("amount").value,
                descrip: this.xForm.get("descrip").value,
                category: { Id: 0, descrip: '', active: true },
                active: true
            }

            this.ds.saveExpense(formData).subscribe((data) => {
                console.log("grabado");
                this.expenseFormRef.dismiss();
            });
        }
    }

}
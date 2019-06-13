import { Component, OnInit } from '@angular/core';
import { IIncome } from '../models';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

    incomes: IIncome[];

    constructor(private ds: DataService,
        private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.ds.getIncomes().subscribe((data) => {
            this.incomes = data;
        });
    }
    addIncome() {
        const ref = this.bottomSheet.open(IncomeFormComponent);
        ref.afterDismissed().subscribe(() => {
            this.getData();
        }

        )
    }
}


@Component({
    selector: 'app-income-form',
    templateUrl: 'income-form.component.html',
    styleUrls: ['./income-form.component.scss']
})

export class IncomeFormComponent {
    // fecha: string;
    // importe: number;
    // descrip: string;
    xForm: FormGroup;
    constructor(private fb: FormBuilder,
        private ds: DataService,
        private incomeFormRef: MatBottomSheetRef<IncomeFormComponent>) { }

    ngOnInit() {
        this.createForm()
    }
    createForm() {
        let tmpDate = new Date();
        let hoy = tmpDate.getDate() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();

        this.xForm = this.fb.group({
            date: [hoy],
            amount: [0],
            descrip: ['']
        });

    }
    saveForm() {
        if (this.xForm.get("amount").value && this.xForm.get("amount").value !== 0) {
            let formData: IIncome = {
                id: 0,
                date: new Date(), //this.xForm.get("date").value,
                amount: this.xForm.get("amount").value,
                descrip: this.xForm.get("descrip").value,
                mode: "m",
                confirmed: true,
                active: true
            }

            this.ds.saveIncome(formData).subscribe((data) => {
                console.log("grabado");
                this.incomeFormRef.dismiss();
            });
        }
    }
}


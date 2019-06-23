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
    tappedIncome: IIncome = null;

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

    getIncomes( confirmado: boolean ) {
        let _incomes = [];
        this.incomes.forEach( e => {
            if ( e.confirmed === confirmado ) {
                _incomes.push( e );
            }
        });
        return _incomes;        
    }


    addIncome() {
        const ref = this.bottomSheet.open(IncomeFormComponent);
        ref.afterDismissed().subscribe(() => {
            this.getData();
        }

        )
    }
    swOnTap( income ) {
        // console.log( this.el)
        // console.log( this.el.nativeElement)
        console.log( "swOnTap")
        console.log( income)
        this.tappedIncome = (!this.tappedIncome) ? income : null;
        //this.r2.setAttribute( this.el.nativeElement, "style", `--swipe-button-width: 150px`);
    }

    swipe( exp, eventType, el) {
        // console.log( eventType)
        // console.log( el._element.nativeElement)
        // if ( eventType === "swipeleft") {
        //     this.r2.setAttribute(el._element.nativeElement, "style", `--swipe-button-width: 150px`);
        // } else {
        //     this.r2.setAttribute(el._element.nativeElement, "style", `--swipe-button-width: 0`);
        // }
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


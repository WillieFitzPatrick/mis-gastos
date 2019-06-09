import { Component, OnInit } from '@angular/core';
import { IIncome } from '../models';
import { DataService } from '../data.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

    incomes: IIncome[];
    
    constructor( private ds: DataService,
        private bottomSheet: MatBottomSheet ) { }

    ngOnInit() {
        this.getData();
    }
    getData(){
        this.ds.getIncomes().subscribe( (data) => {
          this.incomes = data;
        });
      }
      addIncome(){}

//     addIncome(tipo) {
//         if (tipo === 1) {
//             alert("Nuevo Income Unico!");
//         } else {

//             alert("Nuevo Income Fijo!");
//         }
//     }

}

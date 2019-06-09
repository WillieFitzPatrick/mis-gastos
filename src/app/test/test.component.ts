import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  fecha: string;
  importe: number;
  descrip: string;
  expenses;
  categoria: string;
  constructor( private ds: DataService) { }

  ngOnInit() {
    let tmpDate = new Date();
    // this.fecha = tmpDate.getFullYear() + "-" +tmpDate.getMonth() + '-' + tmpDate.getDate();
    this.fecha = tmpDate.getDate() + "/" + tmpDate.getMonth() + "/" + tmpDate.getFullYear();
    this.importe = 0;
    this.descrip = "";
    this.ds.getExpenses().subscribe( (data) => {
      this.expenses = data;
    });

  }

  addExpense(){
    alert("Nuevo Expense");
  }

}

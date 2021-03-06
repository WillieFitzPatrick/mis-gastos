import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExpense, ISummary, IIncome } from './models';

const URL = "http://misgastos.swapps.com.ar/api/"
// const URL = "https://localhost:5001/"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers = new HttpHeaders().set('Content-Type', 'application/json')
                             .set('Accept', 'application/json')

  constructor( private http: HttpClient) { }

  getExpenses() {

    return this.http.get<IExpense[]>(URL + 'expenses');
  }
  getIncomes() {

    return this.http.get<IIncome[]>(URL + 'incomes');
  }
  getSummary() {

    return this.http.get<ISummary>(URL + 'summary');
  }
  saveExpense( expense: IExpense) {
    return this.http.post(URL + 'expenses', 
                          JSON.stringify(expense),
                          { headers: this.headers });
  }
  saveIncome( income: IIncome) {
    return this.http.post(URL + 'incomes', 
                          JSON.stringify(income),
                          { headers: this.headers });
  }
}

//http://misgastos.swapps.com.ar/api/expenses
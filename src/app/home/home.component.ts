import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ISummary, ISummaryDay } from '../models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedTab: number = 0;
  summary: ISummary;
  days: ISummaryDay[] = []
  slideIndex: number = 0;
  constructor(private ds: DataService) { }

  ngOnInit() {
    this.summary = null;
      this.getData();
  }

  getData() {
    this.summary = null;
    this.ds.getSummary().subscribe((data) => {
        //inicializo los dias
        let _today = new Date();
        let _isoToday = _today.toISOString();
        for (let i=0; i<=6;i++) 
        {
            let _day = new Date(data.inicio);
            let _isoDay = _day.toISOString();

            try {
                _day.setDate(  (_day.getDate() + i) );
                _isoDay = _day.toISOString();
            } catch {
                console.warn("Error seting _date for further retrieve _expense for slider")
            }

            try {
                if (_isoDay.substring(0,10) === _isoToday.substring(0,10)) {
                    this.slideIndex = (i === 6) ? 5 : i;
                }
            } catch {
                console.warn("Error seting current index of slider")
            }

            let _expense = 0;
            try {

                let day;
                for (day of data.SummaryDays) {
                    if (day.date.toString().substring(0,10) === _isoDay.substring(0,10)){
                        _expense = _expense + day.expense;
                        break;
                    }
                }
            } catch {
                console.warn("Error geting _expense from SummaryDays for slider")

            }

            this.days.push( {date: _day , expense: (_expense || 0) })
        }      

        this.summary = data;
        console.log( "summary is ready")
    });
}
}

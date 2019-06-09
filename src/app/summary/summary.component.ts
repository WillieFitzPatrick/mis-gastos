import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { ISummary, ISummaryDay } from '../models';
import { lory, Lory } from 'lory.js';
import { isMobile } from '../utils';
import { ConsoleReporter } from 'jasmine';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

    private slider: ElementRef;
    private prev: ElementRef;
    private next: ElementRef;
    @ViewChild("slider", { static: false }) set sliderElRef(slider: ElementRef) {
        this.slider = slider;
        //setup the slider
        setTimeout( () => {
            this.lorySlider = lory( this.slider.nativeElement, { infinite: false, slidesToScroll: 2 });

            if (isMobile()) {
                this.r2.setStyle(  this.prev.nativeElement, "display", "none");
                this.r2.setStyle(  this.next.nativeElement, "display", "none");
            }
        },100);


    }

    @ViewChild("prev", { static: false }) set prevElRef(prev: ElementRef) {
      this.prev = prev;
    }
    @ViewChild("next", { static: false }) set nextElRef(next: ElementRef) {
      this.next = next;
    }

    summary: ISummary;
    lorySlider: any;
    dias: ISummaryDay[] = []

    constructor(private ds: DataService,
                private r2: Renderer2) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.ds.getSummary().subscribe((data) => {
            //inicializo los dias
            for (let i=0; i<=6;i++) 
            {
                let _date = new Date(data.inicio);
                let _isoDate = _date.toISOString();
                try {
                    _date.setDate(  (_date.getDate() + i) );
                    _isoDate = _date.toISOString();
                } catch {
                    
                }
                let _expense = 0;
                try {

                    let day;
                    for (day of data.SummaryDays) {
                        if (day.date.toString().substring(0,10) === _isoDate.substring(0,10)){
                            _expense = _expense + day.expense;
                            break;
                        }
                    }
                } catch {
                }

                this.dias.push( {date: _date , expense: (_expense || 0) })
            }      

            this.summary = data;
            
        });
    }

}

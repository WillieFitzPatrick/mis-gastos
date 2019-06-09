import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ISummary } from '../models';
import { lory, Lory } from 'lory.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit {
  @ViewChild("jsSlider",{static: false}) slider: ElementRef;
  summary: ISummary;
  lorySlider: any;
  dias = [
    {dia: 1},
    {dia: 2},
    {dia: 3},
    {dia: 4},
    {dia: 5},
    {dia: 6},
    {dia: 7}
  ]
  constructor(private ds: DataService) { }

  ngOnInit() {
   
    this.getData();
  }

  ngAfterViewInit() {
    this.lorySlider = lory( this.slider.nativeElement, {
      // infinite: 1,
      // slidesToScroll: 2
      infinite: 1,
      slidesToScroll: 1
      // method: {},
      // event: {
      //   init: function (event, lory) {
      //   },
      //   beforeSlide: function(slideindex) {
      //   },
      //   afterSlide: function(slideIndex) {
      //   },
      //   reInit: function() {},
      //   resize: function() {},
      //   destroy: function() {}
      // }

    });
 
  }

  getData(){
    this.ds.getSummary().subscribe( (data) => {
      console.log(data[0]);
      this.summary = data[0];
    });
  }

}

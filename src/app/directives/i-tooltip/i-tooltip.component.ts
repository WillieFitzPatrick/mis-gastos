import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {  } from '@angular/compiler/src/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "i-tooltip-box",
    template: `
        <div class="i-tooltip-box">
            <div class="i-tooltip-box-close-btn" (click)="closeTooltip()">x</div>
            <div class="i-tooltip-text" [innerHTML]="text"></div>
        </div>
   `,
   styles: [`

        .i-tooltip-box {
            width: 100%;
            max-width: 260px;
            margin-left: 0px;
            left: calc( calc( 100% / 2 ) - 130px );
            min-height: 100px;
            border: 1px solid gray;
            border-radius: 3px;
            background: #eee;
            z-index: 1;
            position: absolute;
            padding: 7px;

            -webkit-box-shadow: 10px 10px 8px -7px #777;
            -moz-box-shadow: 10px 10px 8px -7px #777;
            box-shadow: 10px 10px 8px -7px #777;

        }
        .i-tooltip-box .i-tooltip-text .link {width: 100%; text-align: end;}
        .i-tooltip-box .i-tooltip-text h3 {font-size: 20px;}
        .i-tooltip-box .i-tooltip-text h4 {font-size: 14px;}
        .i-tooltip-box .i-tooltip-text h5 {font-size: 12px;}
        .i-tooltip-box .i-tooltip-text p  {font-size: 14px;}
        .i-tooltip-box .i-tooltip-text ul {margin-top: 10px; margin-left: 0px;}
        .i-tooltip-box .i-tooltip-text li {margin-left: 20px; color: rgb(77, 77, 78);}
        .i-tooltip-box .i-tooltip-text a {
            color: rgb(71, 71, 248);
            font-size: 12px;
            text-decoration: none;
            cursor: pointer;
        }
        .i-tooltip-box-close-btn {
            border: 1px solid black;
            width: 19px;
            height: 19px;
            border-radius: 50%;
            background: #7f7fd2;
            color: #fff;
            font-size: 15px;
            font-weight: 800;
            margin-right: 100px;
            right: -105px;
            position: absolute;
            top: -9px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

   `],
})
export class ITooltipComponent {
    @Input() text: string = "This is the text of the tooltip";
    @Output("onClose") onClose: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    closeTooltip() {
        this.onClose.emit(true);
    }
}
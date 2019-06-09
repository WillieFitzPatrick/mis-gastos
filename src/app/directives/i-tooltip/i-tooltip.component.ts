import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "tooltip-box",
    template: `
    <div class="i-tooltip-box">
        <div class="i-tooltip-box-close-btn" (click)="closeTooltip()"></div>
        <div class="i-tooltip-text" [innerHTML]="text"></div>
    </div>
   `
})
export class ITooltipComponent {
    @Input() text: string = "This is the text of the tooltip";
    @Output("onClose") onClose: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    closeTooltip() {
        this.onClose.emit(true);
    }
}
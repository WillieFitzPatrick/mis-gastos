import { NgModule, Directive, Input, Renderer2, ElementRef, ComponentFactoryResolver, ComponentFactory, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITooltipComponent } from './i-tooltip.component';
import { ITooltipService } from './i-tooltip.service';

@Directive({
    selector: '[i-tooltip]'
})
export class ITooltipDirective {
    @Input("i-tooltip-key") tooltipKey: string = "";
    tooltipRef: ElementRef;
    componentRef: any;
    _closeSbs: Subscription;
    constructor(
        private el: ElementRef,
        private r2: Renderer2,
        private resolver: ComponentFactoryResolver,
        private vcRef: ViewContainerRef,
        private ttService: ITooltipService
    ) {

        vcRef.constructor.name === "ViewContainerRef_"; // true
    }

    ngOnInit() {
        // Add the tooltip icon to the container element
        const tooltip = this.r2.createElement('span');
        this.r2.addClass(tooltip, 'i-tooltip');

        this.r2.listen(tooltip, 'click', (e) => { this.onClick(e) });
        this.r2.appendChild(this.el.nativeElement, tooltip);
        this.tooltipRef = tooltip;
    }

    onClick(e) {

        //Close active tooltip if there is one
        let _vcRef = this.ttService.getRef();
        if (_vcRef) {
            _vcRef.clear();
            _vcRef = null;
        }

        //Save a vcRef for future closing if new is opened
        this.ttService.saveRef(this.vcRef);

        const factory: ComponentFactory<ITooltipComponent> = this.resolver.resolveComponentFactory(ITooltipComponent);
        this.componentRef = this.vcRef.createComponent(factory);


        // get the Tooltip Text and pass it to the component
        this.componentRef.instance.text = this.ttService.getTooltipText( this.tooltipKey );
        this._closeSbs = this.componentRef.instance.onClose.subscribe(() => { this.onClose() });

    }

    onClose() {
        this._closeSbs.unsubscribe();
        this.vcRef.clear();
        this.ttService.delRef();
    }
}

@NgModule({
    imports: [],
    declarations: [ITooltipComponent, ITooltipDirective],
    entryComponents: [ITooltipComponent],
    exports: [ITooltipDirective]
})
export class ITooltipModule { }


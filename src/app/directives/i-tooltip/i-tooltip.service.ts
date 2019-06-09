
import { Injectable } from '@angular/core';

export interface ITooltip {
  key: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})


export class ITooltipService {
  _ref: any;
  tooltips: ITooltip[] = [
       {key: 'ingresos-periodo', 
        text: `<h3>Ingresos</h3>
              <p>Total de los <b>Ingresos</b> del Periodo</p>
              <div>
                 
                 <ul>Tipos :
                    <li>Ingresos Autom&aacute;ticos</li>
                    <li>Ingresos Manuales</li>
                  </ul>
                </div>
                <div class="link"><a href="http://www.swapps.com.ar" target="_blank">ver mas ...</a></div>
                `},
       {key: 'gastos-periodo',  
        text: `<h3>Egresos</h3>
               <p>Total de los <b>Egresos</b> del Periodo</p>
               <div>
                  
                  <ul>Tipos :
                     <li>Ingresos Autom&aacute;ticos</li>
                     <li>Ingresos Manuales</li>
                   </ul>
                 </div>
                 <div class="link"><a href="http://www.swapps.com.ar" target="_blank">ver mas ...</a></div>
                 `},
  ]
  constructor() { }

  getTooltipText( _key: string ): string {
      const tt = this.tooltips.find( (e) => { return e.key === _key });
      return (tt) ? tt.text : "";
  }
  saveRef( ref: any ): any {
      this._ref = ref;
      return null;
  }
  delRef( ): any {
      this._ref = null;
      return null;
  }
  getRef( ): any {
      return this._ref ? this._ref : null;
  }

}

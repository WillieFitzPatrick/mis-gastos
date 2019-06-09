
import { Injectable } from '@angular/core';

export interface ITooltip {
  key: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})


export class ITooltipService {
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
      console.log( tt )
      return (tt) ? tt.text : "";
  }

}
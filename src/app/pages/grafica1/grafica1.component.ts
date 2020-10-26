import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels2: Label[] = ['Sales', 'Sales', 'Sales'];
  public data2 = [[300, 150, 200]];
}

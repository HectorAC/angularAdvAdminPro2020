import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
  styles: [],
})
export class DonutsComponent {
  @Input() title = 'Sin titulo';

  // tslint:disable-next-line: no-input-rename
  @Input('labels') doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  // tslint:disable-next-line: no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] },
  ];
}

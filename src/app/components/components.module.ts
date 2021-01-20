import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutsComponent } from './donuts/donuts.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [IncrementadorComponent, DonutsComponent, ModalImagenComponent],
  exports: [IncrementadorComponent, DonutsComponent, ModalImagenComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}

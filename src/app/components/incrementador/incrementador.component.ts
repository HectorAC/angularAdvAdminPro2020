import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() recibeValor = 0;
  @Input() btnClass = 'btn-primary';

  @Output() emiteValor: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  onChange(newValue: number): void {
    /* newValue >= 100
      ? (this.recibeValor = 100)
      : newValue <= 0
      ? (this.recibeValor = 0)
      : (this.recibeValor = newValue); */
    this.recibeValor = newValue;
    this.emiteValor.emit(this.recibeValor);
  }

  cambiarValor(valor: number): void {
    this.recibeValor += valor;

    if (this.recibeValor > 100 || this.recibeValor < 0) {
      this.recibeValor -= valor;
    }

    this.emiteValor.emit(this.recibeValor);
  }
}

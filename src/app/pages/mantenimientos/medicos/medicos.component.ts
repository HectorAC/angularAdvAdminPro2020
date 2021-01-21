import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../components/modal-imagen/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando = true;

  public imgSubir: Subscription;

  constructor(private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubir.unsubscribe();
  }

  ngOnInit(): void {
    this.getMedicos();

    this.imgSubir = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(() => {
        this.getMedicos();
      });
  }

  getMedicos() {
    this.cargando = true;
    this.medicoService.getMedicos()
      .subscribe(res => {
        this.medicos = res;
        this.cargando = false;
      });
  }

  putMedico(medico: Medico) {
    this.medicoService.putMedico(medico)
      .subscribe(res => {
        swal.fire('Guardado', medico.nombre, 'success');
      });
  }


  deleteMedico(medico: Medico) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico._id)
          .subscribe(res => {
            Swal.fire(
              'Deleted!',
              `${medico.nombre} fue eliminado`,
              'success'
            );
            this.getMedicos();
          });
      }
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.medicos = [...this.medicosTemp];
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe((res: Medico[]) => {
        this.medicos = res;
      });
  }

}

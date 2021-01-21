import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../components/modal-imagen/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando = true;

  public imgHosp: Subscription;

  constructor(private hospitalService: HospitalesService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgHosp.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgHosp = this.modalImagenService.nuevaImagen
      .subscribe(() => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        console.log(hospitales);
        this.cargando = false;

        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }

  putHospital(hospital: Hospital) {
    this.hospitalService.putHospital(hospital._id, hospital.nombre)
      .subscribe(res => {
        swal.fire('Guardado', hospital.nombre, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(res => {
        this.cargarHospitales();
        swal.fire('Borrado', hospital.nombre, 'success');
      });
  }

  async abrirSwal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ponga el nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.postHospital(value)
        .subscribe((res: any) => {
          swal.fire('Guardado', value, 'success');
          this.hospitales.push(res.hospital);
        });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.hospitales = [...this.hospitalesTemp];
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe((res: Hospital[]) => {
        this.hospitales = res;
      });
  }

}

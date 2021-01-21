import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from '../../../services/hospitales.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalesService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.getMedicoById(id));


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.getHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        
        this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === hospitalId);
      });
  }

  getHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe((res: Hospital[]) => {
        this.hospitales = res;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // actualizar

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoService.putMedico(data)
        .subscribe((res: any) => {
          swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        });
    } else {
      // guardar
      this.medicoService.postMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }

  getMedicoById(id: string) {

    if (id === 'nuevo') {
      return;
    }
    this.medicoService.getMedicoById(id)
      .pipe(
        delay(1000)
      )
      .subscribe(res => {
        if (!res) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, hospital: { _id } } = res;
        this.medicoSeleccionado = res;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }
}

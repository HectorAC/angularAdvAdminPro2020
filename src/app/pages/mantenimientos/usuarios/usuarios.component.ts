import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { ModalImagenService } from '../../../components/modal-imagen/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde = 0;
  public cargando = true;


  constructor(private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService,
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  
  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        console.log(img);
        this.cargarUsuarios();
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        console.log(usuarios);
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    } else {
      this.cargarUsuarios();
    }
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.usuarios = [...this.usuariosTemp];
    }
    this.busquedasService.buscar('usuarios', termino)
      .subscribe((res: Usuario[]) => {
        this.usuarios = res;
      });
  }

  eliminar(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.usuario.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

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
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(res => {
            Swal.fire(
              'Deleted!',
              `${usuario.nombre} fue eliminado`,
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });
  }

  changeRole(us: Usuario) {
    this.usuarioService.guardarUsuario(us)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fu: FileUploadService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe((res: any) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        swal.fire('Actualizado', 'Cambios realizados', 'success');
      }, (err) => {
        swal.fire('Error', err.error.msg, 'error');
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }

  subirImagen() {
    this.fu.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        swal.fire('Actualizado', 'Cambios realizados', 'success');
      }).catch((err) => {
        swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}

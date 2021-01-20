import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from './modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService, private fu: FileUploadService) { }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

    this.imagenSubir = null;
  }

  subirImagen() {

    const id = this.modalImagenService.uid;
    const tipo = this.modalImagenService.tipo;

    this.fu.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        swal.fire('Actualizado', 'Cambios realizados', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch((err) => {
        swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}

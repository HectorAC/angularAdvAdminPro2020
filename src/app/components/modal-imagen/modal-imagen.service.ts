import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { FileUploadService } from '../../services/file-upload.service';
import swal from 'sweetalert2';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private ocultarModal = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public uid: string;
  public img?: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient, private fu: FileUploadService) { }


  get ocultarModel() {
    return this.ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    uid: string,
    img: string = 'no-img'
  ) {
    this.ocultarModal = false;
    this.tipo = tipo;
    this.uid = uid;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this.ocultarModal = true;
  }

  actualizarImagen(img: File, tipo) {
    this.fu.actualizarFoto(img, tipo, this.uid)
      .then(() => {
        swal.fire('Actualizado', 'Cambios realizados', 'success');
      }).catch((err) => {
        swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }


}

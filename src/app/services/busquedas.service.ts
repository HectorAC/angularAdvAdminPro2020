import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(res: any[]): Usuario[] {
    return res.map(user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid));
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(res.resultados);
            case 'hospitales':
              return this.transformarUsuarios(res.resultados);
            case 'medicos':
              return this.transformarUsuarios(res.resultados);
          }
        })
      );
  }
}

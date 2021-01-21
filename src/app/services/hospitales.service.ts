import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient) {
  }

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

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        map((res: { ok: boolean, hospitales: Hospital[] }) => res.hospitales)
      );
  }

  postHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }

  putHospital(uid: string, nombre: string) {
    const url = `${base_url}/hospitales/${uid}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  deleteHospital(uid: string) {
    const url = `${base_url}/hospitales/${uid}`;
    return this.http.delete(url, this.headers);
  }


}

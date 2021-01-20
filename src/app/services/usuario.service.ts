import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  googleInit() {
    return new Promise((resolve: any) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '923662529312-a65mv2hr4q2knb597khf8urpqk5m6vls.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    });
  }

  verificaToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((res: any) => {
        const { nombre, email, password, img = '', google, role, uid } = res.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.usuario.imprimirUsuario();
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  // mejor crear una interfaz
  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios/?desde=${desde}`;
    /* return this.http.get<{ total: number, usuarios: Usuario[] }>(url, this.headers); */
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        //delay(5000),
        map(res => {
          const usuarios = res.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );

          return {
            total: res.total,
            usuarios
          };
        })
      );
  }

  eliminarUsuario(us: Usuario) {
    const url = `${base_url}/usuarios/${us.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(data: Usuario) {
    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);
  }




}

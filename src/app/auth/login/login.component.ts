import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.renderButton();
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(res => {

        if (this.loginForm.get('remember').value == true) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
        console.log(res);
      }, (err) => {
        swal.fire('Error', err.error.mensaje, 'error')
      })
    console.log(this.loginForm.value);
  }


  onSuccess(googleUser) {
    console.log(googleUser);
  }

  onFailure(error) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  };

  async startApp() {

    this.auth2 = await this.usuarioService.googleInit();

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;

        this.usuarioService.loginGoogle(id_token)
          .subscribe(res => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          })
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}

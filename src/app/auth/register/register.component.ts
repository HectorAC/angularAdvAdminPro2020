import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['asdf', [Validators.required, Validators.minLength(3)]],
    email: ['aasdf@gmail.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    password2: ['123', Validators.required],
    terminos: [false, Validators.requiredTrue],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);
    
    if (this.registerForm.valid) {
      console.log('enviado');
      //realizar post
      this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(res => {
          console.log('usuario creado');
          console.log(res);
          this.router.navigateByUrl('/');
        }, (err) => {
          swal.fire('Error', err.error.msg, 'error');
        });
    } else {
      console.log('form no correcto...');
    }


  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsNoValidos() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return pass1 !== pass2 && this.formSubmitted ? true : false;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      pass1Control.value === pass2Control.value ?
        pass2Control.setErrors(null) :
        pass2Control.setErrors({ noEsIgual: true });
    }
  }
}

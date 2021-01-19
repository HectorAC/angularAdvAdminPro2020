import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .has-arrow.waves-effect.waves-dark.active {
        background-color: transparent;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit(): void { }
}

import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

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

  menuItems: any[];

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    this.menuItems = sidebarService.menu;
  }

  logout() {
    this.usuarioService.logout();
  }


  ngOnInit(): void { }
}

import { Component } from '@angular/core';
import { AutentikacijaService } from '../service/autentikacija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public service: AutentikacijaService, private router: Router) {}

  logout(){
    this.service.setUserType("gost");
  }
}

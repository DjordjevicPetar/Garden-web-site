import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  korIme: string = "";
  lozinka: string = "";
  message: string = "";

  constructor(private router: Router, private service:KorisnikService, private authService: AutentikacijaService){authService.setUserType("gost")}

  login(){
    this.service.login(this.korIme, this.lozinka).subscribe(arg => {
      if(arg == null){
        this.message = "Lose uneseni kredencijali";
        return;
      }
      if(arg.tip == "admin"){
        this.authService.setUserType("admin");
        this.router.navigate(['administrator']);
      }
      this.message = "Ovde se loguju samo admini";
    });
  }
}

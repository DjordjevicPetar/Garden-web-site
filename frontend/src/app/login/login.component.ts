import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { AutentikacijaService } from '../service/autentikacija.service';
import { ZakazivanjaService } from '../service/zakazivanja.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  korIme: string = "";
  lozinka: string = "";
  message: string = "";

  constructor(private router: Router, private service:KorisnikService, private authService: AutentikacijaService, private zakazivanjeService: ZakazivanjaService){
    authService.setUserType("gost")
  }

  login(){
    this.service.login(this.korIme, this.lozinka).subscribe(arg => {
      if(arg == null){
        this.message = "Lose uneseni kredencijali";
        return;
      }
      this.message = "";
      localStorage.setItem("korisnik", JSON.stringify(arg));
      if(arg.status == "Deaktiviran" || arg.status == "Odbijen"){
        this.message = "Vas nalog je blokiran";
        return;
      }
      if(arg.tip == "dekorater"){
        this.zakazivanjeService.dohvatiZakazivanja().subscribe(lista => {
          for (let index = 0; index < lista.length; index++) {
            let sutra = new Date(lista[index].datumKraja);
            sutra.setDate(sutra.getDate() + 1);
            if(lista[index].prihvacenoOd == this.korIme && lista[index].slikaZavrsetka == "" && new Date().valueOf() > sutra.valueOf()){
              this.service.promeniStatus(this.korIme, "Blokiran").subscribe();
              break;
            }
          }
          this.authService.setUserType("dekorater");
          this.router.navigate(['dekoraterProfil']);
        });
      }
      else if(arg.tip == "vlasnik" && arg.status == "Odobren"){
        this.authService.setUserType("vlasnik");
        this.router.navigate(['vlasnikProfil']);
      }
      else if(arg.tip == "vlasnik" && arg.status != "Odobren"){
        this.authService.setUserType("neregistrovan");
        this.router.navigate(['neregistrovanKorisnik']);
      }
      else this.message = "Admin se ne moze ovde logovati";
    });
    
  }
}

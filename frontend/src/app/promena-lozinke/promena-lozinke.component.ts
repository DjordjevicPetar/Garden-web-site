import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {
  korIme: string = "";
  staraLozinka: string = "";
  novaLozinka: string = "";
  potvrda: string = "";
  poruka: string = "";

  constructor(private router: Router, private userService: KorisnikService, private authService: AutentikacijaService){authService.setUserType("gost");}

  validacija(){
    this.poruka = "";
    if(this.korIme == "" || this.staraLozinka == "" || this.novaLozinka == ""){
        this.poruka += "Morate uneti sve parametre.\n";
      }
    if(this.novaLozinka != this.potvrda)this.poruka += "Potvrda i nova lozinka se ne poklapaju\n";
    let malaSlova = 0;
    let velikaSlova = false;
    let broj = false;
    let spec = false;
    for (let index = 0; index < this.novaLozinka.length; index++) {
      if(this.novaLozinka[index] >= 'A' && this.novaLozinka[index] <= 'Z')velikaSlova = true;
      else if(this.novaLozinka[index] >= 'a' && this.novaLozinka[index] <= 'z')malaSlova++;
      else if(this.novaLozinka[index] >= '0' && this.novaLozinka[index] <= '9')broj = true;
      else spec = true;
    }
    if(this.novaLozinka.length < 6)this.poruka += "Lozinka mora da ima barem 6 karaktera.\n";
    if(this.novaLozinka.length > 10)this.poruka += "Lozinka mora da ima najvise 10 karaktera.\n";
    if(malaSlova < 3)this.poruka += "Lozinka mora da ima barem 3 mala slova.\n";
    if(!velikaSlova)this.poruka += "Lozinka mora da ima barem 1 veliko slova.\n";
    if(!broj)this.poruka += "Lozinka mora da ima barem 1 broj.\n";
    if(!spec)this.poruka += "Lozinka mora da ima barem 1 specijalan karakter.\n";
    if(this.poruka == "")return true;
    return false;
  }

  promeniLozinku(){
    if(this.validacija()){
      this.userService.promeniLozinku(this.korIme, this.staraLozinka, this.novaLozinka
      ).subscribe(arg => {
        if(arg == true)this.router.navigate(['']);
        else this.poruka = "Lose uneseni kredencijali";
      });
      
    }
  }
}

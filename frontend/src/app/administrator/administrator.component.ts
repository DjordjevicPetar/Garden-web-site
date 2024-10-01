import { Component, OnInit } from '@angular/core';
import { korisnici } from '../models/korisnici';
import { KorisnikService } from '../service/korisnik.service';
import { Router } from '@angular/router';
import { firme } from '../models/firme';
import { FirmaService } from '../service/firma.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  listaKorisnika: korisnici[] = [];
  listaFirma: firme[] = [];

  constructor(private router: Router, private userService: KorisnikService, private firmaService: FirmaService, 
    private sanitizer: DomSanitizer, private authService: AutentikacijaService){}

  ngOnInit(): void {
    this.authService.setUserType("admin");
    this.userService.dohvatiKorisnike()
      .subscribe(arg => this.listaKorisnika = arg);
    
    this.firmaService.dohvatiFirme()
      .subscribe(arg => this.listaFirma = arg);
    
  }

  AzurirajKorisnika(korisnik: korisnici){
    localStorage.setItem("azuriraj", JSON.stringify(korisnik));
    this.router.navigate(['azurirajKorisnika']);
  }

  promeniStatus(korIme:string, status: string){
    this.userService.promeniStatus(korIme, status).subscribe();
    window.location.reload();
  }

  dodajDekoratera(){
    this.router.navigate(['dodajDekoratera']);
  }

  dodajFirmu(){
    this.router.navigate(['dodajFirmu']);
  }

  photoURL(lokacija: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(lokacija);
  }

}

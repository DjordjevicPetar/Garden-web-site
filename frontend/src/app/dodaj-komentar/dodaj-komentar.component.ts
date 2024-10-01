import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { zakazivanja } from '../models/zakazivanje';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-dodaj-komentar',
  templateUrl: './dodaj-komentar.component.html',
  styleUrls: ['./dodaj-komentar.component.css']
})
export class DodajKomentarComponent implements OnInit{
  komentar: String = "";
  ocena: number = 0;
  zakazivanje: zakazivanja = new zakazivanja();

  constructor(private router: Router, private zakazivanjeService: ZakazivanjaService, private authService: AutentikacijaService){}

  ngOnInit(): void {
    this.authService.setUserType("vlasnik");
    let x = localStorage.getItem("zakazivanje");
    if(x != null)this.zakazivanje = JSON.parse(x);
  }

  postaviOcenu(ocena: number){
    this.ocena = ocena;
  }

  azuriraj(){
    this.zakazivanje.ocena = this.ocena;
    this.zakazivanje.komentarZavrsetka = this.komentar
    this.zakazivanjeService.azurirajZakazivanje(this.zakazivanje)
      .subscribe();
      this.router.navigate(['arhiva'])
    
  }
}

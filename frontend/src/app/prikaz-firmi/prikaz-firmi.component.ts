import { Component, OnInit } from '@angular/core';
import { firme } from '../models/firme';
import { Router } from '@angular/router';
import { FirmaService } from '../service/firma.service';
import { zakazivanja } from '../models/zakazivanje';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-prikaz-firmi',
  templateUrl: './prikaz-firmi.component.html',
  styleUrls: ['./prikaz-firmi.component.css']
})
export class PrikazFirmiComponent implements OnInit{
  listaFirma: firme[] = [];
  prikazLista: firme[] = [];
  listaZakazivanja: zakazivanja[] = [];
  nazivSort: number = 0;
  adresaSort: number = 0;
  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

  constructor(private router: Router, private firmaService: FirmaService, private zakazivanjaService: ZakazivanjaService, private authService: AutentikacijaService){}

  ngOnInit(): void {
    this.authService.setUserType("vlasnik");
    this.firmaService.dohvatiFirme()
      .subscribe(arg => {
        this.listaFirma = arg
        this.prikazLista = JSON.parse(JSON.stringify(this.listaFirma));
      });
      this.zakazivanjaService.dohvatiZakazivanja().subscribe(arg => this.listaZakazivanja = arg);
  }

  sort(kolona: String){
    if(kolona == "naziv"){
      this.nazivSort = (this.nazivSort + 1) % 3;
      this.adresaSort = 0;
    }
    else if(kolona == "adresa"){
      this.adresaSort = (this.adresaSort + 1) % 3;
      this.nazivSort = 0;
    }
    if(this.adresaSort > 0)this.prikazLista.sort((a, b) => {return a.adresa.localeCompare(b.adresa)});
    if(this.nazivSort > 0)this.prikazLista.sort((a, b) => {return a.naziv.localeCompare(b.naziv)});
    if(this.adresaSort + this.nazivSort == 2)this.prikazLista.reverse();
  }

  pretraga(){
    this.prikazLista = JSON.parse(JSON.stringify(this.listaFirma));
    if(this.pretragaNaziv != "")this.prikazLista = this.prikazLista.filter((firma) => {return firma.naziv.indexOf(this.pretragaNaziv) != -1});
    if(this.pretragaAdresa != "")this.prikazLista = this.prikazLista.filter((firma) => {return firma.adresa.indexOf(this.pretragaAdresa) != -1});
    this.sort("");
  }

  dodajZakazivanje(firma:firme){
    localStorage.setItem("firma", JSON.stringify(firma));
    this.router.navigate(['dodajZakazivanje']);
  }

  prosecnaOcena(firma: firme){
    let sumaOcena = 0;
    let brojOcena = 0;
    for (let index = 0; index < this.listaZakazivanja.length; index++){
      if(this.listaZakazivanja[index].ocena != 0 && this.listaZakazivanja[index].nazivFirme == firma.naziv){
        sumaOcena += this.listaZakazivanja[index].ocena;
        brojOcena++;
      }
    }
    if(brojOcena == 0)return 0;
    return sumaOcena / brojOcena;
  }
}

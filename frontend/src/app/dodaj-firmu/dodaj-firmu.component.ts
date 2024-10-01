import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { FirmaService } from '../service/firma.service';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-dodaj-firmu',
  templateUrl: './dodaj-firmu.component.html',
  styleUrls: ['./dodaj-firmu.component.css']
})
export class DodajFirmuComponent implements OnInit{
  naziv: string = "";
  adresa: string = "";
  usluge: any[][] = [];
  lokacija: string = "";
  kontakt: string = "";
  zaposleni: string[] = [];
  nazivUsluge: string = "";
  cenaUsluge: number = 0;
  poruka: string = "";
  nezaposleni: string[] = [];
  oznacenDekorator: string = "";
  pocetakOdmora: Date = new Date();
  krajOdmora: Date = new Date();

  constructor(private router: Router, private userService: KorisnikService, private firmaService: FirmaService, private authService: AutentikacijaService){}

  ngOnInit(): void {
    let flag = false;
    this.authService.setUserType("admin");
    this.userService.dohvatiKorisnike().subscribe(nizKorisnika => {
      this.firmaService.dohvatiFirme().subscribe(nizFirmi => {
        nizKorisnika.forEach(korisnik => {
          if(korisnik.tip != "dekorater")return;
          flag = false;
          nizFirmi.forEach(firma => {
            if(firma.zaposleni.find(item => item == korisnik.korIme) != undefined){
              flag = true;
              return;
            }
          });
          if(!flag)this.nezaposleni.push(korisnik.korIme);
        })
        if(this.nezaposleni.length)this.oznacenDekorator = this.nezaposleni[0];
      });
    });
    
  }
  
  dodajUslugu(){
    this.poruka = "";
    if(this.nazivUsluge == ""){
      this.poruka += "Naziv usluge ne moze biti prazan string.";
      return;
    }
    if(this.cenaUsluge < 0){
      this.poruka += "Cena ne moze biti negativan broj.";
      return;
    }
    if(this.usluge.find((item) => item[0] == this.nazivUsluge) != undefined){
      this.poruka += "Ne mozete imati vise usluga istog imena";
      return;
    }
    this.usluge.push([this.nazivUsluge, this.cenaUsluge]);
    this.nazivUsluge = "";
    this.cenaUsluge = 0;
  }

  
  izbaciUslugu(usluga: string){
    this.poruka = "";
    this.usluge.splice(this.usluge.findIndex((item) => item[0] == usluga), 1);
  }
  
  dodajZaposlenog(){
    if(this.oznacenDekorator == ""){
      this.poruka = "Odaberi zaposlenog";
      return;
    }
    let index = this.nezaposleni.findIndex(korisnik => korisnik == this.oznacenDekorator);
    this.zaposleni.push(this.nezaposleni[index]);
    this.nezaposleni.splice(index, 1);
    if(this.nezaposleni.length)this.oznacenDekorator = this.nezaposleni[0];
    else this.oznacenDekorator = "";
  }

  izbaciZaposlenog(zaposlen: string){
    let index = this.zaposleni.findIndex(korisnik => korisnik == zaposlen);
    this.nezaposleni.push(this.zaposleni[index]);
    this.zaposleni.splice(index, 1);
  }

  validiraj(){
    this.poruka = "";
    if(this.naziv == "" || this.adresa == "" || this.usluge.length == 0 || this.lokacija == "" || this.kontakt == "")this.poruka += "Moraju se napisati svi parametri.\n";
    if(this.zaposleni.length < 2)this.poruka += "Moraju postojati barem 2 zaposlena.\n";
    if(this.poruka != "")return false;
    return true;
  }

  dodajFirmu(){
    if(this.validiraj() == false)return;
    this.firmaService.dodajFirmu(this.naziv, this.adresa, this.usluge, this.lokacija, this.kontakt, this.zaposleni, this.pocetakOdmora, this.krajOdmora).subscribe(arg => {
      if(arg == true)this.router.navigate(['administrator']);
      else this.poruka = "Nije dozvoljeno unosenje istoimenih firmi.";
    });
    
  }
}

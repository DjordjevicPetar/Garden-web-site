import { Component, EventEmitter, OnInit } from '@angular/core';
import { zakazivanja } from '../models/zakazivanje';
import { Router } from '@angular/router';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { korisnici } from '../models/korisnici';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-zakazivanja',
  templateUrl: './zakazivanja.component.html',
  styleUrls: ['./zakazivanja.component.css']
})
export class ZakazivanjaComponent implements OnInit{

  listaZakazivanja: zakazivanja[] = [];
  ja: korisnici = new korisnici();
  sad: Date = new Date();

  ngOnInit(): void {
    this.authService.setUserType("vlasnik");
    let x = localStorage.getItem('korisnik');
    if(x != null)this.ja = JSON.parse(x);
    this.zakazivanjeService.dohvatiZakazivanjaPoKorisniku(this.ja.korIme)
      .subscribe(arg => {
        this.listaZakazivanja = arg;
        this.listaZakazivanja.sort((a, b) => b.vremePodnosenjaZahteva.valueOf() - a.vremePodnosenjaZahteva.valueOf())
    });
  }

  constructor(private router: Router, private zakazivanjeService: ZakazivanjaService, private authService: AutentikacijaService){}

  promeniKomentar(zakazivanje: zakazivanja){
    localStorage.setItem("zakazivanje", JSON.stringify(zakazivanje));
    this.router.navigate(['dodajKomentar']);
  }

  uporediVreme(datumPrvi: Date, datumDrugi: Date){
    return new Date(datumPrvi).valueOf() < new Date(datumDrugi).valueOf();
  }

  
}

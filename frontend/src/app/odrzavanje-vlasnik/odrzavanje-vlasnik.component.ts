import { Component, OnInit } from '@angular/core';
import { zakazivanja } from '../models/zakazivanje';
import { korisnici } from '../models/korisnici';
import { Router } from '@angular/router';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-odrzavanje-vlasnik',
  templateUrl: './odrzavanje-vlasnik.component.html',
  styleUrls: ['./odrzavanje-vlasnik.component.css']
})
export class OdrzavanjeVlasnikComponent implements OnInit{

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

  brojFontana(listaOblika: String){
    let matches = listaOblika.match(/bigBlueCircle/gi);
    return (matches ? matches.length : 0);
  }

  brojBazena(listaOblika: String){
    let matches = listaOblika.match(/bigBlueRectangle/gi);
    return (matches ? matches.length : 0);
  }

  uporediDatum(datum: number){
    let polaGodine = new Date(datum);
    polaGodine.setMonth(polaGodine.getMonth() + 6);
    return new Date().valueOf() > polaGodine.valueOf();
  }

  posaljiZahtev(zakazivanje: zakazivanja){
    zakazivanje.zahtevOdrzavanje = true;
    this.zakazivanjeService.azurirajZakazivanje(zakazivanje).subscribe(arg => {if(arg)this.ngOnInit;});
    
  }

  uporediVreme(datumPrvi: Date, datumDrugi: Date){
    return new Date(datumPrvi).valueOf() < new Date(datumDrugi).valueOf();
  }

}

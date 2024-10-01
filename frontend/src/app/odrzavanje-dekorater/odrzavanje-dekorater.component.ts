import { Component } from '@angular/core';
import { zakazivanja } from '../models/zakazivanje';
import { korisnici } from '../models/korisnici';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { Router } from '@angular/router';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-odrzavanje-dekorater',
  templateUrl: './odrzavanje-dekorater.component.html',
  styleUrls: ['./odrzavanje-dekorater.component.css']
})
export class OdrzavanjeDekoraterComponent {
  listaZakazivanja: zakazivanja[] = [];
  ja: korisnici = new korisnici();

  ngOnInit(): void {
    this.authService.setUserType("dekorater");
    let x = localStorage.getItem('korisnik');
    if(x != null)this.ja = JSON.parse(x);
    this.zakazivanjeService.dohvatiZakazivanja()
      .subscribe(arg => this.listaZakazivanja = arg);
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

  Odbij(zakazivanje: zakazivanja){
    zakazivanje.zahtevOdrzavanje = false;
    this.zakazivanjeService.azurirajZakazivanje(zakazivanje).subscribe(arg => {
      if(arg)this.ngOnInit;
    });
  }

  Prihvati(zakazivanje: zakazivanja){
    if(new Date(zakazivanje.krajOdrzavanja).valueOf() < new Date().valueOf()){
      alert("Morate uneti datum u buducnosti.");
      return;
    }
    zakazivanje.zahtevOdrzavanje = false;
    this.zakazivanjeService.azurirajZakazivanje(zakazivanje).subscribe(arg => {
      if(arg)this.ngOnInit;
    });
  }
}

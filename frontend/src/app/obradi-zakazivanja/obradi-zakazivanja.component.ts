import { Component, OnInit } from '@angular/core';
import { zakazivanja } from '../models/zakazivanje';
import { Router } from '@angular/router';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { FirmaService } from '../service/firma.service';
import { korisnici } from '../models/korisnici';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-obradi-zakazivanja',
  templateUrl: './obradi-zakazivanja.component.html',
  styleUrls: ['./obradi-zakazivanja.component.css']
})
export class ObradiZakazivanjaComponent implements OnInit{

  listaZakazivanja: zakazivanja[] = [];
  nazivFirme: String = "";
  ja: korisnici = new korisnici();
  sutra: Date = new Date();
  dodataSlika: any;

  ngOnInit(): void {
    this.authService.setUserType("dekorater");
    let x = localStorage.getItem("korisnik");
    if(x != null)this.ja = JSON.parse(x);
    this.sutra.setDate(this.sutra.getDate() + 1);
    this.firmaService.dohvatiFirme().subscribe(arg => {
      for (let index = 0; index < arg.length && this.nazivFirme == ""; index++)
        if(arg[index].zaposleni.findIndex(x => x == this.ja.korIme) != -1)
          this.nazivFirme = arg[index].naziv;
      this.zakazivanjaService.dohvatiZakazivanjaPoFirmi(this.nazivFirme).subscribe(arg => 
        this.listaZakazivanja = arg
      );
    })
  }

  constructor(private router: Router, private zakazivanjaService: ZakazivanjaService, private firmaService: FirmaService, private authService: AutentikacijaService){}

  potvrdi(potvrdjeno: Boolean, zakazivanje: zakazivanja){
    if(this.ja.status == "Blokiran"){
      alert("Ne mozete uzeti novi posao, dok ne upload-ujete sliku uzetog.");
      return;
    }
    if(potvrdjeno){
      if(zakazivanje.datumKraja.valueOf() < new Date().valueOf() || zakazivanje.vremeDolaska.valueOf() > zakazivanje.datumKraja.valueOf()){
        alert("Pogresan datum");
        return;
      }
      zakazivanje.komentarOdbijanja = "";
      zakazivanje.prihvacenoOd = this.ja.korIme;
      this.zakazivanjaService.azurirajZakazivanje(zakazivanje).subscribe();
    }
    else{
      zakazivanje.datumKraja = new Date();
      zakazivanje.odbijeno = true;
      this.zakazivanjaService.azurirajZakazivanje(zakazivanje).subscribe();
    }
  }

  checkTime(date: number) : boolean{
    return new Date(date).getTime() > this.sutra.getTime();
  }

  change(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          // Check the image dimensions
          if (this.isValidSize(img.width, img.height)) {
            this.dodataSlika = img.src;
          } else {
            alert("Lose dimenzije slike.");
            this.dodataSlika = "";
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }
  
  DodajSliku(zakazivanje: zakazivanja){
    if(this.dodataSlika == "" || this.dodataSlika == undefined){
      zakazivanje.slikaZavrsetka = '';
      return;
    }
    else {
      zakazivanje.slikaZavrsetka = this.dodataSlika;
      if(new Date(zakazivanje.datumKraja).valueOf() > new Date().valueOf())zakazivanje.datumKraja = new Date();
      this.zakazivanjaService.uploadImage(zakazivanje).subscribe();
    }
  }

  isValidSize(width: number, height: number): boolean {
    const minSize = 100;
    const maxSize = 300;
    return width >= minSize && width <= maxSize && height >= minSize && height <= maxSize;
  }

}

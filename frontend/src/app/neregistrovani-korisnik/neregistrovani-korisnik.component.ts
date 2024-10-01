import { Component, OnInit } from '@angular/core';
import { firme } from '../models/firme';
import { korisnici } from '../models/korisnici';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { FirmaService } from '../service/firma.service';
import { zakazivanja } from '../models/zakazivanje';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-neregistrovani-korisnik',
  templateUrl: './neregistrovani-korisnik.component.html',
  styleUrls: ['./neregistrovani-korisnik.component.css']
})
export class NeregistrovaniKorisnikComponent implements OnInit{

  listaFirmi: firme[] = [];
  prikazLista: firme[] = [];
  listaKorisnika: korisnici[] = [];
  listaZakazivanja: zakazivanja[] = [];
  listaSlika: zakazivanja[] = [];
  brojBasti: number = 0;
  brojVlasnika: number = 0;
  brojDekoratera: number = 0;
  poslovaDanas: number = 0;
  poslovaSedmice: number = 0;
  poslovaMesec: number = 0;
  nazivSort: number = 0;
  adresaSort: number = 0;
  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

  ngOnInit(): void {
    this.authService.setUserType("neregistrovan");
    this.korisnikService.dohvatiKorisnike().subscribe(arg => {
      this.listaKorisnika = arg;
      for (let index = 0; index < arg.length; index++) {
        if(arg[index].tip == "dekorater" && arg[index].status == "Odobren")this.brojDekoratera++;
        if(arg[index].tip == "vlasnik" && arg[index].status == "Odobren")this.brojVlasnika++;
      }
    });
    this.zakazivanjaService.dohvatiZakazivanja().subscribe(arg => {
      this.listaZakazivanja = arg;
      let juce = new Date();
      juce.setDate(juce.getDate() - 1);
      let prosleNedelje = new Date();
      prosleNedelje.setDate(prosleNedelje.getDate() - 7);
      let prosliMesec = new Date();
      prosliMesec.setMonth(prosliMesec.getMonth() - 1);
      for (let index = 0; index < arg.length; index++) {
        if(arg[index].slikaZavrsetka != ""){
          this.brojBasti++;
          this.listaSlika.push(arg[index]);
        }
        if(new Date(arg[index].vremePodnosenjaZahteva).valueOf() > juce.valueOf())this.poslovaDanas++;
        if(new Date(arg[index].vremePodnosenjaZahteva).valueOf() > prosleNedelje.valueOf())this.poslovaSedmice++;
        if(new Date(arg[index].vremePodnosenjaZahteva).valueOf() > prosliMesec.valueOf())this.poslovaMesec++;
      }
    });
    this.firmaService.dohvatiFirme()
      .subscribe(arg => {
        this.listaFirmi = arg
        this.prikazLista = JSON.parse(JSON.stringify(this.listaFirmi));
      }); 
  }

  constructor(private router: Router, private korisnikService: KorisnikService, private zakazivanjaService: ZakazivanjaService, private firmaService: FirmaService,
    private authService: AutentikacijaService
  ){}

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
    this.prikazLista = JSON.parse(JSON.stringify(this.listaFirmi));
    if(this.pretragaNaziv != "")this.prikazLista = this.prikazLista.filter((firma) => {return firma.naziv.indexOf(this.pretragaNaziv) != -1});
    if(this.pretragaAdresa != "")this.prikazLista = this.prikazLista.filter((firma) => {return firma.adresa.indexOf(this.pretragaAdresa) != -1});
    this.sort("");
  }

  nadjiZaposleni(korIme: string): korisnici{
    let pos = this.listaKorisnika.findIndex(a => a.korIme.localeCompare(korIme) == 0);
    return this.listaKorisnika[pos];
  }
}

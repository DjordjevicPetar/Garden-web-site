import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zakazivanja } from '../models/zakazivanje';

@Injectable({
  providedIn: 'root'
})
export class ZakazivanjaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/zakazivanja";

  dodajZakazivanje(podnosilacZahteva: String, nazivFime: String, vremeDolaska: Date, kvadraturaBaste: number, tip: String, kvadraturaBazen: number,
    kvadraturaZelenilo: number, kvadraturaLezaljkeStolovi: number, kvadraturaFontane: number, brojStolova: number, brojStolica: number, opis: String,
    odabraneUsluge: any[][], listaOblika: any[]){
    let data = {
      podnosilacZahteva: podnosilacZahteva,
      nazivFirme: nazivFime,
      vremePodnosenjaZahteva: new Date(),
      vremeDolaska: vremeDolaska,
      kvadraturaBaste: kvadraturaBaste,
      tip: tip,
      kvadraturaBazen: kvadraturaBazen,
      kvadraturaZelenilo: kvadraturaZelenilo,
      kvadraturaLezaljkeStolovi: kvadraturaLezaljkeStolovi,
      kvadraturaFontane: kvadraturaFontane,
      brojStolova: brojStolova,
      brojStolica: brojStolica,
      opis: opis,
      odabraneUsluge: odabraneUsluge,
      listaOblika: JSON.stringify(listaOblika),
      datumKraja: new Date(),
      komentarOdbijanja: "",
      prihvacenoOd: "",
      odbijeno: false,
      slikaZavrsetka: "",
      komentarZavrsetka: "",
      ocena: 0,
      zahtevOdrzavanje: false,
      krajOdrzavanja: new Date()
    }
    return this.http.post<boolean>(`${this.uri}/dodajZakazivanje`, data);
  }

  dohvatiZakazivanjaPoFirmi(nazivFime: String){
    let data = {
      nazivFime: nazivFime
    }
    return this.http.post<zakazivanja[]>(`${this.uri}/dohvatiZakazivanjaPoFirmi`, data);
  }

  dohvatiZakazivanjaPoKorisniku(korIme: String){
    let data = {
      korIme: korIme
    }
    return this.http.post<zakazivanja[]>(`${this.uri}/dohvatiZakazivanjaPoKorisniku`, data);
  }

  dohvatiZakazivanja(){
    return this.http.get<zakazivanja[]>(`${this.uri}/dohvatiZakazivanja`);
  }

  azurirajZakazivanje(zakazivanje: zakazivanja){
    return this.http.post<boolean>(`${this.uri}/azurirajZakazivanje`, zakazivanje);
  }

  uploadImage(zakazivanje: zakazivanja){
    return this.http.post<void>(`${this.uri}/azurirajZakazivanje`, zakazivanje);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firme } from '../models/firme';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/firma";

  dohvatiFirme(){
    return this.http.get<firme[]>(`${this.uri}/dohvatiFirme`);
  }

  dodajZaposlenog(korIme: string, firma: string) {
    let data = {
      korIme: korIme,
      firma: firma
    }
    return this.http.post<void>(`${this.uri}/dodajZaposlenog`, data);
  }

  dodajFirmu(naziv: String, adresa: String, usluge: any[][], lokacija: String, kontakt: String, zaposleni: String[], pocetakOdmora: Date, krajOdmora: Date){
    let data = {
      naziv: naziv,
      adresa: adresa,
      usluge: usluge,
      lokacija: lokacija,
      kontakt: kontakt,
      zaposleni: zaposleni,
      pocetakOdmora: pocetakOdmora,
      krajOdmora: krajOdmora
    }
    return this.http.post<boolean>(`${this.uri}/dodajFirmu`, data);
  }

  dodajZakazivanje(nazivFime: String, vremeDolaska: Date, kvadraturaBaste: number, tip: String, kvadraturaBazen: number, kvadraturaZelenilo: number,
      kvadraturaLezaljkeStolovi: number, kvadraturaFontane: number, brojStolova: number, brojStolica: number, opis: String, odabraneUsluge: any[][], listaOblika: any[]){
    let data = {
      nazivFirme: nazivFime,
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
      listaOblika: JSON.stringify(listaOblika)
    }
    return this.http.post<void>(`${this.uri}/dodajZakazivanje`, data);
  }
}

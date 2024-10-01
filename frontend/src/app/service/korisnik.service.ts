import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { korisnici } from '../models/korisnici';
import { firme } from '../models/firme';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/user";

  login(korIme: string, lozinka: string) {
    let data = {
      korIme: korIme,
      lozinka: lozinka
    }
    return this.http.post<korisnici>(`${this.uri}/login`, data);
  }

  dohvatiKorisnika(korIme: string){
    return this.http.post<korisnici>(`${this.uri}/dohvatiKorisnika`, korIme);
  }

  registracijaKorisnika(korIme: string, lozinka: string, ime: string, prezime: string, pol: string, adresa: string, kontaktTelefon: string,
    imejl: string, slika: any, kartica: string, tip: string, status: string){
    let data = {
      korIme: korIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      kontaktTelefon: kontaktTelefon,
      imejl: imejl,
      slika: slika,
      kartica: kartica,
      tip: tip,
      status: status
    }
    return this.http.post<korisnici>(`${this.uri}/register`, data);
  }
  
  dohvatiKorisnike(){
    return this.http.get<korisnici[]>(`${this.uri}/dohvatiKorisnike`);
  }

  promeniStatus(korIme:string, status: string){
    let data = {
      korIme: korIme,
      status: status
    }
    console.log("Wtf");
    return this.http.post<void>(`${this.uri}/promeniStatus`, data);
  }

  azurirajKorisnika(korisnik: korisnici){
    let data = {
      korisnik: korisnik
    }
    return this.http.post<Boolean>(`${this.uri}/azurirajKorisnika`, data);
  }

  promeniLozinku(korIme:string, staraLozinka: string, novaLozinka:string){
    let data = {
      korIme: korIme,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    return this.http.post<Boolean>(`${this.uri}/promeniLozinku`, data);
  }

}

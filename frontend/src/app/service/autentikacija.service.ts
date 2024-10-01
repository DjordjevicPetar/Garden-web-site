import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentikacijaService {

  private userType: string = 'gost';

  constructor() { }

  getUserType(): string {
    return this.userType;
  }

  setUserType(type: string): void {
    this.userType = type;
  }

  jelAdmin(): boolean {
    return this.userType === 'admin';
  }

  jelDekorater(): boolean {
    return this.userType === 'dekorater';
  }

  jelVlasnik(): boolean {
    return this.userType === 'vlasnik';
  }

  jelNeregistrovan(): boolean {
    return this.userType === 'neregistrovan';
  }

  jelGost(): boolean {
    return this.userType === 'gost';
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { korisnici } from '../models/korisnici';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-dekorater-profil',
  templateUrl: './dekorater-profil.component.html',
  styleUrls: ['./dekorater-profil.component.css']
})
export class DekoraterProfilComponent {
  
  korisnik: korisnici = new korisnici();
  poruka: string = "";
  slikaKartice: any;
  pocetnaSlika: any;

  constructor(private router: Router, private userService: KorisnikService, private authService: AutentikacijaService){}

  ngOnInit(): void {
    this.authService.setUserType("dekorater")
    let x = localStorage.getItem("korisnik");
    if(x != null)this.korisnik = JSON.parse(x);
    this.pocetnaSlika = this.korisnik.slika;
    this.proveriKarticu();
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
            this.poruka = "";
            this.korisnik.slika = img.src;
          } else {
            this.korisnik.slika = this.pocetnaSlika;
            this.poruka = 'Image dimensions must be between 100 and 300 pixels!';
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

  isValidSize(width: number, height: number): boolean {
    const minSize = 100;
    const maxSize = 300;
    return width >= minSize && width <= maxSize && height >= minSize && height <= maxSize;
  }

  proveriKarticu(){
    let diners = ["300", "301", "302", "303", "36", "38"];
    let master = ["51", "52", "53", "54", "55"];
    let visa = ["4539", "4556", "4916", "4532", "4929", "4485", "4716"];
    if(this.korisnik.kartica.length == 15){
      for (let index = 0; index < diners.length; index++)
        if(this.korisnik.kartica.startsWith(diners[index])){
          this.slikaKartice = "assets/Diners.png";
          return;
        }
    }
    if(this.korisnik.kartica.length == 16){
      for (let index = 0; index < master.length; index++)
        if(this.korisnik.kartica.startsWith(master[index])){
          this.slikaKartice = "assets/MasterCard.png";
          return;
        }
      for (let index = 0; index < visa.length; index++)
        if(this.korisnik.kartica.startsWith(visa[index])){
          this.slikaKartice = "assets/Visa.png";
          return;
        }
    }
    this.slikaKartice = null;
  }

  validacija(){
    this.poruka = "";
    if(this.korisnik.korIme == "" || this.korisnik.lozinka == "" || this.korisnik.ime == "" || this.korisnik.prezime == "" || this.korisnik.pol == "" ||
      this.korisnik.adresa == "" || this.korisnik.kontaktTelefon == "" || this.korisnik.imejl == "" || this.korisnik.kartica == ""){
        this.poruka += "Morate uneti sve parametre.\n";
      }
    if(this.slikaKartice == null)this.poruka += "Lose unesena kartica.\n";
    let malaSlova = 0;
    let velikaSlova = false;
    let broj = false;
    let spec = false;
    for (let index = 0; index < this.korisnik.lozinka.length; index++) {
      if(this.korisnik.lozinka[index] >= 'A' && this.korisnik.lozinka[index] <= 'Z')velikaSlova = true;
      else if(this.korisnik.lozinka[index] >= 'a' && this.korisnik.lozinka[index] <= 'z')malaSlova++;
      else if(this.korisnik.lozinka[index] >= '0' && this.korisnik.lozinka[index] <= '9')broj = true;
      else spec = true;
    }
    if(this.korisnik.lozinka.length < 6)this.poruka += "Lozinka mora da ima barem 6 karaktera.\n";
    if(this.korisnik.lozinka.length > 10)this.poruka += "Lozinka mora da ima najvise 10 karaktera.\n";
    if(malaSlova < 3)this.poruka += "Lozinka mora da ima barem 3 mala slova.\n";
    if(!velikaSlova)this.poruka += "Lozinka mora da ima barem 1 veliko slova.\n";
    if(!broj)this.poruka += "Lozinka mora da ima barem 1 broj.\n";
    if(!spec)this.poruka += "Lozinka mora da ima barem 1 specijalan karakter.\n";
    if(this.poruka == "")return true;
    return false;
  }

  azurirajKorisnika(){
    if(this.validacija()){
      this.poruka = "Pogresno uneti parametri";
      return;
    }
    this.userService.azurirajKorisnika(this.korisnik).subscribe(arg => {
      if(arg){
        this.poruka = "Uspesno azuriranje.";
      }
      else this.poruka = "Greska pri azuriranju.";
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../service/korisnik.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutentikacijaService } from '../service/autentikacija.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  korIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  pol: string = "";
  adresa: string = "";
  kontaktTelefon: string = "";
  imejl: string = "";
  slika: any;
  kartica: string = "";
  slikaKartice: any;
  poruka: string = "";

  recaptcha: string = "";

  constructor(private router: Router, private service: KorisnikService, private authService: AutentikacijaService){authService.setUserType("gost")}

  ngOnInit(): void {
    this.slika = 'assets/defaultSlika.jpg';
  }

  resolved(captchaResponse: any){
    this.recaptcha = captchaResponse;
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
            this.slika = img.src;
          } else {
            this.slika = 'assets/defaultSlika.jpg';
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
    if(this.kartica.length == 15){
      for (let index = 0; index < diners.length; index++)
        if(this.kartica.startsWith(diners[index])){
          this.slikaKartice = "assets/Diners.png";
          return;
        }
    }
    if(this.kartica.length == 16){
      for (let index = 0; index < master.length; index++)
        if(this.kartica.startsWith(master[index])){
          this.slikaKartice = "assets/MasterCard.png";
          return;
        }
      for (let index = 0; index < visa.length; index++)
        if(this.kartica.startsWith(visa[index])){
          this.slikaKartice = "assets/Visa.png";
          return;
        }
    }
    this.slikaKartice = null;
  }

  validacija(){
    this.poruka = "";
    if(this.korIme == "" || this.lozinka == "" || this.ime == "" || this.prezime == "" || this.pol == "" || this.adresa == "" ||
      this.kontaktTelefon == "" || this.imejl == "" || this.kartica == ""){
        this.poruka += "Morate uneti sve parametre.\n";
      }
    if(this.slikaKartice == null)this.poruka += "Lose unesena kartica.\n";
    let malaSlova = 0;
    let velikaSlova = false;
    let broj = false;
    let spec = false;
    for (let index = 0; index < this.lozinka.length; index++) {
      if(this.lozinka[index] >= 'A' && this.lozinka[index] <= 'Z')velikaSlova = true;
      else if(this.lozinka[index] >= 'a' && this.lozinka[index] <= 'z')malaSlova++;
      else if(this.lozinka[index] >= '0' && this.lozinka[index] <= '9')broj = true;
      else spec = true;
    }
    if(this.lozinka.length < 6)this.poruka += "Lozinka mora da ima barem 6 karaktera.\n";
    if(this.lozinka.length > 10)this.poruka += "Lozinka mora da ima najvise 10 karaktera.\n";
    if(malaSlova < 3)this.poruka += "Lozinka mora da ima barem 3 mala slova.\n";
    if(!velikaSlova)this.poruka += "Lozinka mora da ima barem 1 veliko slova.\n";
    if(!broj)this.poruka += "Lozinka mora da ima barem 1 broj.\n";
    if(!spec)this.poruka += "Lozinka mora da ima barem 1 specijalan karakter.\n";
    if(this.poruka == "")return true;
    return false;
  }

  dodajVlasnika(){
    
    if(this.validacija() && this.slikaKartice != null){
      this.service.registracijaKorisnika(this.korIme, this.lozinka, this.ime, this.prezime, this.pol,
        this.adresa, this.kontaktTelefon, this.imejl, this.slika, this.kartica, "vlasnik", "Ceka odobrenje"
      ).subscribe(arg => {
        if(arg == null){
          this.poruka = "Postojece korisnicko ime ili imejl";
        }
        else{
          localStorage.setItem("korisnik", JSON.stringify(arg));
          this.authService.setUserType("neregistrovan");
          this.router.navigate(["neregistrovanKorisnik"]);
        }
      });
      
    }
  }

}

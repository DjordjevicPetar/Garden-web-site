import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { RegisterComponent } from './register/register.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { DodajDekorateraComponent } from './dodaj-dekoratera/dodaj-dekoratera.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { DodajFirmuComponent } from './dodaj-firmu/dodaj-firmu.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { PrikazFirmiComponent } from './prikaz-firmi/prikaz-firmi.component';
import { DodajZakazivanjeComponent } from './dodaj-zakazivanje/dodaj-zakazivanje.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ObradiZakazivanjaComponent } from './obradi-zakazivanja/obradi-zakazivanja.component';
import { ZakazivanjaComponent } from './zakazivanja/zakazivanja.component';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { OdrzavanjeVlasnikComponent } from './odrzavanje-vlasnik/odrzavanje-vlasnik.component';
import { OdrzavanjeDekoraterComponent } from './odrzavanje-dekorater/odrzavanje-dekorater.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NeregistrovaniKorisnikComponent } from './neregistrovani-korisnik/neregistrovani-korisnik.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { StatistikaComponent } from './statistika/statistika.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DekoraterProfilComponent,
    RegisterComponent,
    AdministratorComponent,
    AzurirajKorisnikaComponent,
    DodajDekorateraComponent,
    PromenaLozinkeComponent,
    DodajFirmuComponent,
    VlasnikProfilComponent,
    PrikazFirmiComponent,
    DodajZakazivanjeComponent,
    ObradiZakazivanjaComponent,
    ZakazivanjaComponent,
    DodajKomentarComponent,
    OdrzavanjeVlasnikComponent,
    OdrzavanjeDekoraterComponent,
    NavbarComponent,
    NeregistrovaniKorisnikComponent,
    LoginAdminComponent,
    StatistikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

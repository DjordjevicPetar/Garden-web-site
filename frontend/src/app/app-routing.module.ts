import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { RegisterComponent } from './register/register.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AzurirajKorisnikaComponent } from './azuriraj-korisnika/azuriraj-korisnika.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { DodajDekorateraComponent } from './dodaj-dekoratera/dodaj-dekoratera.component';
import { DodajFirmuComponent } from './dodaj-firmu/dodaj-firmu.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { PrikazFirmiComponent } from './prikaz-firmi/prikaz-firmi.component';
import { DodajZakazivanjeComponent } from './dodaj-zakazivanje/dodaj-zakazivanje.component';
import { ObradiZakazivanjaComponent } from './obradi-zakazivanja/obradi-zakazivanja.component';
import { ZakazivanjaComponent } from './zakazivanja/zakazivanja.component';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { OdrzavanjeVlasnikComponent } from './odrzavanje-vlasnik/odrzavanje-vlasnik.component';
import { OdrzavanjeDekoraterComponent } from './odrzavanje-dekorater/odrzavanje-dekorater.component';
import { NeregistrovaniKorisnikComponent } from './neregistrovani-korisnik/neregistrovani-korisnik.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { StatistikaComponent } from './statistika/statistika.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"adminLogin", component:LoginAdminComponent},
  {path:"register", component:RegisterComponent},
  {path:"dekoraterProfil", component:DekoraterProfilComponent},
  {path:"administrator", component:AdministratorComponent},
  {path:"azurirajKorisnika", component:AzurirajKorisnikaComponent},
  {path:"promeniLozinku", component:PromenaLozinkeComponent},
  {path:"dodajDekoratera", component:DodajDekorateraComponent},
  {path:"dodajFirmu", component:DodajFirmuComponent},
  {path:"vlasnikProfil", component:VlasnikProfilComponent},
  {path:"prikazFirmi", component:PrikazFirmiComponent},
  {path:"dodajZakazivanje", component:DodajZakazivanjeComponent},
  {path:"obradiZakazivanja", component:ObradiZakazivanjaComponent},
  {path:"arhiva", component:ZakazivanjaComponent},
  {path:"dodajKomentar", component:DodajKomentarComponent},
  {path:"vlasnikOdrzavanje", component:OdrzavanjeVlasnikComponent},
  {path:"dekoraterOdrzavanje", component:OdrzavanjeDekoraterComponent},
  {path:"neregistrovanKorisnik", component:NeregistrovaniKorisnikComponent},
  {path:"statistika", component:StatistikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

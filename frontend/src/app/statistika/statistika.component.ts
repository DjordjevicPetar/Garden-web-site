import { Component, OnInit } from '@angular/core';
import { AutentikacijaService } from '../service/autentikacija.service';
import { korisnici } from '../models/korisnici';
import { KorisnikService } from '../service/korisnik.service';
import { FirmaService } from '../service/firma.service';
import { firme } from '../models/firme';
import { zakazivanja } from '../models/zakazivanje';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, ArcElement, PieController, Legend, Tooltip } from 'chart.js';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {

  ja: korisnici = new korisnici();
  firma: firme = new firme();
  listaZakazivanja: zakazivanja[] = [];

  chart1: any;
  chart2: any;
  chart3: any;

  ngOnInit(): void {
    // Registracija potrebnih komponenti za Chart.js
    Chart.register(BarController, CategoryScale, LinearScale, BarElement, PieController, ArcElement, Legend, Tooltip);

    this.authService.setUserType("dekorater");
    let x = localStorage.getItem("korisnik");
    if (x != null) {
      this.ja = JSON.parse(x);
    }
    this.firmaService.dohvatiFirme().subscribe(arg => {
      for (let index = 0; index < arg.length; index++) {
        if (arg[index].zaposleni.findIndex(x => x == this.ja.korIme) != -1) {
          this.firma = arg[index];
          break;
        }
      }
      this.zakazivnjaService.dohvatiZakazivanjaPoFirmi(this.firma.naziv).subscribe(arg => {
        this.listaZakazivanja = arg;
        this.barInit();
        this.napraviPitu();
        this.napraviHistogram();
      });
    });
  }

  barInit() {
    let poslovi = new Array(12).fill(0);  // 12 meseci sa početnom vrednošću 0
    this.listaZakazivanja.filter(elem => elem.prihvacenoOd == this.ja.korIme).forEach(elem => {
      let mesec: number = new Date(elem.vremeDolaska).getMonth();  // Dohvati mesec (0 = januar, 11 = decembar)
      poslovi[mesec] += 1;
    });

    this.chart1 = new Chart("Bars", {
      type: 'bar',
      data: {
        labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 
                 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
        datasets: [
          {
            label: "Rezervacije",
            data: poslovi,
            backgroundColor: 'red'
          }
        ]
      },
      options: {
        aspectRatio: 5.5
      }
    });
  }

  procenatPoDanima(){
    let dani = [0, 0, 0, 0, 0, 0, 0];
    this.listaZakazivanja.forEach(elem=>{
      let dan = new Date(elem.vremeDolaska).getDay();
      if(dan == 0){
        dan = 7;
      }
      dani[dan - 1] += 1;
    })
    return dani.map(elem => (elem * 100) / this.listaZakazivanja.length)
  }

  napraviPitu() {
    this.chart2 = new Chart("Pie", {
      type: 'pie', // Tip grafikona
      data: {
        labels: this.firma.zaposleni, // Imena dekoratera kao oznake
        datasets: [
          {
            label: 'Broj poslova',
            data: this.firma.zaposleni.map(elem => 
              this.listaZakazivanja.filter(arg => arg.prihvacenoOd == elem).length
            ),
            backgroundColor: [
              'red', 'blue', 'green', 'yellow', 'orange', 'pink'
            ],
            hoverOffset: 4
          }
        ]
      },
      options: {
        aspectRatio: 5.5,
        plugins: {
          legend: {
            display: true,   // Prikaz legende
            position: 'top', // Pozicija legende (može biti 'top', 'left', 'right', 'bottom')
            labels: {
              color: 'black',  // Boja teksta unutar legende
              font: {
                size: 14       // Veličina fonta
              }
            }
          }
        }
      }
    });
  }

  napraviHistogram(){

    this.chart3 = new Chart("Histogram", {
      type: 'bar', // or 'line' depending on your preference
      data: {
        labels: ['Ponedeljak', 'Utorak', 'Sreda','Četvrtak',
								 'Petak', 'Subota', 'Nedelja'], // Example labels for intervals
        datasets: [{
          label: 'Udeo poslova firme po danu [%]',
          data: this.procenatPoDanima(), // Example data values for each interval
          backgroundColor: 'blue', // Adjust color as needed
          borderColor: 'black', // Adjust border color as needed
          borderWidth: 1 // Adjust border width as needed
        }]
      },
      options: {
        aspectRatio: 5.5,
      }
    });

  }

  constructor(private authService: AutentikacijaService, private userService: KorisnikService,
    private firmaService: FirmaService, private zakazivnjaService: ZakazivanjaService){}
    
}

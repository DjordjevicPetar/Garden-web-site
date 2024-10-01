import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firme } from '../models/firme';
import { Router } from '@angular/router';
import { ZakazivanjaService } from '../service/zakazivanja.service';
import { korisnici } from '../models/korisnici';
import { AutentikacijaService } from '../service/autentikacija.service';
import { DomSanitizer } from '@angular/platform-browser';
import { zakazivanja } from '../models/zakazivanje';
import { KorisnikService } from '../service/korisnik.service';

@Component({
  selector: 'app-dodaj-zakazivanje',
  templateUrl: './dodaj-zakazivanje.component.html',
  styleUrls: ['./dodaj-zakazivanje.component.css']
})
export class DodajZakazivanjeComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;
  lokacija: any;
  ja: korisnici = new korisnici();
  listaKomentara: zakazivanja[] = [];
  listaZakazivanja: zakazivanja[] = [];
  listaKorisnika: korisnici[] = [];
  firma: firme = new firme();
  korak: number = 1;
  poruka: String = "";
  vremeDolaska: Date = new Date();
  kvadraturaBaste: number = 0;
  tip: String = "privatna";
  kvadraturaBazen: number = 0;
  kvadraturaZelenilo: number = 0;
  kvadraturaLezaljkeStolovi: number = 0;
  kvadraturaFontane: number = 0;
  brojStolova: number = 0;
  brojStolica: number = 0;
  opis: String = "";
  odabraneUsluge: any[][] = [];
  canvasInput: any;

  odabranOblik: string = "zelenilo";
  listaOblika: Array<{ x: number, y: number, shape: string, width?: number, height?: number, radius?: number }> = [];

  constructor(private router: Router, private zakazivanjeService: ZakazivanjaService, private sanitizer: DomSanitizer, private authService: AutentikacijaService,
    private korisnikService: KorisnikService
  ){}
  
  ngOnInit(): void {
    this.authService.setUserType("vlasnik");
    let x = localStorage.getItem("firma");
    let y = localStorage.getItem("korisnik");
    if(x != null)this.firma = JSON.parse(x);
    if(y != null)this.ja = JSON.parse(y);
    this.lokacija = this.photoURL(this.firma.lokacija);
    this.zakazivanjeService.dohvatiZakazivanjaPoFirmi(this.firma.naziv).subscribe(arg => {
      this.listaZakazivanja = arg;
      for (let index = 0; index < arg.length; index++) {
        if(arg[index].komentarZavrsetka != "")this.listaKomentara.push(arg[index]);
      }
    });
    this.korisnikService.dohvatiKorisnike().subscribe(arg => this.listaKorisnika = arg);
  }
  
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.drawAllElements();
  }

  photoURL(lokacija: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(lokacija);
  }

  prvaValidacija(){
    this.poruka = "";
    if(this.vremeDolaska < new Date())this.poruka += "Morate uneti datum u buducnosti.\n";
    if(this.vremeDolaska.valueOf() > this.firma.pocetakOdmora.valueOf() && this.vremeDolaska.valueOf() < this.firma.krajOdmora.valueOf())
      this.poruka += "Zakazujete u vreme godisnjeg odmora.\n";
    if(this.kvadraturaBaste < 0)this.poruka += "Kvadratura baste mora biti pozitivan broj.\n";
    let flag = false;
    for (let index = 0; index < this.firma.zaposleni.length; index++) {
      if(this.jeliSlobodan(this.firma.zaposleni[index])){
        flag = true;
        break;
      };
    }
    if(!flag)this.poruka += "Svi radnici su zauzeti tad.\n";
    if(this.poruka != "")return false;
    return true;
  }

  jeliSlobodan(kor_ime: String){
    for (let index = 0; index < this.listaZakazivanja.length; index++) {
      if(this.listaZakazivanja[index].prihvacenoOd == kor_ime &&
        this.listaZakazivanja[index].vremeDolaska.valueOf() < this.vremeDolaska.valueOf() &&
        this.listaZakazivanja[index].datumKraja.valueOf() > this.vremeDolaska.valueOf())
          return false;
    }
    return true;
  }

  privatnaValidacija(){
    this.poruka = "";
    if(this.kvadraturaBazen < 0 || this.kvadraturaZelenilo < 0 || this.kvadraturaLezaljkeStolovi < 0)this.poruka = "Nijedna kvadratura ne moze da bude negativan broj.";
    if(this.kvadraturaBaste != this.kvadraturaBazen + this.kvadraturaZelenilo + this.kvadraturaLezaljkeStolovi)this.poruka = "Kvadrature se ne poklapaju.";
    if(this.poruka != "")return false;
    return true;
  }

  restoranValidacija(){
    this.poruka = "";
    if(this.kvadraturaFontane < 0 || this.kvadraturaZelenilo < 0 || this.brojStolica < 0 || this.brojStolova < 0)
      this.poruka = "Nijedna informacija ne moze da bude negativan broj.";
    if(this.kvadraturaBaste != this.kvadraturaFontane + this.kvadraturaZelenilo)this.poruka = "Kvadrature se ne poklapaju.";
    if(this.poruka != "")return false;
    return true;
  }

  dalje(){
    if(this.korak == 1 && this.prvaValidacija())this.korak++;
    else if(this.korak == 2 && ((this.tip == "privatna" && this.privatnaValidacija()) || (this.tip == "restoran" && this.restoranValidacija())))this.korak++;
  }

  promenaUsluga(usluga: any[]){
    let index = this.odabraneUsluge.findIndex((arg => arg[0] == usluga[0]));
    if(index != -1)this.odabraneUsluge.splice(index, 1);
    else this.odabraneUsluge.push(usluga);
  }

  dodajZakazivanje(){
    let zakazivanje = new zakazivanja();
    this.zakazivanjeService.dodajZakazivanje(this.ja.korIme, this.firma.naziv, this.vremeDolaska, this.kvadraturaBaste, this.tip, this.kvadraturaBazen, this.kvadraturaZelenilo, 
      this.kvadraturaLezaljkeStolovi, this.kvadraturaFontane, this.brojStolova, this.brojStolica, this.opis, this.odabraneUsluge, this.listaOblika)
      .subscribe(arg => {
        localStorage.removeItem("firma");
        this.router.navigate(['prikazFirmi'])
    });
  }

  change(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      this.listaOblika.splice(0, this.listaOblika.length);
      reader.onload = (e: any) => {
        let x = e.target.result;
        if(x != null)this.listaOblika = JSON.parse(x);
        this.drawAllElements();
      };

      reader.readAsText(file);
    }
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let shapeProps: any;
    switch (this.odabranOblik) {
      case 'zelenilo':
        shapeProps = { x, y, shape: 'greenSquare', width: 50, height: 50 };
        break;
      case 'bazen':
        shapeProps = { x, y, shape: 'bigBlueRectangle', width: 200, height: 100 };
        break;
      case 'sto':
        shapeProps = { x, y, shape: 'smallBrownCircle', radius: 20 };
        break;
      case 'fontana':
        shapeProps = { x, y, shape: 'bigBlueCircle', radius: 50 };
        break;
      case 'lezaljka': case 'stolica':
        shapeProps = { x, y, shape: 'smallGreyRectangle', width: 60, height: 30 };
        break;
    }
    if (!this.isWithinCanvasBounds(shapeProps)) {
      alert('The shape cannot be drawn as it would be cut off by the canvas edges.');
      return;
    }
    
    if(shapeProps.radius == undefined){
      shapeProps.x -= shapeProps.width / 2;
      shapeProps.y -= shapeProps.height / 2;
    }

    if (this.isPositionAvailable(shapeProps)) {
      this.listaOblika.push(shapeProps);
      this.drawAllElements();
    } else {
      alert('The position overlaps with an existing element. Please select another position.');
    }
  }

  isWithinCanvasBounds(shape: any): boolean {
  const canvasWidth = this.canvasRef.nativeElement.width;
  const canvasHeight = this.canvasRef.nativeElement.height;

  if (shape.shape.includes('Square') || shape.shape.includes('Rectangle')) {
    // Rectangle or square: ensure the shape fits within the canvas
    return (
      shape.x - shape.width / 2 >= 0 &&  // Left boundary
      shape.x + shape.width / 2 <= canvasWidth &&  // Right boundary
      shape.y - shape.height / 2 >= 0 &&  // Top boundary
      shape.y + shape.height / 2 <= canvasHeight  // Bottom boundary
    );
  } else if (shape.shape.includes('Circle')) {
    // Circle: ensure the entire circle fits within the canvas
    return (
      shape.x - shape.radius >= 0 &&  // Left boundary
      shape.x + shape.radius <= canvasWidth &&  // Right boundary
      shape.y - shape.radius >= 0 &&  // Top boundary
      shape.y + shape.radius <= canvasHeight  // Bottom boundary
    );
  }
  return true;
}

  isPositionAvailable(newElement: any): boolean {
    for (const element of this.listaOblika) {
      if (this.checkCollision(newElement, element)) {
        return false;
      }
    }
    return true;
  }

  checkCollision(newElement: any, existingElement: any): boolean {
    if (newElement.shape.includes('Square') || newElement.shape.includes('Rectangle')) {
      // Handle rectangle-rectangle and rectangle-circle collisions
      if (existingElement.shape.includes('Square') || existingElement.shape.includes('Rectangle')) {
        return this.rectRectCollision(newElement, existingElement);
      } else if (existingElement.shape.includes('Circle')) {
        return this.circleRectCollision(existingElement, newElement);
      }
    } else if (newElement.shape.includes('Circle')) {
      // Handle circle-circle and circle-rectangle collisions
      if (existingElement.shape.includes('Circle')) {
        return this.circleCircleCollision(newElement, existingElement);
      } else if (existingElement.shape.includes('Square') || existingElement.shape.includes('Rectangle')) {
        return this.circleRectCollision(newElement, existingElement);
      }
    }
    return false;
  }

  rectRectCollision(rect1: any, rect2: any): boolean {
    // Check if the rectangles overlap by ensuring none of the following is true:
    // 1. rect1 is completely to the left of rect2
    // 2. rect1 is completely to the right of rect2
    // 3. rect1 is completely above rect2
    // 4. rect1 is completely below rect2
    return !(
      rect1.x + rect1.width <= rect2.x ||  // rect1 is completely to the left of rect2
      rect1.x >= rect2.x + rect2.width ||  // rect1 is completely to the right of rect2
      rect1.y + rect1.height <= rect2.y || // rect1 is completely above rect2
      rect1.y >= rect2.y + rect2.height    // rect1 is completely below rect2
    );
  }
  
  circleCircleCollision(circle1: any, circle2: any): boolean {
    const distance = this.getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
    return distance < circle1.radius + circle2.radius;
  }
  
  circleRectCollision(circle: any, rect: any): boolean {
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
  }

  getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  drawAllElements(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.listaOblika.forEach(element => {
      if(element.width == undefined)element.width = 0;
      if(element.radius == undefined)element.radius = 0;
      if(element.height == undefined)element.height = 0;
      switch (element.shape) {
        case 'greenSquare':
          this.drawSquare(element.x, element.y, element.width, 'green');
          break;
        case 'bigBlueRectangle':
          this.drawRectangle(element.x, element.y, element.width, element.height, 'blue');
          break;
        case 'smallBrownCircle':
          this.drawCircle(element.x, element.y, element.radius, 'brown');
          break;
        case 'bigBlueCircle':
          this.drawCircle(element.x, element.y, element.radius, 'blue');
          break;
        case 'smallGreyRectangle':
          this.drawRectangle(element.x, element.y, element.width, element.height, 'grey');
          break;
      }
    });
  }

  drawSquare(x: number, y: number, size: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, size, size); // Draw centered on click
  }

  drawCircle(x: number, y: number, radius: number, color: string): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height); // Draw centered on click
  }

}

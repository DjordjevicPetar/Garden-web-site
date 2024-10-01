export class zakazivanja{
    podnosilacZahteva: String = "";
    nazivFirme: String = "";

    vremePodnosenjaZahteva: Date = new Date();
    vremeDolaska: Date = new Date();

    kvadraturaBaste: Number = 0;
    tip: String = "";
    kvadraturaBazen: Number = 0;
    kvadraturaZelenilo: Number = 0;
    kvadraturaLezaljkeStolovi: Number = 0;
    kvadraturaFontane: Number = 0;
    brojStolova: Number = 0;
    brojStolica: Number = 0;
    opis: String = "";
    odabraneUsluge: any[][] = [];
    listaOblika: String = "";
    
    datumKraja: Date = new Date();
    komentarOdbijanja: String = "";
    prihvacenoOd: String = "";
    odbijeno: boolean = false;
    
    slikaZavrsetka: any = "";
    komentarZavrsetka: String = "";
    ocena: number = 0;

    zahtevOdrzavanje: boolean = false;
    krajOdrzavanja: Date = new Date();
}
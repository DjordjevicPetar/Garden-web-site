import * as express from 'express';
import zakazivanja from '../models/zakazivanja';

export class ZakazivanjeController {

    dodajZakazivanje = (req: express.Request, res: express.Response) => {
        let novoZakazivanje = new zakazivanja(req.body);
        novoZakazivanje.save().then(() => res.json(true)).catch(err => console.log(err));
    }

    dohvatiZakazivanjaPoFirmi = (req: express.Request, res: express.Response) => {
        zakazivanja.find({nazivFirme: req.body.nazivFime}).then(arg => res.json(arg)).catch(err => console.log(err));
    }

    dohvatiZakazivanjaPoKorisniku = (req: express.Request, res: express.Response) => {
        zakazivanja.find({podnosilacZahteva: req.body.korIme}).then(arg => res.json(arg)).catch(err => console.log(err));
    }

    dohvatiZakazivanja = (req: express.Request, res: express.Response) => {
        zakazivanja.find().then(arg => res.json(arg)).catch(err => console.log(err));
    }

    azurirajZakazivanje = (req: express.Request, res: express.Response) => {
        zakazivanja.updateOne({"listaOblika": req.body.listaOblika, "vremeDolaska": req.body.vremeDolaska}, {"datumKraja": req.body.datumKraja, "komentarOdbijanja": req.body.komentarOdbijanja,
            "prihvacenoOd": req.body.prihvacenoOd, "odbijeno": req.body.odbijeno, "slikaZavrsetka": req.body.slikaZavrsetka, "ocena": req.body.ocena,
            "komentarZavrsetka": req.body.komentarZavrsetka, "zahtevOdrzavanje": req.body.zahtevOdrzavanje, "krajOdrzavanja": req.body.krajOdrzavanja})
            .then(arg => res.json(true)).catch(err => console.log(err));
    }

}
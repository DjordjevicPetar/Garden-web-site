import * as express from 'express';
import firme from '../models/firme';

export class FirmaController {

    dohvatiFirme = (req: express.Request, res: express.Response) => {
        firme.find().then(arg => res.json(arg)).catch(err => console.log(err));
    }

    dodajZaposlenog = (req: express.Request, res: express.Response) => {
        firme?.updateOne({"naziv": req.body.firma}, {$push:{"zaposleni": req.body.korIme}}).then(data => {
            res.json(null);
        }
        ).catch(err => console.log(err));
    }

    dodajFirmu = (req: express.Request, res: express.Response) => {
        let novaFirma = new firme(req.body);
        novaFirma.save().then(data => {
            res.json(true);
        }).catch(err => {
            res.json(false);
        })
    }

    dodajZakazivanje = (req: express.Request, res: express.Response) => {
        firme?.updateOne({"naziv": req.body.nazivFime}, {$push:{"zakazivanja": [req.body.vremeDolaska, req.body.kvadraturaBaste, req.body.tip,
            req.body.kvadraturaBazen, req.body.kvadraturaZelenilo, req.body.kvadraturaLezaljkeStolovi, req.body.kvadraturaFontane, req.body.brojStolova,
            req.body.brojStolica, req.body.opis, req.body.odabraneUsluge, req.body.listaOblika
        ]}}).then(data => {
            console.log("wtf");
            res.json(null);
        }
        ).catch(err => console.log(err));
    }

}
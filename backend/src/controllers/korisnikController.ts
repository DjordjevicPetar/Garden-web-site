import * as express from 'express';
import korisnici from '../models/korisnici';
import bcrypt from 'bcryptjs';

export class UserController {

    salt: number = 10;

    login = (req: express.Request, res: express.Response) => {
        korisnici.findOne({"korIme":req.body.korIme}).then(korisnik => {
            if(korisnik == null){
                res.json(null);
                return;
            }
            let lozinka = korisnik?.lozinka;
            if(lozinka == undefined)lozinka = "";
            bcrypt.compare(req.body.lozinka, lozinka).then(resn => {
                if(resn)res.json(korisnik);
                else res.json(null);
            })
        }).catch(err => {
            console.log(err);
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        korisnici.findOne({"korIme":req.body.korIme}).then(korisnik => {
            res.json(korisnik);
        }).catch(err => {
            console.log(err);
        })
    }

    register = (req: express.Request, res: express.Response) => {
        bcrypt.hash(req.body.lozinka, this.salt, (err, hash) => {
            if(err != null){
                console.log(err);
                return;
            }
            req.body.lozinka = hash;
            let noviKorisnik = new korisnici(req.body);
            noviKorisnik.save().then(data => {
                res.json(noviKorisnik);
            }).catch(err => {
                res.json(null);
            })
        })
        
    }

    dohvatiKorisnike = (req: express.Request, res: express.Response) => {
        korisnici.find({}).then(listaKorisnika => {
            res.json(listaKorisnika);
        }).catch(err => {
            console.log(err);
        })
    }

    promeniStatus = (req: express.Request, res: express.Response) => {
        korisnici.updateOne({"korIme": req.body.korIme}, {"status": req.body.status}).then().catch(err => console.log(err));
    }

    azurirajKorisnika = (req: express.Request, res: express.Response) => {
        korisnici.updateOne({"korIme": req.body.korisnik.korIme}, {"ime": req.body.korisnik.ime, "prezime": req.body.korisnik.prezime, 
            "pol": req.body.korisnik.pol, "adresa": req.body.korisnik.adresa, "kontaktTelefon": req.body.korisnik.kontaktTelefon, 
            "slika": req.body.korisnik.slika, "kartica": req.body.korisnik.kartica, "tip": req.body.korisnik.tip
        }).then(arg => res.json(true)).catch(err => {
            console.log(err);
            res.json
        });
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        korisnici.findOne({"korIme":req.body.korIme}).then(korisnik => {
            if(korisnik == null){
                res.json(false);
                return;
            }
            let lozinka = korisnik?.lozinka;
            if(lozinka == undefined)lozinka = "";
            bcrypt.compare(req.body.staraLozinka, lozinka).then(resn => {
                if(!resn){
                    res.json(false);
                    return;
                }
                bcrypt.hash(req.body.novaLozinka, this.salt, (err, hash) => {
                    if(err){
                        console.log(err);
                        res.json(false);
                        return;
                    }
                    korisnici.updateOne({"korIme": req.body.korIme}, {"lozinka": hash}).then(arg => res.json(true));
                })
            })
            
        }).catch(err => {
            console.log(err);
        })
    }
}
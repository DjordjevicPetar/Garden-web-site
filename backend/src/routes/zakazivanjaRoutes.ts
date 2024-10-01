import express from 'express';
import { ZakazivanjeController } from '../controllers/zakazivanjaController';
const zakazivanjaRouters = express.Router();

zakazivanjaRouters.route('/dodajZakazivanje').post(
    (req, res) => new ZakazivanjeController().dodajZakazivanje(req, res)
)

zakazivanjaRouters.route('/dohvatiZakazivanjaPoFirmi').post(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanjaPoFirmi(req, res)
)

zakazivanjaRouters.route('/dohvatiZakazivanjaPoKorisniku').post(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanjaPoKorisniku(req, res)
)

zakazivanjaRouters.route('/azurirajZakazivanje').post(
    (req, res) => new ZakazivanjeController().azurirajZakazivanje(req, res)
)

zakazivanjaRouters.route('/dohvatiZakazivanja').get(
    (req, res) => new ZakazivanjeController().dohvatiZakazivanja(req, res)
)

export default zakazivanjaRouters;
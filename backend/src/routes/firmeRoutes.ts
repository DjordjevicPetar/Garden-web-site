import express from 'express';
import { FirmaController } from '../controllers/firmaController';
const firmaRouters = express.Router();

firmaRouters.route('/dohvatiFirme').get(
    (req, res) => new FirmaController().dohvatiFirme(req, res)
)

firmaRouters.route('/dodajZaposlenog').post(
    (req, res) => new FirmaController().dodajZaposlenog(req, res)
)

firmaRouters.route('/dodajFirmu').post(
    (req, res) => new FirmaController().dodajFirmu(req, res)
)

export default firmaRouters;
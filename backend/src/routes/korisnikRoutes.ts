import express from 'express';
import { UserController } from '../controllers/korisnikController';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/dohvatiKorisnika').post(
    (req, res) => new UserController().dohvatiKorisnika(req, res)
)

userRouter.route('/dohvatiKorisnike').get(
    (req, res) => new UserController().dohvatiKorisnike(req, res)
)

userRouter.route('/promeniStatus').post(
    (req, res) => new UserController().promeniStatus(req, res)
)

userRouter.route('/azurirajKorisnika').post(
    (req, res) => new UserController().azurirajKorisnika(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

export default userRouter;
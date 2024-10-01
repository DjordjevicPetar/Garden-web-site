import express, { Router } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouters from './routes/korisnikRoutes';
import firmaRouters from './routes/firmeRoutes';
import zakazivanjaRouters from './routes/zakazivanjaRoutes';

const app = express();

app.use(cors());
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/Basta")
const router = Router()

router.use('/user', korisnikRouters)
router.use('/firma', firmaRouters)
router.use('/zakazivanja', zakazivanjaRouters)
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
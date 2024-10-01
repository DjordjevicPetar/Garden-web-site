import mongoose from "mongoose";

const Schema = mongoose.Schema;

let zakazivanja = new Schema({
    podnosilacZahteva: {
        type: String
    },
    vremePodnosenjaZahteva: {
        type: Date
    },
    nazivFirme: {
        type: String
    },
    vremeDolaska: {
        type: Date
    },
    kvadraturaBaste: {
        type: Number
    },
    tip: {
        type: String
    },
    kvadraturaBazen: {
        type: Number
    },
    kvadraturaZelenilo: {
        type: Number
    },
    kvadraturaLezaljkeStolovi: {
        type: Number
    },
    kvadraturaFontane: {
        type: Number
    },
    brojStolova: {
        type: Number
    },
    brojStolica: {
        type: Number
    },
    opis: {
        type: String
    },
    odabraneUsluge: {
        type: Array
    },
    listaOblika: {
        type: String
    },
    datumKraja: {
        type: Date
    },
    komentarOdbijanja: {
        type: String
    },
    prihvacenoOd: {
        type: String
    },
    odbijeno: {
        type: Boolean
    },
    slikaZavrsetka: {
        type: String
    },
    ocena: {
        type: Number
    },
    komentarZavrsetka: {
        type: String
    },
    zahtevOdrzavanje: {
        type: Boolean
    },
    krajOdrzavanja: {
        type: Date
    }
});

export default mongoose.model('zakazivanja', zakazivanja, 'Zakazivanja');
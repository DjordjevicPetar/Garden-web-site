import mongoose from "mongoose";

const Schema = mongoose.Schema;

let korisnici = new Schema({
    korIme: {
        type: String,
        required: true,
        unique: true
    },
    lozinka: {
        type: String,
        required: true
    },
    ime: {
        type: String,
        required: true
    },
    prezime: {
        type: String,
        required: true
    },
    pol: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    },
    kontaktTelefon: {
        type: String,
        required: true
    },
    imejl: {
        type: String,
        required: true,
        unique: true
    },
    slika: {
        type: String,
        required: true
    },
    kartica: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

export default mongoose.model('korisnici', korisnici, 'Korisnici');
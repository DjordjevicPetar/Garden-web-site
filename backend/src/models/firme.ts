import mongoose from "mongoose";

const Schema = mongoose.Schema;

let firme = new Schema({
    naziv :{
        type: String,
        unique: true
    },
    adresa: {
        type: String
    },
    usluge: {
        type: Array
    },
    lokacija: {
        type: String
    },
    kontakt: {
        type: String
    },
    zaposleni: {
        type: Array
    },
    pocetakOdmora: {
        type: Date
    },
    krajOdmora: {
        type: Date
    }
});

export default mongoose.model('firme', firme, 'Firme');
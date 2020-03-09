const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path: 'private.env'});
const cors = require ('cors');
const path = require('path');
const mailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


let transport = mailer.createTransport(smtpTransport({
    service: "gmail",
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_MDP
    }
}));
app.use(express.json());
app.use(cors());

app.post('/mailer',(req,res)=>{
    console.log(req.body)
   
    let mailContent={
        from: 'Liste des courses',
        to: req.body.mail,
        subject: 'Listes des courses',
        html:`Listes des courses: ${req.body.item}, ${req.body.price}
        pour un prix total de: ${req.body.priceTotal} €`
    }
    transport.sendMail(mailContent,(error,req,res)=>{
        if(error){
            console.log( "Erreur lors de l'envoi de l'email",error)
        }else{
            console.log('Email envoyé avec succès')
        }
    })
})

app.listen(3000)
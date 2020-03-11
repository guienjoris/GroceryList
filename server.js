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
    
    let message = "";
    let messageAdd=[];
    for(i=0;i<req.body.item.length;i++){
        messageAdd.push(`<tr>
        <td>${req.body.item[i].item}</td>
        <td>${req.body.item[i].price}</td>
        </tr>`)
    }
    message =`<thead>
    <tr>
      <th colspan="2"> Liste de courses</th>
    </tr>
  </thead>
  <tbody><tr>
    <th>Item</th>
    <th>Prix</th>
  </tr>
  ${messageAdd.join("")}
  </tbody>
  </table>`
    console.log(messageAdd.join(""))
    let mailContent={
        from: 'Liste des courses',
        to: req.body.mail,
        subject: 'Listes des courses',
        html:`${message}
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
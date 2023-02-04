const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const axios = require("axios");
var cors = require('cors');

const app = express();
app.use(cors({
  origin: 'https://trevor-familly.netlify.app/checkout',
  methods: ['GET', 'POST']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Créer un transporteur pour l'envoi d'emails
let transporter = nodemailer.createTransport({
    host: '146.59.14.191', // remplacer avec le nom d'hôte de votre serveur SMTP
    port: 8025, // remplacer avec le port de votre serveur SMTP
    secure: false,
	auth: {
        user: 'root', // remplacer avec votre nom d'utilisateur
        pass: 'root' // remplacer avec votre mot de passe
    }
   });

app.post('/send', (req, res) => {
    // Récupérer les données du formulaire
    console.log("c'st le body bro =>",req.body)
    
    const mailOptions = req.body.mailOptions;

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log(`Email sent: ${info.response}`);
            res.send('Email sent');
        }
    });
});




app.post("/spam", (req, res) => {

    let list = req.body.mails_list.split("\n");

    list.forEach(async (email) => {

        let mailOptions = {
            from: req.body.from,
            to: email,
            subject: req.body.subject,
            text: req.body.message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                console.log(`Email sent with email: `+email);
            }
        });

    });

    res.send("finish.");

});

// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

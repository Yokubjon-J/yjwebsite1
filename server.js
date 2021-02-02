require('dotenv').config();
const sendMail = require('./mail');
const express = require('express');
const path = require('path');


const log=console.log;
const app = express();
const PORT = process.env.PORT || 8080;

// console.log(process.env)

app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

app.use("/", express.static(__dirname + '/views'));

app.post('/email', (req, res) => {
    const {email, name, subject, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, name, subject, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

app.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.sendFile('index.html');
});

app.listen(PORT, ()=>log('Server is running on port', PORT));
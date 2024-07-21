const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('nodemailer-express-handlebars')
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const app = express();


//qy
// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/send', async (req, res) => {
    console.log(__dirname +'/benefit.png')


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 565,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'malivanchuk.17@gmail.com', // generated ethereal user
            pass: 'trkxafgevykiqvoh'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };
    transporter.use('compile', hbs(handlebarOptions))
    let mailOptions = {
        from: 'malivanchuk.17@gmail.com', // sender address
        to: '1opasat2@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        // html: '<img src="cid:logo1"  />',
        attachment: [{
            filename: 'htmlLogo.jpg',
            path:  '/htmlLogo.jpg' ,
            cid: 'logo1'
        }
             ],
        template:'rideChanges',
        context:{
            name: "Lucas Bernard",

        }
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


    });
});

app.listen(3001, () => console.log('Server started...'));

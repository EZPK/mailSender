var nodemailer = require('nodemailer');

// My module
var mailSender = {
    name: 'Bruyer',
    firstName: 'Thomas',
    age: 28,
    interest: ['Philosophy','Economy', 'Programming', 'Music', 'Movies', 'literature', 'Politic', 'Video games', 'Black Coffee'],
    cursus: [
        ['Collège St Joseph', 2010, 'Math-Science'],
        ['UCL', 2010, 'Chimie'],
        ['UCL', 2011, 'Sciences Economiques'],
        ['Helha', 2013, 'Chimie'],
        ['ISIPS', 2014, 'Infographie'],
        ['Technofuturtic', 2017, 'Web dev']
    ],
    skills: ['Web dev', 'Symfony 3', 'Angular 4', 'Git', 'Photoshop', 'Illustrator', 'InDesign', 'Français', 'Anglais'],
    contact: {
        email: 'thom.bruyer@gmail.com',
        adress: '9 rue de la poste 5630 Cerfontaine',
        phoneNumber: 0493698643,
    },

    // Send One email. Need the To, Subject and Message argument.
    sendMail: function(to, subject, message){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: this.contact.email,
                pass: 'ueK026Vdti32iPCSG5ig',
            }
        });

        var mailOptions = {
            from: this.contact.email,
            to: to,
            subject: subject,
            html: '<h1>' + message + '</h1>',
            attachments: [
                {
                    fileName: 'YOLO.jpg',
                    path: 'img/test.jpg',
                },
            ]
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                var d = new Date();
                console.log(" ");
                console.log("#######################################################");
                console.log("Email sent at "+ d.toLocaleTimeString() + " " + d.toLocaleDateString()+ ":   " + info.response.substring(0, 12));
                console.log("#######################################################");
            }
        });
    },

    // Send Multiple emails.

    // Message de base par défaut, si des arguments sont passsés dans le CLI, écrase ceux de base pour complèter le mail.
    // Need the number, To, Subject and Message argument in the CLI.
    sendMultipleMail: function(to, subject, message){
        var howManyTime =  process.argv[2];
        if(process.argv[3]){
            to = process.argv[3];
        }
        if(process.argv[4]){
            subject = process.argv[4];
        }
        if(process.argv[5]){
            message = process.argv[5];
        }

        for(var i=0; i < howManyTime; i++){
            this.sendMail(to, subject, message);
        }
    }
};

mailSender.sendMultipleMail('thom.bruyer@gmail.com','Test Email', 'FALLAIT LE PASSER DIRECT ENCULE');

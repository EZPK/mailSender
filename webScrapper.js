var express = require('express');
var path = require('path');
var app = express();
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var port = 8080;

var urls = ['https://be.onlysalesjob.com/en/jobs/3395-account-manager'];
var url = urls[0];

request(url, function(err, res, body){
    var $ = cheerio.load(body);

    var job = {
        1:{
            title: $('[itemprop="title"]').first().text(),
            location:$('[itemprop="jobLocation"]').first().text(),
            companyName: $('[itemprop="name"]').first().text(),
            email: $('a[href^=mailto]').text(),
            offre: $('article').text().replace('\n', ' ').replace('\t', ''),
        },
    };

    var content = JSON.stringify(job);
    console.log(content);

    fs.writeFile('./downloads/jobs.json', content, function(err){
        if(err){
            return console.log(err);
        }else{
            return console.log(`
                ################################################################
                File Saved
                ################################################################
            `);
        }
    });

})

app.listen(port);
console.log('server is running on port ' + port);

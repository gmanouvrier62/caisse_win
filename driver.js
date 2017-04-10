/*
var selenium = require('selenium-webdriver');
 
driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();
var baseURL = 'http://fd8-courses.leclercdrive.fr'; 

driver.get(baseURL + '/magasin-096201-Leulinghem/rayon-284371-Beurres-et-Cremes.aspx').then(function(){

console.log("ok");
var element = this.driver.findElement(selenium.By.css("#sId7 > div.divWCRS310_Content > div.divWCRS310_Panier.masquerPlusUnMoinsUnAfficherPanier > #sLibellePictoAjouterProduit"));
element.click();
console.log(element);


});

*/
var request = require('request');
var http = require('http');

function send_request(post_data, success) {
    var post_options = {
        host: "adresse du serveur selenium",
        port: '4444',
        path: '/selenium-server/driver/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Content-Length': post_data.length
        }
    };

    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            success && success(chunk);
        });
    });

    post_req.write(post_data);
    post_req.end();
}

function getNewSession(callback) {
    var post_data = querystring.stringify({
        "cmd": "getNewBrowserSession",
        "1": "*firefox",
        "2": "http://fd8-courses.leclercdrive.fr",
        "3": ""
    });

    send_request(post_data, function(result) {
        sessionId = result.split(',')[1];

        post_data = querystring.stringify({
            "cmd": "open",
            "1": "/magasin-096201-Leulinghem/rayon-284371-Beurres-et-Cremes.aspx",
            "2": "True",
            "3": "",
            "sessionId": sessionId
        });

        send_request(post_data, function(result) {
            /* result contient OK si tout s'est bien passé */
             sessionId = result.split(',')[1];
            post_data = querystring.stringify({
            "cmd": "click",
            "1": "css=#sId7 > div.divWCRS310_Content > div.divWCRS310_Panier.masquerPlusUnMoinsUnAfficherPanier > #sLibellePictoAjouterProduit",
            "2": "True",
            "3": "",
            "sessionId": sessionId
        });


        });
    });

    post_req.write(post_data);
    post_req.end();
}


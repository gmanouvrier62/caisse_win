function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }

    return cookie;
}

dataCookie = mkdataCookie('MC_STORE_ID=66860; expires=' + new Date(new Date().getTime() + 86409000));


var request = require('request'),
    https = require('follow-redirects').https,
    request = request.defaults({
        jar: true
    });

var cookieString ='clsWCSD107:ContexteMU=@d=2%7c096201%7c096201%7c10%2f29%2f17+08%3a54%3a37; ';
cookieString += 'MacId=id=e86a38fc-2519-4abb-be36-d0642559ec1e; clsWDMA031:ciArcheGauche-100-iSaisonnalite-096201=d="2017-11-01T00:00:00+01:00"&n=5;';
cookieString +=' clsWDMA031:ciArcheDroit-100-iSaisonnalite-096201=d="2017-11-01T00:00:00+01:00"&n=5; ';
cookieString += 'etuix=MBysvz1gNEKpGA3.1GsprRM0LK8HudnzNAGH_103Fc1Kk6hr5X2lfg--; xtvrn=$580163$; sto__vuid=19b617dba6a5dd76bd5140d6cd843cef; ';
cookieString += 'clsWCSD045:PageCache=c=1; sto__session=1509531606609; sto__count=1; clsWCSD155:clsWCSD155_ClientUnique=5cb63e23-2e44-497e-974e-aa783637c0fc; ';
cookieString += 'clsWCRS201:@096201=z=vIzmSycCzvY9GXFEST69aR9%2bA6UlkTnr; ASP.NET_SessionId=rvb321qlbnhmjd4ytndn54xr; ';
cookieString += 'TagCommander=; cdrivesr2=5ccba3d82ca6c1940271b75c3213b3bd9009c5bdd40de5ecffd3f2a11171e693394854ae';
var str = '';
//var uri = 'example.de';

var j = request.jar();
var cookie = request.cookie(cookieString);
j.setCookie(cookie, '/magasin-096201/panier.aspx?op=1');
var datas = {"eTypeAction":1,"iIdProduit":"3040","iQuantite":3,"sNoPointLivraison":"096201","objContexteProvenanceArticle"
:{"eOrigine":4,"eTypePage":1,"niIdElement":284371,"eVue":0,"sInformationsComplementaires":"uni-2"}};

var options = {
    hostname: 'fd8-courses.leclercdrive.fr',
    port: 443,
    path: '/magasin-096201/panier.aspx?op=1',
    method: 'POST',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
            'Cookie': cookie,
            'Accept': '/',
            'Connection': 'keep-alive'
    }
};
/*

,
    json: true,
        multipart: {
            chunked: false, 
            data: [
                {
                    'content-type': 'application/json',
                    body: datas
                }
            ]
        }
    //,jar: j




*/
https.request(options, function (resp) {
    resp.setEncoding('utf8');
    console.log(resp.headers);
    if (resp.statusCode) {
        resp.on('data', function (part) {
            str += part;
        });
        resp.on('end', function (part) {
            console.log(str);
        });

        resp.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
    }
}).end(str);
// Require library 
var xl = require('excel4node');

module.exports = function(annee, mois, datas, callback){
// Create a new instance of a Workbook class 
var wb = new xl.Workbook();
 
// Add Worksheets to the workbook 
var ws = wb.addWorksheet('Sheet 1');
//var ws2 = wb.addWorksheet('Sheet 2');
 
// Create a reusable style 
var tbMois = [
    '',
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];
var mois = "4";
var annee = "2017";
var chemin =  'ventilation_caddie_gourmand_'   annee + '_' + mois + '.xlsx';
var styleTitre = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#a9f2aa' // HTML style hex value. required.
    },
    font: {
        blod: true
    }
});
var styleRose = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#f4b0b0' // HTML style hex value. required.
    },
    font: {
        blod: true
    }
});
var styleJaune = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#f2eea4' // HTML style hex value. required.
    },
    font: {
        blod: true
    }
});
var styleBleu = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#77f9f7' // HTML style hex value. required.
    },
    font: {
        blod: true
    }
});
var EcritRouge = wb.createStyle({
    font : {
        color: '#FF0000',
        bold: true
    }

});
var EcritBleu = wb.createStyle({
    font : {
        color: '#0000FF',
        bold: true
    }

}); 
var encadreT = wb.createStyle({
    border: {
        left: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        right: {
           style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        top: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        bottom: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        }
    }
});
var encadreG = wb.createStyle({
    border: {
        left: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        top: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        bottom: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        }
    }
});
var encadreD = wb.createStyle({
    border: {
        right: {
           style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        top: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        bottom: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        }
    }
});
var encadreHB = wb.createStyle({
    border: {
        top: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        bottom: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        }
    }
});
 //ligne titre
 ws.cell(1,1).string('').style(styleTitre).style(encadreG);
 ws.cell(1,2).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,3).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,4).string('BROUILLARD DE CAISSE DE LA SARL "Le caddie goumand"-mois de : ' + tbMois[mois] + '    ' + annee).style(styleTitre).style(encadreHB);
 ws.cell(1,5).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,6).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,7).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,8).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,9).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,10).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,11).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,12).string('').style(styleTitre).style(encadreHB);
 ws.cell(1,13).string('').style(styleTitre).style(encadreD);
 
 //lignetitres colonnes
 ws.cell(3,1).string('').style(styleRose).style(encadreT);
 ws.cell(3,2).string('                                     Ventilation du chiffre d\'affaires par taux de Tva').style(styleJaune).style(encadreHB);
 ws.cell(3,3).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,4).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,5).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,6).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,7).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,8).string('').style(styleJaune).style(encadreHB);
 ws.cell(3,9).string('    Ventilation du Chiffre d\'affaires par mode de paiement').style(styleBleu).style(encadreG);
 ws.cell(3,10).string('').style(styleBleu).style(encadreHB);
 ws.cell(3,11).string('').style(styleBleu).style(encadreHB);
 ws.cell(3,12).string('').style(styleBleu).style(encadreHB);
 ws.cell(3,13).string('').style(styleBleu).style(encadreD);
 
 //ligne entetes de olonnes
 ws.cell(4,1).string('Date').style(EcritRouge).style(encadreT);
 ws.cell(4,2).string('HT 5,5').style(EcritRouge).style(encadreT);
 ws.cell(4,3).string('TVA 5,5').style(EcritRouge).style(encadreT);
 ws.cell(4,4).string('HT 10').style(EcritRouge).style(encadreT);
 ws.cell(4,5).string('TVA 10').style(EcritRouge).style(encadreT);
 ws.cell(4,6).string('HT 20').style(EcritRouge).style(encadreT);
 ws.cell(4,7).string('TVA 20').style(EcritRouge).style(encadreT);
 ws.cell(4,8).string('TTC').style(EcritRouge).style(encadreT);
 ws.cell(4,9).string('Carte bleue').style(EcritRouge).style(encadreT);
 ws.cell(4,10).string('Chèque').style(EcritRouge).style(encadreT);
 ws.cell(4,11).string('Espèces').style(EcritRouge).style(encadreT);
 ws.cell(4,12).string('Crédit').style(EcritRouge).style(encadreT);
 ws.cell(4,13).string('TTC').style(EcritRouge).style(encadreT);

 
//remplissage des données
var depart = 5;
var rows = Object.keys(datas);
rows.map (function (obj, id) {
    var ligne = datas[obj];
    ws.cell(depart,1).string(ligne.date).style(encadreG);
    ws.cell(depart,2).string('HT 5,5').style(encadreT);
    ws.cell(depart,3).string('TVA 5,5').style(encadreT);
    ws.cell(depart,4).string('HT 10').style(encadreT);
    ws.cell(depart,5).string('TVA 10').style(encadreT);
    ws.cell(depart,6).string('HT 20').style(encadreT);
    ws.cell(depart,7).string('TVA 20').style(encadreT);
    ws.cell(depart,8).string('TTC').style(encadreT);
    ws.cell(depart,9).string('Carte bleue').style(encadreT);
    ws.cell(depart,10).string('Chèque').style(encadreT);
    ws.cell(depart,11).string('Espèces').style(encadreT);
    ws.cell(depart,12).string('Crédit').style(encadreT);
    ws.cell(depart,13).string('TTC').style(encadreT);
    depart ++;
});

callback(chemin);
};

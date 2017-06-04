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

var styleTitre = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#a9f2aa' // HTML style hex value. required.
    }
});
var styleRose = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#f4b0b0' // HTML style hex value. required.
    }
});
var styleJaune = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#f2eea4' // HTML style hex value. required.
    }
});
var styleBleu = wb.createStyle({
    
   fill: { // §18.8.20 fill (Fill)
        type: 'pattern', // Currently only 'pattern' is implimented. Non-implimented option is 'gradient'
        patternType: 'solid', //§18.18.55 ST_PatternType (Pattern Type)
        bgColor: '#FFFFFF', // HTML style hex value. optional. defaults to black
        fgColor: '#77f9f7' // HTML style hex value. required.
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
 //ligne titre
 ws.cell(1,1).string('').style(styleTitre);
 ws.cell(1,2).string('').style(styleTitre);
 ws.cell(1,3).string('').style(styleTitre);
 ws.cell(1,4).string('BROUILLARD DE CAISSE DE LA SARL "Le caddie goumand"-mois de : ' + tbMois[mois] + '    ' + annee).style(styleTitre);
 ws.cell(1,5).string('').style(styleTitre);
 ws.cell(1,6).string('').style(styleTitre);
 ws.cell(1,7).string('').style(styleTitre);
 ws.cell(1,8).string('').style(styleTitre);
 ws.cell(1,9).string('').style(styleTitre);
 ws.cell(1,10).string('').style(styleTitre);
 ws.cell(1,11).string('').style(styleTitre);
 ws.cell(1,12).string('').style(styleTitre);
 ws.cell(1,13).string('').style(styleTitre);
 //lignetitres colonnes
 ws.cell(3,1).string('').style(styleRose);
 ws.cell(3,2).string('                                     Ventilation du chiffre d\'affaires par taux de Tva').style(styleJaune);
 ws.cell(3,3).string('').style(styleJaune);
 ws.cell(3,4).string('').style(styleJaune);
 ws.cell(3,5).string('').style(styleJaune);
 ws.cell(3,6).string('').style(styleJaune);
 ws.cell(3,7).string('').style(styleJaune);
 ws.cell(3,8).string('').style(styleJaune);
 ws.cell(3,9).string('    Ventilation du Chiffre d\'affaires par mode de paiement').style(styleBleu);
 ws.cell(3,10).string('').style(styleBleu);
 ws.cell(3,11).string('').style(styleBleu);
 ws.cell(3,12).string('').style(styleBleu);
 ws.cell(3,13).string('').style(styleBleu);
 //ligne entetes de olonnes
 ws.cell(4,1).string('Date').style(EcritRouge);
 ws.cell(4,2).string('HT 5,5').style(EcritRouge);
 ws.cell(4,3).string('TVA 5,5').style(EcritRouge);
 ws.cell(4,4).string('HT 10').style(EcritRouge);
 ws.cell(4,5).string('TVA 10').style(EcritRouge);
 ws.cell(4,6).string('HT 20').style(EcritRouge);
 ws.cell(4,7).string('TVA 20').style(EcritRouge);
 ws.cell(4,8).string('TTC').style(EcritRouge);
 ws.cell(4,9).string('    Ventilation du Chiffre d\'affaires par mode de paiement').style(EcritRouge);
 ws.cell(4,10).string('').style(EcritRouge);
 ws.cell(4,11).string('').style(EcritRouge);
 ws.cell(4,12).string('').style(EcritRouge);
 ws.cell(4,13).string('').style(EcritRouge);
 
/*
// Set value of cell A1 to 100 as a number type styled with paramaters of style 

 
// Set value of cell B1 to 300 as a number type styled with paramaters of style 
ws.cell(1,2).number(200).style(style);
 
// Set value of cell C1 to a formula styled with paramaters of style 
ws.cell(1,3).formula('A1 + B1').style(style);
 
// Set value of cell A2 to 'string' styled with paramaters of style 
ws.cell(2,1).string('ceci est un tritounet').style(styleTitre);
 
// Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size. 
ws.cell(3,1).bool(true).style(style).style({font: {size: 14}});
 
wb.write('Excel.xlsx');
*/
};

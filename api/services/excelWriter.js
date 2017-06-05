// Require library 
var xl = require('excel4node');
var logger = require('../services/logger.init.js').logger("tom.txt");
module.exports = function(annee, mois, datas, callback){
logger.warn("dans excelWriter");
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

var chemin =  sails.config.archive_facture + 'ventilation_caddie_gourmand_'  + annee + '_' + mois + '.xlsx';
var nom_facture =  'ventilation_caddie_gourmand_'  + annee + '_' + mois + '.xlsx';
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
var encadreGD = wb.createStyle({
    border: {
        left: {
            style: 'thin', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
            color: '#000000' // HTML style hex value
        },
        right: {
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
try {
    //ligne titre
    ws.cell(1,1).string('').style(styleTitre).style(encadreG);
    ws.cell(1,2).string('').style(styleTitre).style(encadreHB);
    ws.cell(1,3).string('').style(styleTitre).style(encadreHB);
    ws.cell(1,4).string('BROUILLARD DE CAISSE DE LA SARL "Le caddie goumand"-mois de : ' + tbMois[parseInt(mois)] + '    ' + annee).style(styleTitre).style(encadreHB);
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

    logger.warn("avant écriture des données"); 
    //remplissage des données
    var depart = 5;
    var rows = Object.keys(datas);
    rows.map (function (obj, id) {
        var ligne = datas[obj];
        logger.util("ligne : ", ligne);
        ws.cell(depart,1).string(ligne.date).style(encadreGD);
        ws.cell(depart,2).number(ligne.HT_5_5).style(encadreGD);
        ws.cell(depart,3).number(ligne.TVA_5_5).style(encadreGD);
        ws.cell(depart,4).number(ligne.HT_10).style(encadreGD);
        ws.cell(depart,5).number(ligne.TVA_10).style(encadreGD);
        ws.cell(depart,6).number(ligne.HT_20).style(encadreGD);
        ws.cell(depart,7).number(ligne.TVA_20).style(encadreGD);
        ws.cell(depart,8).number(ligne.TTC).style(encadreGD);
        ws.cell(depart,9).number(ligne.CB).style(encadreGD);
        if(ligne.ND !== null && ligne.ND !== undefined)
            ws.cell(depart,10).number(ligne.ND).style(encadreGD);
        if(ligne.ND !== null && ligne.ND !== undefined && ligne.CH !== null && ligne.CH !== undefined) {
            ws.cell(depart,10).number(ligne.ND).style(encadreGD).style(EcritRouge);
            ws.cell(depart,14).number(ligne.CH).style(encadreGD);
        } else
            ws.cell(depart,10).number(ligne.CH).style(encadreGD);
        
        ws.cell(depart,11).number(ligne.ES).style(encadreGD);
        ws.cell(depart,12).number(ligne.CR).style(encadreGD);
        ws.cell(depart,13).number(ligne.TTC_REGLEMENT).style(encadreGD);
        depart ++;
    });
    ws.cell(depart,1).string('TOTAUX').style(encadreT);
    logger.warn('=SUM(B5:B' + (depart-1) + ')');
    ws.cell(depart,2).formula('=SUM(B5:B' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,3).formula('=SUM(C5:C' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,4).formula('=SUM(D5:D' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,5).formula('=SUM(E5:E' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,6).formula('=SUM(F5:F' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,7).formula('=SUM(G5:G' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,8).formula('=SUM(H5:H' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,9).formula('=SUM(I5:I' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,10).formula('=SUM(J5:J' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,11).formula('=SUM(K5:K' +(depart-1) + ')').style(encadreT);
    ws.cell(depart,12).formula('=SUM(L5:L' + (depart-1) + ')').style(encadreT);
    ws.cell(depart,13).formula('=SUM(M5:M' + (depart-1) + ')').style(encadreT);
    logger.warn('avant ecriture du fichier');
    try {
        wb.write(chemin);
       // wb.write("./" + nom_facture)
        return callback(null, nom_facture);
    } catch(e) {
        return callback(e, null);
    }
  } catch(e) {
       return callback(e, null);
  }
};

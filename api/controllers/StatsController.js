/**
 * StocksController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var logger = require('../services/logger.init.js').logger("tom.txt");
var achats = require('../services/achatsTool.js');
var moment = require("moment");

module.exports = {
	home: function (req, res) {
		var debut = moment().format("YYYY-MM-DD");
		var fin = moment().format("YYYY-MM-DD");
		var periode = 1;

		if(req.params.debut !== null && req.params.debut !== undefined) {
			debut = req.params.debut;
		}
		if(req.params.fin !== null && req.params.fin !== undefined) {
			fin = req.params.fin;
		}
		if (req.params.periode !== null && req.params.periode !== undefined) {
			periode = req.params.periode;
		}

		logger.warn("OK dans le controller stocks");
		var menu = fs.readFileSync(sails.config.appPath + '/views/menu.ejs').toString();

		return res.render ('chiffres/ventes',{'action': 'stats', 'periode': periode, 'd1': debut, 'd2': fin, 'menu': menu});
	},
	facturation: function(req, res) {
		var annee = req.params.annee;
		var mois = req.params.mois;
		logger.warn("annee : " + annee + ", mois : " + mois);
		mois = mois< 10?'0' + mois:mois;
		logger.warn("annee : " + annee + ", mois : " + mois);
		var debut = moment(annee + "-" + mois + "-01").format("YYYY-MM-DD HH:mm:ss");
		var fin = moment(annee + "-" + mois + "-01").add(1,'M').format("YYYY-MM-DD HH:mm:ss");
		var sql = "select commandes.createdAt as ladate, day(commandes.createdAt) as jour, tva as tva, ";
			sql +="cast(sum((pht/(1-(tx_com/100))*qte)) * 100 as integer)/100 as pht_ttl_com, ";
			sql +="cast(sum((pht*qte)) * 100 as integer)/100 as pht_ttl_sans_com, ";
			sql += " ( cast(sum((pht/(1-(tx_com/100))*qte)) * 100 as integer)/100 - cast(sum((pht*qte)) * 100 as integer)/100) as commiss ";
			sql += " from cmd_pr inner join commandes on commandes.id=cmd_pr.id_commande  ";
			sql += "where commandes.createdAt >= '" + debut + "' and commandes.createdAt <'" + fin + "' group by day(commandes.createdAt), tva"; 
		logger.warn("sql : ", sql);	
		
		var stats = [];
		var journee = {};
		sails.models.cmd_pr.query(sql, function(err, results){
			if (err !== null && err !== undefined) return res.send({"err": err, "msg": null});
			for (var c = 0; c < results.length; c++) {
				logger.util("ligne : " + results[c].ladate);
				logger.util("ligneF : " + moment(results[c].ladate).format("YYYY-MM-DD"));
				
				results[c].ladate = moment(results[c].ladate).format("YYYY-MM-DD");
				
					
				if(stats[results[c].jour] == null || stats[results[c].jour] == undefined) {
					stats[results[c].jour] = {};	
					stats[results[c].jour].HT_5_5 = 0;
					stats[results[c].jour].TVA_5_5 = 0;
					stats[results[c].jour].HT_10 = 0;
					stats[results[c].jour].TVA_10 = 0;
					stats[results[c].jour].HT_20 = 0;
					stats[results[c].jour].TVA_20 = 0;
					stats[results[c].jour].TTC = 0;
					stats[results[c].jour].CB = 0;
					stats[results[c].jour].CH = 0;
					stats[results[c].jour].ES = 0;
					stats[results[c].jour].CR = 0;
					stats[results[c].jour].ND = 0;
					stats[results[c].jour].TTC_REGLEMENT = 0;
					
				}
				
				if(results[c].tva == 5.5) {
					//logger.error("va ajouter " +  results[c].ttl_com + "a " + stats[results[c].ladate].HT_5_5);
					stats[results[c].jour].HT_5_5 +=  results[c].pht_ttl_com;
					stats[results[c].jour].TVA_5_5 +=  results[c].pht_ttl_com * (results[c].tva/100);
				} 
				if(results[c].tva == 10) {	
					stats[results[c].jour].HT_10 +=  results[c].pht_ttl_com;
					stats[results[c].jour].TVA_10 += results[c].pht_ttl_com * (results[c].tva/100);
				} 
				if(results[c].tva == 20) {	
					stats[results[c].jour].HT_20 +=  results[c].pht_ttl_com;
					stats[results[c].jour].TVA_20 += results[c].pht_ttl_com * (results[c].tva/100);
				} 
				

			}
			//calcul des totaux
			for (var c = 0; c < results.length; c++) {
				stats[results[c].jour].TTC = stats[results[c].jour].HT_5_5 + stats[results[c].jour].TVA_5_5 +
											   stats[results[c].jour].HT_10 + stats[results[c].jour].TVA_10 + 
											   stats[results[c].jour].HT_20 + stats[results[c].jour].TVA_20;
				stats[results[c].jour].date = results[c].ladate;							   
			}
			logger.warn("retour de statss : " + stats);
			sql = "select commandes.createdAt as ladate, day(commandes.createdAt) as jour, reglement, ";
			sql += "cast(sum( (pht/(1-(tx_com/100)) * (  1+ (tva/100)   ) *qte)) * 100 as integer)/100 as ttc ";
			sql += "from cmd_pr inner join commandes on commandes.id=cmd_pr.id_commande ";
			sql += "where commandes.createdAt >= '" + debut + "' and commandes.createdAt < '" + fin + "' "; 
			sql += "group by day(commandes.createdAt), reglement";
			sails.models.cmd_pr.query(sql, function(err, results){
				if (err !== null && err !== undefined) return res.send({"err": err, "msg": null});
				for (var c = 0; c < results.length; c++) {
					
					if(results[c].reglement == 'cb') stats[results[c].jour].CB += results[c].ttc;
					if(results[c].reglement == 'chèque') stats[results[c].jour].CH += results[c].ttc;
					if(results[c].reglement == 'espèce') stats[results[c].jour].ES += results[c].ttc;
					if(results[c].reglement == 'crédit') stats[results[c].jour].CR += results[c].ttc;
					if(results[c].reglement == '' || results[c].reglement == null || results[c].reglement ==undefined ) stats[results[c].jour].ND += results[c].ttc;
					

				}
				//un peu lourd mais efficace en lecture, plusieurs passages...
				for (var c = 0; c < results.length; c++) {
					stats[results[c].jour].TTC_REGLEMENT = stats[results[c].jour].CB + stats[results[c].jour].CH +
												stats[results[c].jour].ES + stats[results[c].jour].CR + 
												stats[results[c].jour].ND;
												   
				}
				logger.warn("avant excelWriter");
				excelWriter(annee, mois, stats, function(chemin) {
					logger.warn("dans closure : ", chemin);
					res.send(stats);
				});
				
			});
		});

	},
	ventes_jour: function (req, res) {
		var roundDecimal = function(nombre, precision){
	      var precision = precision || 2;
	      var tmp = Math.pow(10, precision);
	      return Math.round( nombre*tmp )/tmp;
	    }	
		repartition = {};
		sails.models.commandes.getCommandes(req, function(err, results){
			if (err !== null && err !== undefined) {
				return res.send({"err": err, "msg": null});
			} else {
				logger.util(results);
				var tb = [];
				
				var somme_ht = 0;
				var somme_tva = 0;
				var somme_ttc = 0;
				var somme_com = 0;
				
			

				var ccc = 0;
				if(results.length == 0) return res.send({"err": "Pas de commandes", "msg": null});
				var tvaRepartie = {};
				for (var c = 0; c < results.length; c++) {
					var idC = results[c][0];//id_commande idc
					var id_client = results[c][11];//id_client
					var createdAt = results[c][10];//commande livraion ou 12 pour createdAt
					
					logger.warn('attention idC: ', idC);
					logger.warn('attention id_client: ', id_client);
					
					sails.models.commandes.getOneFullCommande(idC, id_client, function(err, fCom) {
						//Tous les produits de 1 commande
						if (repartition[this.createdAt] === null || repartition[this.createdAt] === undefined) {
							repartition[this.createdAt] = {
								somme_ht: 0,
								somme_tva: 0,
								somme_ttc: 0,
								somme_com: 0,
								somme_tvaRepartie: {}
							};
						}
						for(var cptP = 0; cptP < fCom.produits.length; cptP++) {
							var prd = [];
							prd.push(fCom.produits[cptP].id);
							prd.push(fCom.produits[cptP].nom);
							prd.push(fCom.produits[cptP].achat_ttc);
							prd.push(fCom.produits[cptP].pht); 
							prd.push(fCom.produits[cptP].tva);//4
							prd.push(fCom.produits[cptP].commission);
							prd.push(fCom.produits[cptP].qte);
							prd.push(fCom.produits[cptP].ttl_ht);
							

							somme_ht += fCom.produits[cptP].ttl_ht;
							
							repartition[this.createdAt].somme_ht += fCom.produits[cptP].ttl_ht;
							prd.push(fCom.produits[cptP].ttl_tva);
							somme_tva += fCom.produits[cptP].ttl_tva;
							logger.error("nous avons une tva en date ", this.createdAt, " pour un !ontant de ", fCom.produits[cptP].ttl_tva);
							repartition[this.createdAt].somme_tva += fCom.produits[cptP].ttl_tva;
							if (tvaRepartie[fCom.produits[cptP].tx_tva] === null || tvaRepartie[fCom.produits[cptP].tx_tva] === undefined) tvaRepartie[fCom.produits[cptP].tx_tva] = 0;
							// repartition[createdAt] => obj retour d'une date , somme_tvaRepartie[fCom.produits[cptP].tx_tva] => tva par %tva
							if (repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva] === null || repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva] === undefined) repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva] = 0;
							
							//logger.warn("le ttl tva : ", fCom.produits[cptP].ttl_tva);
							tvaRepartie[fCom.produits[cptP].tx_tva] += roundDecimal(fCom.produits[cptP].ttl_tva, 2); 
							repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva] += roundDecimal(fCom.produits[cptP].ttl_tva, 2); 
							repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva] = roundDecimal(repartition[this.createdAt].somme_tvaRepartie[fCom.produits[cptP].tx_tva], 2);
							prd.push(fCom.produits[cptP].ttc);
							somme_ttc += fCom.produits[cptP].ttc;
							repartition[this.createdAt].somme_ttc += fCom.produits[cptP].ttc;
							prd.push(fCom.produits[cptP].ttl_com);
							somme_com += fCom.produits[cptP].ttl_com;
							repartition[this.createdAt].somme_com += fCom.produits[cptP].ttl_com;
							prd.push(fCom.produits[cptP].tx_com);//11
							prd.push(fCom.produits[cptP].tx_tva);//12
							logger.util('co ', prd);
							tb.push(prd);
						}
						repartition[this.createdAt].somme_ttc = roundDecimal(repartition[this.createdAt].somme_ttc, 2);
						repartition[this.createdAt].somme_ht = roundDecimal(repartition[this.createdAt].somme_ht, 2);
						repartition[this.createdAt].somme_com = roundDecimal(repartition[this.createdAt].somme_com, 2);
						/*
						var kk = Object.keys(repartition[this.createdAt].somme_tvaRepartie);
						kk.forEach(function(ltx, id) {
							repartition[this.createdAt].somme_tvaRepartie[ltx] = roundDecimal(repartition[this.createdAt].somme_tvaRepartie[ltx], 2);
							//logger.warn("le kk ", kk);
						});
						*/
						logger.error(repartition);
						if(ccc == results.length-1) {
							var objResult = {"data": null};
							objResult.data = tb;
							var o = Object.keys(tvaRepartie);
							o.map(function(obj, id) {
								tvaRepartie[obj] = roundDecimal(tvaRepartie[obj], 2);
							});
							objResult.recap = {};
							objResult.recap['somme_ht'] = roundDecimal(somme_ht, 2);
							objResult.recap['somme_tva'] = roundDecimal(somme_tva, 2);
							objResult.recap['somme_ttc'] = roundDecimal(somme_ttc, 2);
							objResult.recap['somme_com'] = roundDecimal(somme_com, 2);
							objResult.recap['somme_tva_repartie'] = tvaRepartie;
							objResult.recap['repartition'] = repartition;
							logger.util("avant retour : ", objResult.recap);
							objResult.err = null;
							res.send(objResult);
						}
						ccc++;
					}.bind({createdAt: createdAt}));
				}

				//return res.send({"err": null, "msg": results});
			}

		});
		
	}
};


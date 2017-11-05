var events = require('events');
var fs = require('fs');
var util = require("util");
var moment = require('moment');
var sleep = require('system-sleep');
var Immutable = require('immutable');
var mkdirp = require('mkdirp');
var Curl = require( 'node-libcurl' ).Curl;
var importProduits = require("./import_produits.js");
var flagPromos = require("./flag_promos.js");
//var http = require('http').Server(app);
var app = require('express')();
var http = require('http').Server(app);
var logger = require('../services/logger.init.js').logger("tom.txt");
/*
J'ai un tb de liens(pointeur)
Je lance getNext
Lors de la fin de traitement il retourne un event error 1 2 ou completed
*/

var lCurl_promos = function (ccurl, l_url, self) {
	ccurl.setOpt( 'URL', l_url );
    ccurl.setOpt( 'FOLLOWLOCATION', true );
    ccurl.on( 'end', function( statusCode, body, headers ) {
        logger.info('pour' + l_url);     
        logger.info( statusCode );
        logger.info( '---' );
        logger.info( body.length );
        logger.info( '---' );
        logger.info( this.getInfo( 'TOTAL_TIME' ) );
        //transformer le l_url de promo en rayon pour tromper la mécanique
        
        // ctl00_main_ctl01_pnlElementProduitsPromos
       
        var tb = body.split("('ctl00_main_ctl01_pnlElementProduitsPromos',");
         logger.warn("url courrante : ", l_url, " length ", tb.length);
        if (tb.length <= 1) {
        	logger.warn("branche promos BDR");
        	//('ctl00_main_ctl02_pnlElementProduitsBRD_NonPorteur
        	tb = body.split("('ctl00_main_ctl02_pnlElementProduitsBRD_NonPorteur',");
        } else {
        	logger.warn("branche promos offre spe");
        }
        
        if(tb.length > 0) {
         // //]]
         logger.warn("tblength>0 pour url ", l_url);
         //§!!!!!!!!! PB de synchro surement
         //pas moyen d'avoir la deuxieme promo
         	var part2 = tb[1];
            if(part2 !== null && part2 !== undefined) {
            	var tb2 = part2.split('Utilitaires.widget.initOptions');
	            var leJSON = tb2[0];
	            leJSON = leJSON.substring(0,leJSON.length-2);
	            var fn = 'Promos_' + self.pointeur + '.json';
	            logger.warn("fichier ", fn);
	            fs.writeFile(sails.config.importProductsFolder + fn, leJSON, function (err) {
	                if (err) {
	                  logger.error("pas bon pour " + l_url);
	                  self.nbErr ++;
	                  self.pct_ko = parseInt( (self.nbErr*100)/(self.tbPromos.length-1) );
	                  if (self.sockets !== null && self.sockets !== undefined) {
	                  		self.sockets.emit("error", self.pct_ko, self.pct_ok, l_url);
	                  }	
	                  self.emit('pasbon');
	                } else {
	                    logger.info("ok ducky");
	                    self.nbOk ++;
	                    self.pct_ok = parseInt( (self.nbOk*100)/(self.tbPromos.length-1) );
	                    
                       	logger.warn('va emttre un completed ', "");
                    	if (self.sockets !== null && self.sockets !== undefined) {
                    		self.sockets.emit("completed",self.pct_ko, self.pct_ok);	
                    	}
                    	self.emit('completed');
	                    
	                }
	                //logger.warn("point sur lespointeurs self.p", self.pointeur, " self promo ", self.tbPromos.length-1);
	                if(self.pointeur == self.tbPromos.length) {
                    	if (self.sockets !== null && self.sockets !== undefined) {
                    		self.sockets.emit("json_completed");
                    	}
                    	logger.error("!!!!!!!!!OK FINI!!!!!!!!!avant import db");
                    	
                    	flagPromos(self,function(result) {
                    		logger.warn("dans callback flagPromos");
                    		self.emit('all_completed');
                    		if (self.sockets !== null && self.sockets !== undefined) {
                    			self.sockets.emit("all_completed");
                    		}
                    	});
						
	                } 
	            });
            }  else {
	        	if (self.sockets !== null && self.sockets !== undefined) {
	        		self.nbErr ++;
	        		self.pct_ko = parseInt( (self.nbErr*100)/(self.tbPromos.length-1) );
    				self.sockets.emit("bad", self.pct_ko, self.pct_ok, l_url);
	    		}
	    		logger.error("pas bon 1");
	    		self.emit('pasbon');		
	        }

        } else {
        	//visiblement la page ne matche pas avec les élémets html à trouver
        	if (self.sockets !== null && self.sockets !== undefined) {
        		self.nbErr ++;
        		self.pct_ko = parseInt( (self.nbErr*100)/(self.tbPromos.length-1) );
    			self.sockets.emit("bad", self.pct_ko, self.pct_ok, l_url);
    		}
    		logger.error("pas bon 2");
    		self.emit('pasbon');	
        }
        this.close();
    });
    ccurl.on( 'error', function(err) {
    	logger.error("erreur curl err : ", err);
    	self.nbErr ++;
    	self.pct_ko = parseInt( (self.nbErr*100)/(self.tbPromos.length-1) );
    	ccurl.close.bind( ccurl  );
    	if (self.sockets !== null && self.sockets !== undefined) {
    		self.sockets.emit("bad", self.pct_ko, self.pct_ok);
    	}
    	
    	
	});
    ccurl.perform();
    return 0;
};

var lCurl = function(ccurl, l_url, self) {
	ccurl.setOpt( 'URL', l_url );
    ccurl.setOpt( 'FOLLOWLOCATION', true );
    ccurl.setOpt( 'SSL_VERIFYPEER', false);	
    ccurl.on( 'end', function( statusCode, body, headers ) {
        logger.info('pour' + l_url);     
        logger.info( 'st code ' + statusCode );
        logger.info( '---' );
        logger.info( 'body length : ' + body.length );
        logger.info( '---' );
        logger.info( 'les infos : ' + this.getInfo( 'TOTAL_TIME' ) );
       
        // ctl00_main_ctl01_pnlElementProduitsPromos

        var tb = body.split("pnlElementProduit',");
        if(tb.length > 0) {
            var part2 = tb[1];
            //logger.warn("tb : ", tb);
            if(part2 !== null && part2 !== undefined) {
            	//logger.warn("part2 : ", part2);
	            var tb2 = part2.split('Utilitaires.widget.initOptions');
	            var leJSON = tb2[0];
	            leJSON = leJSON.substring(0,leJSON.length-2);
	            var tbFn = l_url.split('rayon-');
	            var fn = tbFn[1] + '.json';
	     
	            fs.writeFile(sails.config.importProductsFolder + fn, leJSON, function (err) {
	                if (err) {
	                  logger.error("erreur : ", err);
	                  logger.error("pas bon pour " + l_url);
	                  self.nbErr ++;
	                  self.pct_ko = parseInt( (self.nbErr*100)/(self.tbLiens.length-1) );
	                  if (self.sockets !== null && self.sockets !== undefined) {
	                  		self.sockets.emit("error", self.pct_ko, self.pct_ok, l_url);
	                  }	
	                  logger.error ("pb ecriture fichier");
	                  self.emit('pasbon');
	                } else {
	                    logger.info("ok ducky");
	                    self.nbOk ++;
	                    self.pct_ok = parseInt( (self.nbOk*100)/(self.tbLiens.length-1) );
	                    
                       	logger.warn('va emttre un completed ', "");
                    	if (self.sockets !== null && self.sockets !== undefined) {
                    		self.sockets.emit("completed",self.pct_ko, self.pct_ok);	
                    	}
                    	self.emit('completed');
	                    
	                }

	                if(self.pointeur == self.tbLiens.length-1) {
                    	if (self.sockets !== null && self.sockets !== undefined) {
                    		self.sockets.emit("json_completed");
                    	}
                    	logger.error("!!!!!!!!!OK FINI!!!!!!!!!avant import db");
                    	importProduits(self,function(result) {
                    		self.emit('all_completed');
                    		if (self.sockets !== null && self.sockets !== undefined) {
                    			self.sockets.emit("all_completed");
                    		}
                    	});
	                } 
	            });
	        } else {
	        	if (self.sockets !== null && self.sockets !== undefined) {
	        		self.nbErr ++;
	        		self.pct_ko = parseInt( (self.nbErr*100)/(self.tbLiens.length-1) );
    				self.sockets.emit("bad", self.pct_ko, self.pct_ok, l_url);
	    		}
	    		logger.error("pas de split");
	    		logger.warn("obj connect : ", self.sockets);
	    		self.emit('pasbon');		
	        }
        } else {
        	//visiblement la page ne matche pas avec les élémets html à trouver
        	if (self.sockets !== null && self.sockets !== undefined) {
        		self.nbErr ++;
        		self.pct_ko = parseInt( (self.nbErr*100)/(self.tbLiens.length-1) );
    			self.sockets.emit("bad", self.pct_ko, self.pct_ok, l_url);
    		}
    		logger.error("pas de match");
    		self.emit('pasbon');	
        }
        this.close();
    });
    
    ccurl.on( 'error', function(err) {
    	logger.error("erreur curl msg : ", err);
    	self.nbErr ++;
    	self.pct_ko = parseInt( (self.nbErr*100)/(self.tbLiens.length-1) );
    	ccurl.close.bind( ccurl  );
    	if (self.sockets !== null && self.sockets !== undefined) {
    		self.sockets.emit("bad", self.pct_ko, self.pct_ok);
    	}
    	
    	
	});
    ccurl.perform();
    return 0;
};


function importeur(dest) {
	http.listen(1112, function(){
	  console.log('listening on *:1112');
	});
	events.EventEmitter.call(this); 
	self = this;
	this.nbOk = 0;
	this.nbErr = 0;
	this.pct_ok = 0;
	this.pct_ko = 0;
	this.sockets = null;
	
	this.io = require('socket.io')(http);
	this.io.on('connection', function(socket){
	  console.log("ok connect");
	  
	  socket.emit('welcome', "bou du");
	  //socket.emit('meteo_done', {msg:"bou du2"});
	  self.sockets = socket;
	});

	if (dest !== null && dest !== undefined) {
		this.import_type = "promos";
	} else {
		this.import_type = "";	
	}
	this.destinationFolder = "";
	this.currentLink = null;
	this.pointeur = -1;	
	this.tbPromos = ['https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/offres-288597-Promotions.aspx','https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/bons-de-reduction.aspx'];
	//autres promos https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/bons-de-reduction.aspx
	this.tbLiens = ['https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284325-Boucherie.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284326-Volailles-et-Gibiers.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284327-Poissonnerie.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-285187-Traiteur-de-la-mer.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284323-Fruits-Legumes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284310-Boissons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284314-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284351-Legumes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284351-Legumes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284350-Jus-de-fruits-et-legumes-frais.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284349-Fruits.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284358-Pains-et-Patisseries.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284361-Pains-de-mie-et-Pains-grilles.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284362-Patisseries-moelleuses.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284370-Laits-et-Oeufs.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284371-Beurres-et-Cremes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284372-Fromages.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284373-Charcuteries.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284374-Traiteur.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284375-Yaourts-et-Fromages-frais.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284376-Desserts.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-286690-Prepare-sur-place-.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284247-Aperitifs-Entrees-et-Snacks.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284248-Plats-cuisines-Pizzas-Tartes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284249-Viandes-et-Poissons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284250-Legumes-et-Frites.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284251-Glaces-et-Desserts-glaces.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284421-Pates-Riz-Feculents-Sauces.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284422-Conserves-et-Bocaux.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284423-Plats-cuisines.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284424-Aperitifs.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284425-Assaisonnements-et-Condiments.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-288378-Aides-a-la-cuisine-Bouillons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284426-Soupes-et-Croutons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-288991-Saveurs-du-monde.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284748-Boissons-du-matin-ou-du-soir.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284748-Boissons-du-matin-ou-du-soir.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284467-Petits-dejeuners.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284482-Biscuits.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284483-Patisseries-moelleuses.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284484-Chocolats-et-confiseries.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284485-Desserts-Sucres-et-Farines.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-288906-Dietetique-et-Allege.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-285414-Sirops-et-Boissons-aux-fruits.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284534-Eaux-et-Laits.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284520-Jus-de-fruits-et-legumes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284529-Colas-et-Boissons-gazeuses.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284519-Bieres-Alcools-et-Aperitifs.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-285383-Vins-rouges.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-285395-Vins-blancs-et-roses.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284518-Champagnes-Mousseux-Cidres.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284552-Laits-et-Petits-dejeuners.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284553-Repas-de-bebe.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284554-Gouters-et-desserts.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284555-Couches-lingettes-et-cotons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284556-Soins-et-puericulture.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284557-Le-marche-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284559-Epicerie-salee-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284560-Epicerie-sucree-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284561-Boissons-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284562-Bebe-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284563-Hygiene-et-beaute-Bio.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284593-Soins-du-corps.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284601-Soins-du-visage.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284602-Soins-des-cheveux.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284611-Hygiene-dentaire.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284615-Soins-des-hommes.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284623-Hygiene-feminine-Incontinence.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284629-Parapharmacie.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284633-Essuie-tout-papiers-et-cotons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284639-Lessives.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284645-Entretien-du-linge.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284646-Nettoyants-vaisselle.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284647-Nettoyants-maisons.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284649-Accessoires-menagers.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284648-Desodorisants-et-Insecticides.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284671-Les-chiens.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284675-Les-chats.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284676-Autres-animaux.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284684-Maison-Linge-et-Textile.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284687-Cuisine-et-Vaisselle.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284691-Papeterie-DVD-Presse-Jeux.aspx"',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284688-Bricolage-et-Automobile.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284690-Piles-Ampoules-et-Electricite.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284692-Chauffage-et-allumage.aspx',
		'https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284689-Fleurs-Jardin-et-Piscine.aspx'];
		
};

importeur.prototype.getNext = function() {
	this.pointeur += 1;
	if (this.import_type == "") {
		this.currentLink = this.tbLiens[this.pointeur];
		var curl = new Curl();
	    var full_url = this.tbLiens[this.pointeur];
    } else {
    	this.currentLink = this.tbPromos[this.pointeur];
		var curl = new Curl();
	    var full_url = this.tbPromos[this.pointeur];
    }

    if(full_url !== null && full_url !== undefined) {
    	logger.warn("pour ", full_url);
    	if (this.import_type == "")
    		lCurl(curl, full_url, this);
    	else 
    		lCurl_promos(curl, full_url, this);
	}
};

importeur.prototype.__proto__ = events.EventEmitter.prototype;
module.exports=importeur;

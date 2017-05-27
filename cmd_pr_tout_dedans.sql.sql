-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Sam 27 Mai 2017 à 15:36
-- Version du serveur :  10.1.21-MariaDB
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `caisse`
--

-- --------------------------------------------------------

--
-- Structure de la table `cmd_pr`
--

CREATE TABLE `cmd_pr` (
  `id` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `qte_ok` int(11) NOT NULL COMMENT 'utile pour les achats',
  `histo_qte` int(11) NOT NULL COMMENT 'histo precise : infos fixes post livraison',
  `pht` float NOT NULL,
  `tva` float NOT NULL,
  `tx_com` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `histo_pht_total` float NOT NULL,
  `histo_tva_total` float NOT NULL,
  `ttc_vente` float NOT NULL,
  `histo_ref_externe` char(30) CHARACTER SET utf8 NOT NULL,
  `histo_ref_interne` varchar(30) CHARACTER SET utf8 NOT NULL,
  `ttc_externe` float NOT NULL,
  `nom` varchar(155) CHARACTER SET utf8 NOT NULL,
  `icone` varchar(200) CHARACTER SET utf8 NOT NULL,
  `conditionnement` varchar(200) CHARACTER SET utf8 NOT NULL,
  `id_fournisseur` int(11) NOT NULL,
  `ref_interne` varchar(20) CHARACTER SET utf8 NOT NULL,
  `ref_externe` varchar(30) CHARACTER SET utf8 NOT NULL,
  `promo` int(11) NOT NULL,
  `idr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `cmd_pr`
--

INSERT INTO `cmd_pr` (`id`, `id_commande`, `id_produit`, `qte`, `qte_ok`, `histo_qte`, `pht`, `tva`, `tx_com`, `createdAt`, `updatedAt`, `histo_pht_total`, `histo_tva_total`, `ttc_vente`, `histo_ref_externe`, `histo_ref_interne`, `ttc_externe`, `nom`, `icone`, `conditionnement`, `id_fournisseur`, `ref_interne`, `ref_externe`, `promo`, `idr`) VALUES
(1, 1, 1609, 2, 0, 0, 1.73, 5.5, 40, '2017-05-27 13:20:35', '2017-05-27 13:20:35', 0, 0, 3.04, '', '', 1.82, 'Chorizo espagnol Saint Azay, 30 tranches - 150g', '787083.jpg', '12.13 € / ', 1, '', '6357', 0, 284320),
(2, 1, 3701, 1, 0, 0, 1.72, 5.5, 40, '2017-05-27 13:20:42', '2017-05-27 13:20:42', 0, 0, 3.02, '', '', 1.81, 'Piment de cayenne moulu Ducros, Extra fort - 38g', '1050730.jpg', '47.63 € / ', 1, '', '6791', 0, 284323),
(3, 1, 847, 1, 0, 0, 2.36, 5.5, 30, '2017-05-27 13:20:50', '2017-05-27 13:20:50', 0, 0, 3.56, '', '', 2.49, 'Tomate ronde Bio Village, 500g', '684345.jpg', '4.98 € / k', 1, '', '9255', 0, 284323),
(4, 1, 51, 4, 0, 0, 3.98, 5.5, 40, '2017-05-27 13:21:02', '2017-05-27 13:21:02', 0, 0, 7, '', '', 4.2, 'Paëlla royale Marie, 900g', '747554.jpg', '4.67 € / k', 1, '', '37286', 0, 284320);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `cmd_pr`
--
ALTER TABLE `cmd_pr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_commande` (`id_commande`,`id_produit`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `cmd_pr`
--
ALTER TABLE `cmd_pr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

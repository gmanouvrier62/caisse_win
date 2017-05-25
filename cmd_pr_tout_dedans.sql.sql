-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 25 Mai 2017 à 14:39
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
  `histo_ref_externe` char(30) NOT NULL,
  `histo_ref_interne` varchar(30) NOT NULL,
  `ttc_externe` float NOT NULL,
  `nom` varchar(155) NOT NULL,
  `icone` varchar(200) NOT NULL,
  `conditionnement` varchar(200) NOT NULL,
  `id_fournisseur` int(11) NOT NULL,
  `ref_interne` varchar(20) NOT NULL,
  `ref_externe` varchar(30) NOT NULL,
  `promo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `cmd_pr`
--

INSERT INTO `cmd_pr` (`id`, `id_commande`, `id_produit`, `qte`, `qte_ok`, `histo_qte`, `pht`, `tva`, `tx_com`, `createdAt`, `updatedAt`, `histo_pht_total`, `histo_tva_total`, `ttc_vente`, `histo_ref_externe`, `histo_ref_interne`, `ttc_externe`, `nom`, `icone`, `conditionnement`, `id_fournisseur`, `ref_interne`, `ref_externe`, `promo`) VALUES
(5145, 583, 847, 1, 0, 0, 2.36, 5.5, 30, '2017-05-25 14:31:40', '2017-05-25 14:31:40', 0, 0, 3.56, '', '', 2.49, '', '', '', 0, '', '', 0),
(5146, 583, 6723, 1, 0, 0, 1.87, 5.5, 40, '2017-05-25 14:31:54', '2017-05-25 14:31:54', 0, 0, 3.29, '', '', 1.97, '', '', '', 0, '', '', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5147;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

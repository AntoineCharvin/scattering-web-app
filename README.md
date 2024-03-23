# Projet Scattering

Nous sommes un groupe composé de sept étudiants inscrits au Master Physique Numérique à l'Université des Sciences de Montpellier. Dans le cadre de notre module de projet tutoré, nous avons entrepris le développement d'un programme capable de simuler et de modéliser le phénomène de diffraction d'ondes électromagnétiques (OEM) à travers des réseaux 2D composés de divers matériaux.

## Description du programme 

Notre programme exploite des techniques avancées de calcul numérique pour simuler le comportement diffractant d'un réseau plan de graphène. Cette simulation tient compte des propriétés physiques du matériau ainsi que des caractéristiques géométriques du réseau.

L'interface graphique (GUI) offre les fonctionnalités suivantes :

- Sélection du type de simulation à effectuer (spectre d'absorption, etc.)
- Entrée des paramètres correspondant à la configuration choisie
- Choix du type de résultats à afficher (spectre d'absorption, coefficients de réflexion/transmission, etc.)

### Technologies Utilisées

L'interface graphique a été entièrement conçue avec le framework React. Ainsi, dans l'environnement de développement, vous trouverez des fichiers JavaScript et CSS. Des commentaires sont intégrés dans les différents composants de l'application, détaillant leur rôle respectif et les liens qui les connectent.

- [React 📚](https://fr.legacy.reactjs.org)

L'algorithme de calcul a été implémenté de manière impérative (sans utilisation de classes ni de concepts orientés objet) en Python. Il reçoit les données d'entrée fournies par l'utilisateur via l'interface graphique, les analyse et utilise leur contenu pour effectuer les calculs des grandeurs physiques demandées.

Le serveur web est développé en utilisant Flask, un framework Python.

- [Flask 📚](https://flask.palletsprojects.com/en/2.3.x/)
- [Python (Anaconda) 🐍 ](https://www.anaconda.com)

## Prérequis

Pour développer l'application, vous aurez besoin des éléments suivants :

- Un IDE tel que [VSCode](https://code.visualstudio.com) ou un équivalent.
- Une distribution scientifique de Python3 installée.
- La dernière version de [NodeJS](https://nodejs.org/en).
- Le gestionnaire de paquets npm (automatiquement installé avec Node.js).
- Le gestionnaire de paquets Yarn (permettant des opérations de build et d'exécution plus rapides). 
` npm install --global yarn `

## Installation :sparkles:

Pour utiliser notre programme, vous pouvez cloner notre dépôt Git et exécuter le code sur votre ordinateur local. 

```bash
$ git clone https://gitlab.etu.umontpellier.fr/scattering-team/scattering-m1phynum.git
```

- Ensuite, exécutez le fichier app.py situé dans le dossier `./the-scattering-app/Flask.`


### Développement de l'application

Pour contribuer au développement de l'application, suivez ces étapes :

1. Clonez le repo depuis GitLab : 

```bash
$ git clone https://gitlab.etu.umontpellier.fr/scattering-team/scattering-m1phynum.git
```

2. Se rendre ou bien ouvrir le dossier the-scattering-app dans un terminal

3. lancer les commandes

```bash
$ yarn install
$ yarn start
````

L'application web démarre, elle est disponible sur le port 3000 via l'url : 
http://localhost:3000

#### Vous pouvez éditer le code en temps réel, l'application web est recompiler à chaque modifications sauvegardées 

## Déploiement de l'application 

1. À la racine du dossier `./the-scattering-app`, lancer la commande :
```bash
yarn build
```

2. un dossier build est crée, vous pouvez coller le dossier `.build/static` dans le dossier `./Flask/static` ( il doit bien y avoir un dossier static dans un autre c'est normal )



3. éxecuter le fichier app.py pour lancer le serveur de calcul web python et l'applcation web.



### Auteurs


***ATTOU Khalis***\
***AUNEY Pierre***\
***CHARVIN Antoine***\
***GONINET Tristan***\
***JASPARD Lucas***\
***LAPPO Lidia***\
***LENDRIN Morgane***

#### Remerciements 

###### Nous espérons que notre programme sera utile pour la communauté de recherche en optique et en physique des matériaux, et nous sommes ouverts aux contributions et commentaires pour améliorer encore plus notre travail.

###### Merci d'avoir lu ce README et n'hésitez pas à nous contacter si vous avez des questions ou des commentaires sur notre projet!

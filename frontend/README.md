# Lancer l'application

Démarrer un serveur php : Dans le dossier backend, executer la commande `php -S localhost:3000 -t public/`  

Démarrer un serveur angular : Dans le dossier frontend, executer la commande `ng serve`  


## Créer et alimenter la base de données

Dans le dossier backend : Exécuter les commandes suivantes :  

Création de la base de données : `php bin/console d:d:c`  

Création de les tables : `php bin/console d:m:m`  

Inserer les données (fixtures): `php bin/console d:f:l`  


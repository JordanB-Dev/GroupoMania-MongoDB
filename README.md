# Projet 7 Groupomania !

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le
but de cet outil est de faciliter les interactions entre collègues. Le département RH de
Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues. Ce projet a été réalisé dans le cadre de la formation développeur web d'OpenClassRooms.

# Démarrer

1. Clone le projet

------Back-end---------

1. cd back-end
2. npm install ou yarn add package.json
3. Créé DB MongoDB puis import la base de données sauvegarde.json (Pas obligatoire)
4. Crée un fichier .env et prend exemple sur le .env.example
5. Lance le Back-end -> nodemon server

------Front-end---------

1. cd front-end
2. npm install ou yarn add package.json
3. Créé un fichier .env et prend exemple sur le .env.example "REACT_APP_API_URL=http://localhost:4200/"
4. Lance le Font-end -> npm start ou yarn start

------Sauvegarde DB---------

1. Dossier DB sauvegarde

------Compte Admin---------

1. Adresse mail: admin@gmail.com
2. Mot de passe: Admin789456@

------Compte Demo---------

1. Adresse mail: demo@gmail.com
2. Mot de passe: Demo789456@

# Fonctionnalités

Une fois que l'utilisateur aura créé un compte, il aura la possibilité de :

1. Publier des posts (avec ou sans images)
2. Réagir à des posts
3. Commenter des posts
4. Modifier ses posts/commentaires
5. Supprimer ses posts/commentaire
6. Modifier ses informations personnelles
7. Désactiver son compte/ réactiver son compte

# Compte ADMIN Fonctionnalités

1. Modifier tous les posts/commentaires
2. Supprimer tous les posts/commentaire
3. Modifier les informations personnelles des utilisateurs
4. Bannir/débannir tous les comptes

# Projet Openclassromm Groupomania !

Groupomania est le réseau social interne de l'entreprise du même nom. Ce projet a été réalisé dans le cadre de la formation développeur web d'OpenClassRooms.

# Démarrer

1. Clone le projet
   ------Back-end---------
2. cd back-end
3. npm install ou yarn add package.json
4. Créé DB MongoDB puis import la base de données sauvegarde.json (Pas obligatoire)
5. Crée un fichier .env et prend exemple sur le .env.example
6. Lance le Back-end -> nodemon server

------Front-end---------

1. cd front-end
2. npm install ou yarn add package.json
3. Créé un fichier .env et prend exemple sur le .env.example "REACT_APP_API_URL=http://localhost:4200/"
4. Lance le Font-end -> npm start ou yarn start

# Fonctionnalités

Une fois que l'utilisateur aura créé un compte, il aura la possibilité de :

Publier des posts (avec ou sans images)
Réagir à des posts
Commenter des posts
Modifier ses posts/commentaires
Supprimer ses posts/commentaire
Modifier ses informations personnelles
Désactiver son compte/ réactiver son compte

# Compte ADMIN Fonctionnalités

Modifier tous les posts/commentaires
Supprimer tous les posts/commentaire
Modifier les informations personnelles des utilisateurs
Bannir/débannir tous les comptes

# Utiliser une image de node.js version 16
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Installer Angular CLI globalement
RUN npm install -g @angular/cli@16.1.1

# Exposer le port 4200 pour le serveur de développement Angular
EXPOSE 443

# Copier le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application dans le conteneur
COPY . .

# Commande par défaut pour démarrer l'application Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "443"]
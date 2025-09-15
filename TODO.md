# Déploiement du Backend Laravel sur Render

## Étapes pour le déploiement manuel

1. **Préparer le code :**
   - Assurez-vous que votre code est poussé sur un dépôt Git (GitHub, GitLab, etc.).
   - Vérifiez que le fichier `backend/Procfile` est présent avec la commande appropriée.

2. **Créer un compte Render :**
   - Allez sur [render.com](https://render.com) et créez un compte si vous n'en avez pas.

3. **Créer un nouveau service Web :**
   - Cliquez sur "New" > "Web Service".
   - Connectez votre dépôt Git.
   - Sélectionnez le dépôt et la branche principale.

4. **Configurer le service :**
   - **Name** : Choisissez un nom pour votre service, par exemple "red-product-backend".
   - **Environment** : Sélectionnez "Docker" (car PHP n'est pas dans la liste des runtimes). Render utilisera le Dockerfile dans le dossier backend.
   - **Root Directory** : Entrez "backend" (car votre backend est dans ce dossier).
   - Si les champs sont requis, définissez :
     - **Build Command** : `composer install --no-dev --optimize-autoloader && php artisan key:generate`
     - **Start Command** : `vendor/bin/heroku-php-apache2 public/`
   - Sinon, laissez-les vides si possible.

5. **Configurer les variables d'environnement :**
   - Ajoutez les variables suivantes dans la section "Environment" :
     - `APP_ENV` : production
     - `APP_DEBUG` : false
     - `APP_KEY` : base64:IAjCgeBzyjSFuqQ1+JxCrBIY68dbHIwWGU0PaZ6PXvE= (clé générée)
     - `DB_CONNECTION` : mysql (important : la valeur par défaut est sqlite, changez-la à mysql pour MySQL)
     - `DB_HOST` : Adresse de votre base de données (si vous utilisez une base Render, elle sera fournie).
     - `DB_PORT` : 3306
     - `DB_DATABASE` : Nom de la base de données (par défaut 'laravel' dans Laravel, mais adaptez à votre base).
     - `DB_USERNAME` : Nom d'utilisateur de la base (par défaut 'root').
     - `j` : Mot de passe de la base (par défaut vide).
   - Si vous utilisez une base de données Render, créez d'abord un service de base de données MySQL sur Render, puis liez-le.

6. **Déployer :**
   - Cliquez sur "Create Web Service".
   - Render va construire et déployer votre application.
   - Une fois déployé, vous obtiendrez une URL publique pour accéder à votre backend.

7. **Vérifier le déploiement :**
   - Accédez à l'URL fournie par Render.
   - Testez les endpoints de votre API Laravel.

## Remarques
- Assurez-vous que votre application Laravel est configurée pour la production (cache des routes, vues, etc.).
- Si vous utilisez des migrations, vous pouvez les exécuter manuellement via le shell Render ou les inclure dans le build command.
- Pour des déploiements automatisés, utilisez le fichier `render.yaml` fourni.

## Pour le fichier render.yaml
- Le fichier `render.yaml` est créé à la racine de votre projet.
- Pour l'utiliser, allez dans Render Dashboard > Blueprints > Create Blueprint, et sélectionnez le fichier render.yaml.
- Cela automatisera la création du service avec les configurations définies.

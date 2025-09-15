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
   - **Runtime** : Sélectionnez "PHP".
   - **Root Directory** : Entrez "backend" (car votre backend est dans ce dossier).
   - **Build Command** : `composer install --no-dev --optimize-autoloader && php artisan key:generate`
   - **Start Command** : `vendor/bin/heroku-php-apache2 public/`

5. **Configurer les variables d'environnement :**
   - Ajoutez les variables suivantes dans la section "Environment" :
     - `APP_ENV` : production
     - `APP_DEBUG` : false
     - `APP_KEY` : Générez une clé avec `php artisan key:generate` localement et copiez-la, ou laissez Render la générer.
     - `DB_CONNECTION` : mysql (ou selon votre base de données)
     - `DB_HOST` : Adresse de votre base de données (si vous utilisez une base Render, elle sera fournie).
     - `DB_PORT` : 3306
     - `DB_DATABASE` : Nom de la base de données.
     - `DB_USERNAME` : Nom d'utilisateur de la base.
     - `DB_PASSWORD` : Mot de passe de la base.
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

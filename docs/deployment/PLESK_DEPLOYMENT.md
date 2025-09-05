# Instrukcja wdroż5. Wgraj wszystkie pliki z folderu `dist/` do katalogu głównego domenynia aplikacji Pigeon Map Landing na Plesk

## Opcja 1: Wdrożenie statyczne (zalecane dla landing page)

### Krok 1: Przygotowanie aplikacji
1. Upewnij się, że `next.config.ts` jest skonfigurowany z `output: "export"` (skrypt automatycznie zmieni to)
2. Zbuduj aplikację lokalnie:
   ```bash
   ./deploy-to-plesk.sh static
   ```
3. Po udanym buildzie zostanie utworzony folder `dist/` z wszystkimi plikami statycznymi

### Krok 2: Upload do Plesk
1. Zaloguj się do panelu Plesk
2. Wybierz domenę/subdomenę, na którą chcesz wdrożyć aplikację
3. Przejdź do **File Manager** lub użyj FTP
4. Przejdź do katalogu głównego domeny (zwykle `httpdocs/` lub `public_html/`)
5. Usuń wszystkie istniejące pliki w katalogu głównym
6. Wgraj wszystkie pliki z folderu `out/` do katalogu głównego domeny

### Krok 3: Konfiguracja serwera
1. W panelu Plesk przejdź do **Apache & nginx Settings**
2. Dodaj następujące reguły do sekcji "Additional directives for HTTP":

```apache
RewriteEngine On

# Handle Next.js static files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Handle localized routes
RewriteRule ^(en|pl)/(.*)$ /$2 [L]

# Set proper MIME types
<FilesMatch "\.(js|css|html|json)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>
```

## Opcja 2: Wdrożenie z Node.js (dla funkcji serwerowych)

### Wymagania
- Plesk z obsługą Node.js (wersja 18 lub nowsza)
- Dostęp do SSH lub terminala w Plesk

### Krok 1: Przygotowanie
1. Zbuduj aplikację w trybie standalone:
   ```bash
   ./deploy-to-plesk.sh nodejs
   ```
2. Folder `dist/` będzie zawierał wszystkie niezbędne pliki

### Krok 2: Upload plików
1. Wgraj wszystkie pliki z folderu `dist/` na serwer Plesk do katalogu domeny
2. Pliki będą już zawierały wszystkie niezbędne zależności (dzięki standalone mode)

### Krok 3: Konfiguracja Node.js w Plesk
1. W panelu Plesk przejdź do **Node.js**
2. Ustaw:
   - **Document Root**: `httpdocs/`
   - **Application Root**: `httpdocs/`
   - **Application Startup File**: `server.js`
   - **Node.js Version**: 18.x lub nowsza
3. Dodaj zmienne środowiskowe:
   - `NODE_ENV=production`
   - `PORT=3000`
4. **Restart aplikacji** w panelu Plesk

### Krok 5: Konfiguracja proxy
1. W **Apache & nginx Settings** dodaj:

```apache
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
ProxyPreserveHost On
```

## Opcja 3: Wdrożenie przez Git (zalecane dla CI/CD)

### Krok 1: Konfiguracja repozytorium
1. Utwórz repozytorium Git (GitHub, GitLab, Bitbucket)
2. Wypchnij kod do repozytorium

### Krok 2: Konfiguracja w Plesk
1. W panelu Plesk przejdź do **Git**
2. Dodaj nowe repozytorium:
   - **Repository URL**: URL do Twojego repo
   - **Repository path**: `/httpdocs/`
3. Konfiguruj deployment actions:

```bash
#!/bin/bash
npm install
npm run build

# Dla wdrożenia statycznego
cp -r out/* /var/www/vhosts/domena.pl/httpdocs/

# LUB dla wdrożenia Node.js
pm2 restart pigeon-map-app || pm2 start server.js --name pigeon-map-app
```

## Dodatkowe konfiguracje

### SSL Certificate
1. W panelu Plesk przejdź do **SSL/TLS Certificates**
2. Zainstaluj Let's Encrypt lub wgraj własny certyfikat
3. Włącz przekierowanie HTTP → HTTPS

### Konfiguracja DNS
Upewnij się, że rekord A lub CNAME wskazuje na adres IP serwera Plesk.

### Monitoring i logi
- Logi Apache/Nginx: `/var/log/plesk/apache/`
- Logi Node.js: `/var/log/plesk/nodejs/`
- Logi aplikacji dostępne w panelu Plesk → Logs

## Rozwiązywanie problemów

### Błąd 500
- Sprawdź logi serwera
- Upewnij się, że wszystkie zależności są zainstalowane
- Sprawdź uprawnienia plików (755 dla folderów, 644 dla plików)

### Problemy z routingiem
- Sprawdź konfigurację .htaccess lub nginx
- Upewnij się, że reguły rewrite są poprawne

### Problemy z internacjonalizacją
- Sprawdź, czy wszystkie pliki językowe są wgrane
- Sprawdź konfigurację next-intl

## Zalecenia bezpieczeństwa
1. Ustaw odpowiednie uprawnienia plików
2. Używaj HTTPS
3. Regularnie aktualizuj zależności
4. Skonfiguruj firewall
5. Monitoruj logi pod kątem podejrzanej aktywności

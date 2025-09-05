# 🚀 Instrukcja wdrożenia Pigeon Map Landing na Plesk

**⚠️ UWAGA: Ta aplikacja używa next-intl z middleware, co uniemożliwia static export. Musisz użyć wdrożenia Node.js.**

## ✅ Zalecany sposób: Wdrożenie Node.js

### Krok 1: Przygotowanie aplikacji
```bash
./deploy-to-plesk.sh nodejs
```

Po wykonaniu tego polecenia zostanie utworzony folder `dist/` z wszystkimi plikami gotowymi do wdrożenia.

### Krok 2: Upload plików na serwer
1. **Zaloguj się do panelu Plesk**
2. **Przejdź do File Manager** swojej domeny
3. **Usuń wszystkie pliki** z katalogu `httpdocs/`
4. **Wgraj wszystkie pliki** z folderu `dist/` do `httpdocs/`

### Krok 3: Konfiguracja Node.js w Plesk
1. W panelu Plesk przejdź do **Node.js**
2. Kliknij **Enable Node.js**
3. Ustaw konfigurację:
   - **Node.js Version**: `18.x` lub nowsza
   - **Document Root**: `httpdocs/`
   - **Application Root**: `httpdocs/`
   - **Application Startup File**: `server.js`

4. **Dodaj zmienne środowiskowe:**
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

5. Kliknij **Apply** i **Restart App**

### Krok 4: Sprawdzenie działania
1. Sprawdź **logi w panelu Plesk** - nie powinno być błędów
2. **Odwiedź swoją domenę** - aplikacja powinna działać
3. Sprawdź czy wszystkie języki (pl/en) działają poprawnie

## 🔧 Opcjonalna konfiguracja proxy

Jeśli aplikacja nie działa bezpośrednio na domenie, dodaj konfigurację proxy:

1. Przejdź do **Apache & nginx Settings**
2. W sekcji "Additional directives for HTTP" dodaj:

```apache
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
ProxyPreserveHost On
```

## 🔒 Konfiguracja SSL (zalecane)

1. Przejdź do **SSL/TLS Certificates**
2. Wybierz **Let's Encrypt** (darmowy)
3. Zaznacz **Secure the www subdomain as well**
4. Kliknij **Get it free**
5. Włącz **Redirect from HTTP to HTTPS**

## 📋 Rozwiązywanie problemów

### Aplikacja nie uruchamia się
- Sprawdź logi w panelu Plesk → Logs
- Upewnij się, że Node.js jest w wersji 18+
- Sprawdź czy plik `server.js` istnieje w `httpdocs/`

### Błąd 502/503
- Restart aplikacji w panelu Node.js
- Sprawdź czy port 3000 nie jest zajęty
- Sprawdź logi serwera

### Problemy z językami
- Sprawdź czy folder `messages/` został wgrany
- Sprawdź czy pliki `pl.json` i `en.json` istnieją

### Powolne ładowanie
- Sprawdź czy w panelu Apache & nginx masz włączone:
  - **Gzip compression**
  - **Static files optimization**

## 🔄 Aktualizacja aplikacji

Po wprowadzeniu zmian w kodzie:

1. Lokalnie wykonaj: `./deploy-to-plesk.sh nodejs`
2. Wgraj nowe pliki z `dist/` na serwer
3. Restart aplikacji w panelu Node.js

## 📞 Kontakt

Jeśli masz problemy z wdrożeniem, sprawdź:
- Logi w panelu Plesk
- Dokumentację Plesk dla Node.js
- Status aplikacji w panelu Node.js

---

**✅ Gotowe! Twoja aplikacja Pigeon Map Landing powinna teraz działać na Plesk.**

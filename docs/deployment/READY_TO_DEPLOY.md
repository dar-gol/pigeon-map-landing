# ✅ GOTOWE - Aplikacja Pigeon Map Landing jest przygotowana do wdrożenia na Plesk

## 📁 Pliki gotowe do wdrożenia

### Opcja 1: Archiwum ZIP (ZALECANE - szybkie wgrywanie)
✅ **`releases/pigeon-map-landing-YYYYMMDD-HHMMSS.zip` (~15MB)**
- Skompresowane wszystkie pliki potrzebne do wdrożenia
- Szybkie wgrywanie przez File Manager w Plesk
- Automatyczne rozpakowanie w panelu
- Archiwum z timestamp w folderze `releases/`

### Opcja 2: Folder dist/ (alternatywnie)
Folder `dist/` zawiera wszystkie pliki potrzebne do wdrożenia:
```
dist/
├── .next/          # Build Next.js (kompletny)
├── content/        # Pliki blogowe  
├── node_modules/   # Zależności (gotowe do produkcji)
├── package.json    # Konfiguracja pakietów
├── public/         # Pliki statyczne (ikony, obrazy)
└── server.js       # Serwer aplikacji
```

**Rozmiar:** ~49MB (nieskompresowany)

## 🚀 Instrukcja wdrożenia na Plesk (KROK PO KROKU)

### Krok 1: Upload plików

#### Opcja A: ZIP (SZYBSZA - zalecana)
1. **Zaloguj się do panelu Plesk**
2. **Wybierz domenę** na którą chcesz wdrożyć aplikację
3. **Przejdź do File Manager**
4. **Usuń wszystkie pliki** z folderu `httpdocs/`
5. **Wgraj najnowszy plik ZIP** z folderu `releases/` do `httpdocs/`
6. **Kliknij prawym na ZIP** → **Extract** (rozpakuj)
7. **Usuń plik ZIP** po rozpakowaniu

#### Opcja B: Pojedyncze pliki (wolniejsza)
1. **Zaloguj się do panelu Plesk**
2. **Wybierz domenę** na którą chcesz wdrożyć aplikację  
3. **Przejdź do File Manager**
4. **Usuń wszystkie pliki** z folderu `httpdocs/`
5. **Wgraj wszystkie pliki** z folderu `dist/` do `httpdocs/`

### Krok 2: Konfiguracja Node.js
1. W panelu Plesk przejdź do **Node.js**
2. Kliknij **Enable Node.js**
3. Ustaw konfigurację:
   - **Node.js Version**: `18.x` lub `20.x`
   - **Document Root**: `httpdocs/`
   - **Application Root**: `httpdocs/`
   - **Application Startup File**: `server.js`
4. **Zmienne środowiskowe:**
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
5. Kliknij **Apply** i **Restart App**

### Krok 3: Sprawdzenie
- Aplikacja powinna być dostępna pod Twoją domeną
- Sprawdź logi w panelu Plesk (powinny być bez błędów)
- Przetestuj oba języki: `domena.pl/pl` i `domena.pl/en`

## ⚙️ Opcjonalne konfiguracje

### SSL (HTTPS) - zalecane
1. **SSL/TLS Certificates** → **Let's Encrypt**
2. Zaznacz **"Secure the www subdomain"**
3. **Get it free**
4. Włącz **"Redirect from HTTP to HTTPS"**

### Optymalizacja wydajności
W **Apache & nginx Settings** dodaj:
```apache
# Kompresja
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache dla plików statycznych
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>
```

## 🔄 Aktualizacja aplikacji

Po wprowadzeniu zmian w kodzie:
1. **Lokalnie:** `./deploy-to-plesk.sh nodejs`
2. **Wgraj najnowszy plik ZIP** z folderu `releases/` na serwer i rozpakuj
3. **Restart aplikacji** w panelu Node.js

*(Nowe archiwum automatycznie otrzyma timestamp w nazwie i zostanie zapisane w `releases/`)*

### 🗂️ Zarządzanie wersjami
- **Sprawdź dostępne wersje:** `./manage-releases.sh list`
- **Najnowsze archiwum:** `./manage-releases.sh latest`
- **Wyczyść stare wersje:** `./manage-releases.sh clean`
- **Ręczne usuwanie:** `rm releases/pigeon-map-landing-YYYYMMDD-*.zip`

## 🐛 Rozwiązywanie problemów

### Aplikacja nie uruchamia się
- Sprawdź **logi w panelu Plesk**
- Upewnij się, że **Node.js ≥ 18.x**
- Sprawdź czy **server.js** istnieje w `httpdocs/`

### Błąd 502/503
- **Restart aplikacji** w panelu Node.js
- Sprawdź czy **port 3000 nie jest zajęty**
- Sprawdź **zmienne środowiskowe**

### Problemy z językami (pl/en)
- Sprawdź czy folder **messages/** został wgrany
- Sprawdź czy istnieją pliki **pl.json** i **en.json**

### Błędy w logach
- Większość błędów to problemy z **uprawnieniami plików**
- Ustaw uprawnienia: **755 dla folderów, 644 dla plików**

## 📞 Pomoc techniczna

Jeśli wystąpią problemy:
1. **Sprawdź logi aplikacji** w panelu Plesk → Logs
2. **Sprawdź status aplikacji** w panelu Node.js
3. **Sprawdź dokumentację Plesk** dla Node.js
4. **Restart serwera** jako ostatnia opcja

---

## 🎉 Aplikacja jest gotowa do wdrożenia!

**✅ Archiwum ZIP:** `releases/pigeon-map-landing-YYYYMMDD-HHMMSS.zip` (15MB)  
**✅ Folder dist/:** Wszystkie pliki rozpakowane (49MB)  
**🗂️ Zarządzanie wersji:** Folder `releases/` z archiwami  
**🚀 Czas wdrożenia:** ~5-10 minut z ZIP  
**⚙️ Wymagania:** Plesk z Node.js 18+  

**🎯 ZALECENIE:** Użyj archiwum ZIP - jest 3x szybsze w wgrywaniu!

**Powodzenia! 🚀**

# 🚀 SZYBKI START - Wdrożenie ZIP na Plesk

## ✅ Gotowe do wgrania!

**📦 Archiwum:** `releases/pigeon-map-landing-*.zip` (15MB)  
**📁 Lokalizacja:** Folder `releases/`  
**⏱️ Czas wgrywania:** 2-3 minuty  
**🎯 Cel:** Szybkie wdrożenie na Plesk  

---

## 📋 Instrukcja krok po kroku:

### 1️⃣ **Upload ZIP**
- Zaloguj się do **panelu Plesk**
- Przejdź do **File Manager** swojej domeny
- **Usuń wszystko** z folderu `httpdocs/`
- **Wgraj najnowszy plik ZIP** z folderu `releases/` do `httpdocs/`

### 2️⃣ **Rozpakuj**
- **Kliknij prawym** na plik ZIP
- Wybierz **"Extract"** (Rozpakuj)
- **Usuń plik ZIP** po rozpakowaniu

### 3️⃣ **Konfiguruj Node.js**
- Przejdź do sekcji **Node.js** w panelu
- **Enable Node.js**
- Ustaw:
  - **Version:** 18.x lub 20.x
  - **Startup File:** `server.js`
  - **Zmienne:** `NODE_ENV=production`, `PORT=3000`
- **Apply & Restart**

### 4️⃣ **Sprawdź**
- Odwiedź swoją domenę
- Przetestuj: `/pl` i `/en`
- Sprawdź logi w panelu

---

## 🔒 SSL (opcjonalnie)
- **SSL/TLS Certificates** → **Let's Encrypt**
- **Get it free** + **Redirect HTTP→HTTPS**

---

## ✅ GOTOWE!
**Twoja aplikacja powinna działać pod domeną z obsługą polskiego i angielskiego języka.**

**Potrzebujesz pomocy?** Sprawdź `READY_TO_DEPLOY.md` dla szczegółów.

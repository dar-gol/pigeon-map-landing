# 🕊️ Pigeon Map Landing

> Nowoczesna strona landing dla aplikacji Pigeon Map - platformy dla hodowców gołębi

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](http## 📄 Licencja / License

🔒 **Ten projekt jest aplikacją komercyjną** z restrykcyjną licencją:  
🔒 **This project is a commercial application** with restrictive license:

- ✅ **Dozwolone / Permitted:** Przeglądanie, nauka, analiza kodu / Viewing, learning, code analysis
- ❌ **Zabronione / Prohibited:** Kopiowanie, modyfikacja, użycie komercyjne / Copying, modification, commercial use
- 📧 **Licencja komercyjna / Commercial license:** dariusz.w.golom@gmail.com

**Details:** [LICENSE](./LICENSE) | [PL](./LICENSE-INFO.md) | [EN](./LICENSE-INFO-EN.md)hields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat&logo=node.js)](https://nodejs.org/)
[![Plesk](https://img.shields.io/badge/Plesk-Ready-orange?style=flat)](https://www.plesk.com/)
[![License](https://img.shields.io/badge/License-View%20Only-red?style=flat)](./LICENSE)

## 🔒 **PROJEKT KOMERCYJNY - TYLKO DO PRZEGLĄDANIA**
## 🔒 **COMMERCIAL PROJECT - VIEW ONLY**

⚠️ **Ten kod jest udostępniony wyłącznie w celach demonstracyjnych i edukacyjnych.**  
⚠️ **This code is shared exclusively for demonstration and educational purposes.**

❌ **Zabronione jest kopiowanie, modyfikowanie lub używanie komercyjne.**  
❌ **Copying, modifying, or commercial use is prohibited.**

📧 **Licencja komercyjna / Commercial license:** dariusz.w.golom@gmail.com  
📋 **[Szczegóły licencji / License details →](./LICENSE-INFO.md)** | **[English →](./LICENSE-INFO-EN.md)**

### 🌍 **Documentation Languages**
- 🇵🇱 **Polski:** [CONTRIBUTING.md](./CONTRIBUTING.md) | [LICENSE-INFO.md](./LICENSE-INFO.md)
- 🇬🇧 **English:** [CONTRIBUTING-EN.md](./CONTRIBUTING-EN.md) | [LICENSE-INFO-EN.md](./LICENSE-INFO-EN.md)

---

**📚 Dokumentacja:** [docs/](./docs/)  
**🐛 Issues:** [GitHub Issues](https://github.com/dar-gol/pigeon-map-landing/issues)

## 🌟 Funkcje

- 🌍 **Wielojęzyczność** - Polski i Angielski (next-intl)
- 📱 **Responsywny design** - Tailwind CSS
- ⚡ **Wysoka wydajność** - Next.js 15 z App Router
- 🚀 **Gotowy do wdrożenia** - Plesk z Node.js
- 🔒 **Bezpieczny** - SSL/HTTPS ready
- 📝 **Blog** - Markdown z gray-matter

## 🚀 Szybki start

### Lokalne uruchomienie

```bash
# Klonuj repozytorium
git clone https://github.com/dar-gol/pigeon-map-landing.git
cd pigeon-map-landing

# Instaluj zależności
npm install

# Uruchom dev server
npm run dev
```

Otwórz [http://localhost:3002](http://localhost:3002) w przeglądarce.

## 🎯 Interaktywny Build & Deploy

**🆕 NOWY SYSTEM BUILDU:**

```bash
# 🎯 Interaktywny build - pyta o opcje
npm run build

# 🚀 Interaktywny deploy - z buildem
npm run deploy:interactive

# ⚡ Szybkie opcje
npm run build:auto         # Auto build z wersją
npm run build:clean        # Czysty build bez wersji
```

**📋 Interaktywny build zapyta o:**
- 📈 Czy podnieść wersję? (patch/minor/major)
- 🔨 Typ buildu (standard/clean)

**📋 Interaktywny deploy zapyta o:**
- 🏗️ Czy uruchomić build?
- 🎯 Typ wdrożenia (nodejs/static)
- 📦 Zarządzanie releases

📚 **[Pełny przewodnik interaktywnego buildu →](./docs/guides/INTERACTIVE_BUILD_GUIDE.md)**

## 📁 Struktura projektu

```
├── src/                    # Kod źródłowy
│   ├── app/               # Next.js App Router
│   ├── components/        # Komponenty React
│   ├── i18n/             # Konfiguracja internacjonalizacji
│   └── lib/              # Utilities i helpers
├── scripts/               # 🆕 Skrypty automatyzacji
├── docs/                  # 📚 Dokumentacja
│   ├── guides/           # Przewodniki użytkownika
│   ├── deployment/       # Instrukcje wdrożenia
│   └── project/          # Dokumentacja projektu
├── messages/              # Pliki tłumaczeń (pl, en)
├── content/blog/         # Artykuły blog (Markdown)
├── public/               # Pliki statyczne
└── releases/             # Archiwa ZIP do wdrożenia
```

### Wdrożenie na Plesk

**🎯 SZYBKIE WDROŻENIE (5 minut):**

```bash
# 1. Przygotuj archiwum
./deploy-to-plesk.sh nodejs

# 2. Pobierz najnowsze archiwum
./manage-releases.sh latest

# 3. Wgraj ZIP do Plesk i skonfiguruj Node.js
```

📋 **[Szczegółowa instrukcja wdrożenia →](./docs/deployment/QUICK_DEPLOY.md)**

## 📁 Struktura projektu

```
├── src/                    # Kod źródłowy
│   ├── app/               # Next.js App Router
│   ├── components/        # Komponenty React
│   ├── i18n/             # Konfiguracja internacjonalizacji
│   └── lib/              # Utilities i helpers
├── messages/              # Pliki tłumaczeń (pl, en)
├── content/blog/         # Artykuły blog (Markdown)
├── public/               # Pliki statyczne
├── releases/             # Archiwa ZIP do wdrożenia
└── docs/                 # Dokumentacja
```

## ⚙️ Typy wdrożenia

### 🚀 **Node.js (Zalecane)** 
```bash
npm run deploy:nodejs
```
- ✅ **Pełna obsługa next-intl** (wielojęzyczność)
- ✅ Server-side rendering
- ✅ API routes działają
- ✅ Dynamiczne przełączanie `/pl` ↔ `/en`
- ⚠️ Wymaga Plesk z Node.js

### 🌐 **Static (Ograniczone)**
```bash
npm run deploy:static  
```
- ✅ Szybsze ładowanie
- ✅ Działa na każdym hostingu
- ❌ **Brak next-intl** (bez wielojęzyczności)
- ❌ Brak API routes

**💡 Tip:** Użyj `nodejs` dla pełnej funkcjonalności!

## 📚 Dokumentacja

| Plik | Opis | Dla kogo |
|------|------|----------|
| **[QUICK_DEPLOY.md](./docs/QUICK_DEPLOY.md)** | ⚡ Szybkie wdrożenie (1 strona) | Użytkownicy |
| **[READY_TO_DEPLOY.md](./docs/READY_TO_DEPLOY.md)** | 📋 Kompletna instrukcja | Deweloperzy |
| **[PROJECT_COMPLETE.md](./docs/PROJECT_COMPLETE.md)** | 🎉 Podsumowanie projektu | Wszyscy |
| **[PLESK_DEPLOYMENT_GUIDE.md](./docs/PLESK_DEPLOYMENT_GUIDE.md)** | 🔧 Szczegółowy przewodnik | Administratorzy |

## 🛠️ Narzędzia wdrożenia

- **`deploy-to-plesk.sh`** - Główny skrypt wdrożenia
- **`manage-releases.sh`** - Zarządzanie archiwami ZIP
- **`releases/`** - Folder z gotowymi archiwami

## 🌍 Obsługiwane języki

- 🇵🇱 **Polski** - `/pl/`
- 🇬🇧 **Angielski** - `/en/`

Łatwe dodawanie nowych języków przez next-intl.

## 🔧 Wymagania

- **Node.js** 18.0 lub nowszy
- **npm** lub **yarn**
- **Plesk** z obsługą Node.js (do wdrożenia)

## 📦 Skrypty npm

### 🔧 **Podstawowe skrypty**
```bash
npm run dev          # Development server (Next.js Turbopack, port 3002)
npm run build        # Build aplikacji dla produkcji
npm run start        # Uruchom production server lokalnie
npm run lint         # Sprawdź kod z ESLint
```

### 🚀 **Skrypty wdrożenia**
```bash
npm run deploy             # Główny deploy (Node.js) - ZALECANE ⭐
npm run deploy:nodejs      # Wdrożenie jako aplikacja Node.js
npm run deploy:static      # Wdrożenie jako statyczne pliki HTML
npm run package            # Alias dla deploy (tworzy archiwum ZIP)
```

### 📦 **Zarządzanie archiwami**
```bash
npm run releases           # Lista wszystkich archiwów ZIP
npm run releases:latest    # Pokaż najnowsze archiwum
npm run releases:clean     # Usuń stare archiwa (zostaw 3 najnowsze)
```

### 🎯 **Które skrypty wybrać?**

**Dla Twojego projektu z next-intl:**
```bash
# ✅ ZALECANE - zachowuje wielojęzyczność
npm run deploy

# ❌ NIE UŻYWAJ - brak obsługi next-intl
npm run deploy:static
```

### 🛠️ **Dodatkowe narzędzia**
```bash
# Bezpośrednie wywołanie skryptów
./deploy-to-plesk.sh nodejs     # Główny skrypt wdrożenia
./manage-releases.sh list       # Zarządzanie archiwami
./manage-releases.sh latest     # Najnowsze archiwum
./manage-releases.sh clean      # Czyszczenie starych plików
```

## 🌐 Przykładowe adresy

Po wdrożeniu aplikacja będzie dostępna pod adresami:

- **Strona główna:** `https://pigeon-map.digging.pl`
- **Wersja polska:** `https://pigeon-map.digging.pl/pl`
- **Wersja angielska:** `https://pigeon-map.digging.pl/en`
- **Blog:** `https://pigeon-map.digging.pl/pl/blog`
- **Kontakt:** `https://pigeon-map.digging.pl/pl/contact`

## ⚙️ Konfiguracja produkcyjna

### Zmienne środowiskowe (Plesk)
```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### Optymalizacje wydajności
- **Next.js 15** - najnowsze funkcje i optymalizacje
- **Standalone build** - wszystkie zależności w jednym miejscu
- **Static assets caching** - automatyczne przez Next.js
- **Image optimization** - Next.js Image component
- **Bundle optimization** - automatyczna przez Webpack

### Monitoring i logi
W panelu Plesk dostępne są:
- **Logi aplikacji** → Logs → Node.js Application Logs
- **Metryki wydajności** → Statistics
- **Status aplikacji** → Node.js → Application Status

## 🤝 Współpraca

Zapraszamy do współpracy! Zobacz [CONTRIBUTING.md](./CONTRIBUTING.md) dla szczegółów.

### Jak pomóc:
- 🐛 **Zgłoś błąd** - [Utwórz Issue](https://github.com/dar-gol/pigeon-map-landing/issues)
- 💡 **Zaproponuj funkcję** - [Discussions](https://github.com/dar-gol/pigeon-map-landing/discussions)
- 🔧 **Napisz kod** - [Pull Request](https://github.com/dar-gol/pigeon-map-landing/pulls)
- 📝 **Popraw dokumentację** - Edytuj pliki w `docs/`

## 📄 Licencja

Ten projekt jest licencjonowany na licencji MIT - zobacz plik [LICENSE](./LICENSE) dla szczegółów.

## 🏆 Autorzy

- **Dariusz Golomski** - *Główny deweloper* - [GitHub](https://github.com/dar-gol)

## 🙏 Podziękowania

- [Next.js](https://nextjs.org/) - Framework React
- [next-intl](https://next-intl-docs.vercel.app/) - Internacjonalizacja
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Ikony
- Społeczność Next.js za wsparcie

## 📄 Licencja

🔒 **Ten projekt jest aplikacją komercyjną** z restrykcyjną licencją:

- ✅ **Dozwolone:** Przeglądanie, nauka, analiza kodu
- ❌ **Zabronione:** Kopiowanie, modyfikacja, użycie komercyjne
- 📧 **Licencja komercyjna:** dariusz.w.golom@gmail.com

Zobacz szczegóły w [LICENSE](./LICENSE) i [LICENSE-INFO.md](./LICENSE-INFO.md).

## 🏆 Autorzy

- **Dariusz Golomski** - *Full-Stack Developer* - [LinkedIn](https://pl.linkedin.com/in/dariusz-golomski-462544226)

## 🙏 Podziękowania

- [Next.js](https://nextjs.org/) - Framework React
- [next-intl](https://next-intl-docs.vercel.app/) - Internacjonalizacja
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Ikony
- Społeczność Next.js za wsparcie

## 📞 Kontakt

- **Email:** dariusz.w.golom@gmail.com
- **LinkedIn:** [Dariusz Golomski](https://pl.linkedin.com/in/dariusz-golomski-462544226)

---

<div align="center">

**⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę! ⭐**

**🔒 Kod tylko do przeglądania - Projekt komercyjny**

![Pigeon Map](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge)

</div>

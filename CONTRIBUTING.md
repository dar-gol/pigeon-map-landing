# Contributing to Pigeon Map Landing

🌍 **[English version →](./CONTRIBUTING-EN.md)**

## 🔒 **WAŻNE: OGRANICZENIA LICENCJI**

⚠️ **Ten projekt jest chroniony licencją komercyjną!**  

**UWAGA:** Wszelkie kontrybucje (pull requesty, issues, sugestie) mogą być wykorzystane przez właściciela projektu bez ograniczeń. Przesyłając kod, zgadzasz się na przeniesienie praw autorskich na właściciela.

**Jeśli chcesz współpracować komercyjnie, skontaktuj się:** dariusz.w.golom@gmail.com

---

Dziękujemy za zainteresowanie współpracą! 🎉

## 🚀 Szybki start dla współtwórców

1. **Fork** repozytorium
2. **Clone** swojego forka:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pigeon-map-landing.git
   ```
3. **Utwórz branch** dla swojej funkcji:
   ```bash
   git checkout -b feature/nazwa-funkcji
   ```
4. **Zainstaluj zależności**:
   ```bash
   npm install
   ```
5. **Uruchom lokalnie**:
   ```bash
   npm run dev
   ```

## 🛠️ Rozwój

### Struktura projektu
- `src/app/` - Next.js App Router
- `src/components/` - Komponenty React
- `src/i18n/` - Internacjonalizacja
- `messages/` - Tłumaczenia (pl, en)
- `content/blog/` - Artykuły blog

### Standardy kodu
- **TypeScript** - wszystkie pliki .ts/.tsx
- **ESLint** - `npm run lint`
- **Prettier** - formatowanie automatyczne

### Testy
```bash
npm run build    # Test budowania
npm run lint     # Test składni
```

## 🌍 Dodawanie języków

1. Dodaj plik `messages/LANG.json`
2. Zaktualizuj `src/i18n/routing.ts`
3. Dodaj tłumaczenia w komponenetach

## 📝 Pull Requests

1. **Opisz zmiany** - co i dlaczego
2. **Dodaj screenshoty** - jeśli dotyczy UI
3. **Testuj lokalnie** - `npm run build`
4. **Sprawdź linty** - `npm run lint`

## 🐛 Zgłaszanie błędów

Użyj szablonu Issue na GitHub z:
- Opisem problemu
- Krokami do reprodukcji
- Oczekiwanym zachowaniem
- Screenshotami (jeśli dotyczy)

## ❓ Pytania

Masz pytania? Utwórz Discussion na GitHub!

---

**Dziękujemy za współpracę! 🙏**

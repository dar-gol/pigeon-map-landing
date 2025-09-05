# 🎉 SYSTEM INTERAKTYWNEGO BUILDU - PRZEWODNIK KOMPLETNY

## 🚀 **GŁÓWNA NOWOŚĆ:**

```bash
npm run build
```

**Ten polecenie jest teraz INTERAKTYWNE!** 🎯

## 📋 **Jak to działa:**

### 1. **Uruchom build:**
```bash
npm run build
```

### 2. **System zapyta:**
```
❓ Do you want to increment version before build? (y/N):
```
- `y` = tak, chcę podnieść wersję
- `N` = nie, tylko build bez zmiany wersji

### 3. **Jeśli wybrałeś 'y', zapyta o typ wersji:**
```
📈 Version increment options:
  1. patch  - Bug fixes (1.2.3 → 1.2.4)
  2. minor  - New features (1.2.3 → 1.3.0)  
  3. major  - Breaking changes (1.2.3 → 2.0.0)

❓ Select version type (1=patch, 2=minor, 3=major) [1]:
```

### 4. **Następnie zapyta o typ buildu:**
```
🔨 Build options:
  1. Standard build (with version injection)
  2. Clean build (without version injection)

❓ Select build type (1=standard, 2=clean) [1]:
```

### 5. **System zrobi wszystko automatycznie!** ✨

## 🎯 **SCENARIUSZE UŻYCIA:**

### 🔧 **Rozwój lokalny** (często)
```bash
npm run build:clean    # Szybki build bez wersji
```

### 🆕 **Nowy feature gotowy** 
```bash
npm run build          # Interaktywny - zapyta o opcje
# Wybierz: y → 1 (patch) → 1 (standard)
```

### 🚀 **Release production**
```bash
npm run version:deploy # Wszystko automatycznie (patch + build + deploy)
# lub
npm run build          # Interaktywny
# Wybierz: y → 2 (minor) → 1 (standard), potem npm run deploy
```

### 🤖 **CI/CD pipeline**
```bash
npm run build:auto     # Deterministyczny build
```

## 🔍 **WSZYSTKIE DOSTĘPNE KOMENDY:**

| Komenda | Opis | Kiedy użyć |
|---------|------|------------|
| `npm run build` | **🎯 INTERAKTYWNY** | Główna komenda - pyta o opcje |
| `npm run build:auto` | Auto build z wersją | Szybki build bez pytań |
| `npm run build:clean` | Czysty build | Rozwój lokalny |
| `npm run build:demo` | Pokaż opcje | Info o komendach |
| `npm run version:build` | Version + Build | One-command (stary sposób) |
| `npm run version:deploy` | Version + Build + Deploy | Full workflow |
| `npm run version:status` | Status wersji | Sprawdzenie synchronizacji |

## 💡 **WSKAZÓWKI:**

### ⚡ **Szybki start:**
```bash
# 1. Rozwój
npm run dev

# 2. Gotowy? 
npm run build           # Zapyta o opcje

# 3. Deploy
npm run deploy
```

### 🆘 **Pomoc:**
```bash
node interactive-build.js --help    # Pełna pomoc
npm run build:demo                  # Demo opcji
npm run version:status              # Status systemu
```

### 🛑 **Przerwanie:**
- **Ctrl+C** w dowolnym momencie aby anulować

### 🔄 **Backward Compatibility:**
- **Wszystkie stare komendy nadal działają!**
- `npm run version:build` - bez zmian
- `npm run version:deploy` - bez zmian

## 🎉 **ZALETY NOWEGO SYSTEMU:**

- ✅ **Elastyczny** - pytania o opcje
- ✅ **Bezpieczny** - można anulować
- ✅ **Intuicyjny** - kolorowy interface  
- ✅ **Kompletny** - obsługuje wszystkie scenariusze
- ✅ **Kompatybilny** - stare komendy działają
- ✅ **Dokumentowany** - help system

## 🚀 **PRZYKŁAD SESJI:**

```bash
$ npm run build

🚀 Interactive Build Process
==============================
📦 Current version: 0.2.2

❓ Do you want to increment version before build? (y/N): y

📈 Version increment options:
  1. patch  - Bug fixes (1.2.3 → 1.2.4)
  2. minor  - New features (1.2.3 → 1.3.0)
  3. major  - Breaking changes (1.2.3 → 2.0.0)

❓ Select version type (1=patch, 2=minor, 3=major) [1]: 1

🔄 Incrementing patch version...
📦 Package version: 0.2.2 → 0.2.3
🔧 Updated dashboard-pwa.js version to 0.2.3
⚙️  Updated next.config.js cache names with version 0.2.3
🏷️  Created git tag: v0.2.3

✅ Version updated: 0.2.2 → 0.2.3

🔨 Build options:
  1. Standard build (with version injection)
  2. Clean build (without version injection)

❓ Select build type (1=standard, 2=clean) [1]: 1

🏗️  Starting standard build...
=====================================
[Next.js build output...]

✅ Build completed successfully!
🎉 Final version: 0.2.3

📋 Next steps:
• Test the application: npm start
• Deploy: npm run deploy  
• Push changes: git push origin --tags
```

## 🔧 **PLIKI SYSTEMU:**

- `interactive-build.js` - główny skrypt
- `version-manager.js` - zarządzanie wersjami (bez zmian)
- `package.json` - zaktualizowane skrypty
- `INTERACTIVE_BUILD_README.md` - dokumentacja
- `demo-interactive-build.sh` - demo script

---

🎯 **GŁÓWNY TAKE-AWAY:** 
Teraz `npm run build` to potężne, interaktywne narzędzie, które prowadzi Cię przez cały proces buildu z opcjonalnym zarządzaniem wersją! 🚀

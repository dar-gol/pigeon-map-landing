# 🚀 Interactive Build System

## 📖 Overview

Nowy system interaktywnego buildu pozwala na elastyczne zarządzanie procesem budowania aplikacji z opcjonalnym incrementem wersji.

## 🎯 Main Command

```bash
npm run build
```

Ten polecenie uruchomi **interaktywny tryb**, który zapyta:

1. **Czy chcesz podnieść wersję?** (y/N)
   - Jeśli `y` - zapyta o typ wersji (patch/minor/major)
   - Jeśli `N` - przejdzie do budowania bez zmiany wersji

2. **Typ buildu:**
   - Standard build (z injektowaniem wersji)
   - Clean build (bez injektowania wersji)

## 🔧 Available Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run build` | **Interaktywny build** | Główne polecenie - pyta o opcje |
| `npm run build:auto` | Auto build z wersją | Szybki build bez pytań |
| `npm run build:clean` | Czysty build | Build bez injektowania wersji |
| `npm run build:demo` | Pokaż dostępne opcje | Info o dostępnych komendach |

## 📋 Interactive Flow

```
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

## 🎯 Quick Options

### Bez pytań - automatyczne komendy:

```bash
# Szybkie buildy bez interakcji
npm run build:auto         # Auto build z wersją
npm run build:clean        # Clean build

# One-command solutions (stare, sprawdzone)
npm run version:build      # Version + Build
npm run version:deploy     # Version + Build + Deploy
```

## 🔍 Help & Demo

```bash
# Pokaż pomoc
node interactive-build.js --help

# Pokaż dostępne opcje
npm run build:demo
```

## 💡 Use Cases

### 1. **Rozwój lokalny** - częste buildy
```bash
npm run build:clean        # Szybki build bez wersji
```

### 2. **Gotowy feature** - chcę podnieść wersję
```bash
npm run build              # Interaktywny - zapyta o wersję
```

### 3. **Release** - pełny workflow
```bash
npm run version:deploy     # Wszystko automatycznie
```

### 4. **CI/CD** - automatyczny build
```bash
npm run build:auto         # Deterministyczny build
```

## ✨ Features

- ✅ **Interaktywny** - pyta o opcje
- ✅ **Elastyczny** - różne tryby buildu
- ✅ **Bezpieczny** - można anulować (Ctrl+C)
- ✅ **Kolorowy output** - łatwy do czytania
- ✅ **Backward compatible** - stare komendy działają
- ✅ **Help system** - `--help` flag

## 🔄 Migration

Stare komendy **nadal działają**:
- `npm run version:build` - unchanged
- `npm run version:deploy` - unchanged

Nowe główne polecenie:
- `npm run build` - **teraz interaktywne**
- `npm run build:auto` - stary `npm run build`

## 🛠️ Technical Details

**Files:**
- `interactive-build.js` - główny skrypt interaktywny
- `version-manager.js` - zarządzanie wersjami (unchanged)
- `package.json` - zaktualizowane skrypty

**Dependencies:**
- `readline` - interakcje z użytkownikiem
- `child_process` - wykonywanie komend
- `fs` - operacje na plikach

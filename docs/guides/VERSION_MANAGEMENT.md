# 🔄 Automatic Version Management

System automatycznego zarządzania wersjami dla Pigeon Map Landing z integracją PWA.

## 🚀 Quick Start

```bash
# Increment patch version (1.2.3 → 1.2.4)
npm run version

# Increment minor version (1.2.3 → 1.3.0)
npm run version:minor

# Increment major version (1.2.3 → 2.0.0)
npm run version:major

# Build with version injection
npm run build
```

## 🎯 Co robi automatycznie:

### 1. **Aktualizuje package.json**
```json
{
  "version": "1.2.4" // ← Automatycznie inkrementuje
}
```

### 2. **Wstrzykuje wersję do dashboard-pwa.js**
```javascript
const SW_VERSION = "1.2.4"; // ← Auto-updated by version-manager.js
```

### 3. **Aktualizuje cache names w next.config.js**
```javascript
runtimeCaching: [
  {
    options: {
      cacheName: "dashboard-pages-v1.2.4", // ← Automatyczne wersjonowanie
    }
  }
]
```

### 4. **Tworzy Git tagi**
```bash
git tag -a v1.2.4 -m "Release version 1.2.4"
```

## 📋 Dostępne komendy

| Komenda | Opis | Przykład |
|---------|------|----------|
| `npm run version` | Patch increment | 1.2.3 → 1.2.4 |
| `npm run version:minor` | Minor increment | 1.2.3 → 1.3.0 |
| `npm run version:major` | Major increment | 1.2.3 → 2.0.0 |
| `npm run version:inject` | Tylko inject (bez increment) | - |
| `npm run build` | Build z version injection | - |

## 🛠️ Manual Usage

```bash
# Bezpośrednie użycie skryptu
node version-manager.js patch
node version-manager.js minor
node version-manager.js major

# Pomoc
node version-manager.js --help
```

## 📁 Pliki modyfikowane

- **package.json** - główna wersja aplikacji
- **public/dashboard-pwa.js** - wersja Service Workera  
- **next.config.js** - nazwy cache'ów z wersją

## 🔄 Workflow Development

```bash
# 1. Rozwój funkcji
npm run dev

# 2. Gotowe do wersjonowania
npm run version        # patch increment

# 3. Build z nową wersją
npm run build

# 4. Test PWA
npm start

# 5. Deploy
npm run deploy

# 6. Push z tagami
git push origin --tags
```

## 🎯 Semantic Versioning

- **MAJOR** (1.0.0 → 2.0.0) - Breaking changes
- **MINOR** (1.0.0 → 1.1.0) - New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1) - Bug fixes, backwards compatible

## 🔍 Monitoring

### Check current version:
```bash
# Package version
cat package.json | grep version

# PWA version
grep "SW_VERSION" public/dashboard-pwa.js

# Cache versions
grep "cacheName" next.config.js
```

### Git tags:
```bash
# List recent tags
git tag --sort=-version:refname | head -5

# Show tag details
git show v1.2.4
```

## 🚨 Troubleshooting

### Version nie został wstrzyknięty:
```bash
# Manual injection
npm run version:inject
```

### Cache nie został wyczyścony:
```bash
# Force cache clear w PWA
# Browser DevTools > Application > Storage > Clear Storage
```

### Git tag konflikt:
```bash
# Delete local tag
git tag -d v1.2.4

# Run version again
npm run version
```

## 🎉 Benefits

- ✅ **Automatic version sync** across all files
- ✅ **No manual version updates** needed
- ✅ **Git tagging** for releases  
- ✅ **Cache invalidation** via versioned names
- ✅ **One command** updates everything
- ✅ **Semantic versioning** support
- ✅ **Development workflow** integration

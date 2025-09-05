# 🚀 Version Management - Quick Commands

## 🎯 **INTERACTIVE BUILD (NEW!):**

```bash
# 🚀 Interactive Build (asks questions)
npm run build                 # Interactive mode - asks about version & build type

# 🚀 Quick non-interactive builds
npm run build:auto            # Auto build with version injection
npm run build:clean           # Clean build without version injection
```

## 🎯 **ONE-COMMAND Solutions:**

```bash
# 🚀 Version + Build (RECOMMENDED)
npm run version:build         # 0.2.1 → 0.2.2 + build

# 🚀 Version + Build + Deploy (FULL WORKFLOW)  
npm run version:deploy        # 0.2.1 → 0.2.2 + build + deploy

# 🚀 Different version types
npm run version:build:minor   # 0.2.1 → 0.3.0 + build
npm run version:build:major   # 0.2.1 → 1.0.0 + build
```

## 📋 **All Available Commands:**

| Command | What it does |
|---------|--------------|
| `npm run build` | **Interactive Build** ⭐⭐⭐ |
| `npm run build:auto` | Auto build with version injection |
| `npm run build:clean` | Clean build without version injection |
| `npm run version:build` | **Version + Build** ⭐ |
| `npm run version:deploy` | **Version + Build + Deploy** ⭐⭐ |
| `npm run version:build:minor` | Minor version + Build |
| `npm run version:build:major` | Major version + Build |
| `npm run version:deploy:minor` | Minor + Build + Deploy |
| `npm run version:deploy:major` | Major + Build + Deploy |
| `npm run version:status` | Check version sync |
| `npm run version:watch` | Live monitoring |

## 🎯 **Daily Workflow:**

```bash
# 1. Development
npm run dev

# 2. Ready for release? INTERACTIVE:
npm run build                 # Will ask about version & build options

# 3. Or use one-command:
npm run version:deploy

# 4. Done! 🎉
```

## 🔍 **Check Status:**

```bash
npm run version:status
```

## 🎉 **Benefits:**

- ✅ **One command** does everything
- ✅ **No manual steps** needed  
- ✅ **Automatic synchronization**
- ✅ **Professional workflow**

---
**Created:** August 2025 | **Status:** Production Ready 🚀

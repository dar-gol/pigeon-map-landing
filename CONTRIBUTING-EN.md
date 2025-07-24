# Contributing to Pigeon Map Landing

🇵🇱 **[Polish version →](./CONTRIBUTING.md)**

## 🔒 **IMPORTANT: LICENSE RESTRICTIONS**

⚠️ **This project is protected by commercial license!**  

**WARNING:** All contributions (pull requests, issues, suggestions) may be used by the project owner without restrictions. By submitting code, you agree to transfer copyright to the owner.

**For commercial collaboration, contact:** dariusz.w.golom@gmail.com

---

Thank you for your interest in contributing! 🎉

## 🚀 Quick start for contributors

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pigeon-map-landing.git
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Run locally**:
   ```bash
   npm run dev
   ```

## 🛠️ Development

### Project structure
- `src/app/` - Next.js App Router
- `src/components/` - React Components
- `src/i18n/` - Internationalization
- `messages/` - Translations (pl, en)
- `content/blog/` - Blog articles

### Code standards
- **TypeScript** - all files .ts/.tsx
- **ESLint** - `npm run lint`
- **Prettier** - automatic formatting

### Testing
```bash
npm run build    # Build test
npm run lint     # Syntax test
```

## 🌍 Adding languages

1. Add file `messages/LANG.json`
2. Update `src/i18n/routing.ts`
3. Add translations in components

## 📝 Pull Requests

1. **Describe changes** - what and why
2. **Add screenshots** - if UI related
3. **Test locally** - `npm run build`
4. **Check lints** - `npm run lint`

## 🐛 Bug reports

Use GitHub Issue template with:
- Problem description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## ❓ Questions

Have questions? Create a Discussion on GitHub!

---

**Thank you for contributing! 🙏**

#!/bin/bash

# Skrypt automatycznego wdrożenia na Plesk
# Użycie: ./deploy-to-plesk.sh [static|nodejs]

DEPLOYMENT_TYPE=${1:-static}
BUILD_DIR="out"
STANDALONE_DIR=".next/standalone"
DIST_DIR="dist"

echo "🚀 Rozpoczynam wdrożenie aplikacji Pigeon Map Landing..."
echo "📦 Typ wdrożenia: $DEPLOYMENT_TYPE"

# Sprawdź czy Node.js i npm są zainstalowane
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie jest zainstalowany"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm nie jest zainstalowany"
    exit 1
fi

# Instaluj zależności
echo "📦 Instaluję zależności..."
npm install

# Sprawdź typ wdrożenia i skonfiguruj
if [ "$DEPLOYMENT_TYPE" = "static" ]; then
    echo "🔧 Konfiguruję dla wdrożenia statycznego..."
    
    # Zmień konfigurację na export
    echo "📝 Zmieniam konfigurację Next.js na export..."
    
    # Backup oryginalnej konfiguracji
    cp next.config.ts next.config.ts.backup
    
    # Zmień konfigurację
    cat > next.config.ts << 'EOF'
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
EOF
    
    # Buduj aplikację
    echo "🏗️ Buduję aplikację statyczną..."
    npm run build
    
    # Sprawdź czy build się powiódł
    if [ ! -d "$BUILD_DIR" ]; then
        echo "❌ Build się nie powiódł - brak folderu $BUILD_DIR"
        echo "🔄 Przywracam konfigurację..."
        cp next.config.ts.backup next.config.ts
        rm next.config.ts.backup
        exit 1
    fi
    
    # Przygotuj folder dist
    echo "📁 Przygotowuję pliki do wdrożenia..."
    rm -rf $DIST_DIR
    mkdir -p $DIST_DIR
    
    # Kopiuj pliki statyczne
    cp -r $BUILD_DIR/* $DIST_DIR/
    
    # Przywróć konfigurację
    echo "🔄 Przywracam oryginalną konfigurację..."
    cp next.config.ts.backup next.config.ts
    rm next.config.ts.backup
    
    echo "✅ Aplikacja gotowa do wdrożenia!"
    echo "📂 Pliki do wgrania na serwer znajdują się w folderze: $DIST_DIR"
    echo ""
    echo "📋 Następne kroki:"
    echo "1. Zaloguj się do panelu Plesk"
    echo "2. Przejdź do File Manager twojej domeny"
    echo "3. Usuń wszystkie pliki z folderu httpdocs/"
    echo "4. Wgraj wszystkie pliki z folderu $DIST_DIR/ (lub użyj archiwum ZIP)"
    echo "5. Skonfiguruj SSL i sprawdź czy strona działa"
    
elif [ "$DEPLOYMENT_TYPE" = "nodejs" ]; then
    echo "🔧 Konfiguruję dla wdrożenia Node.js..."
    
    # Buduj aplikację w trybie standalone
    echo "🏗️ Buduję aplikację Node.js w trybie standalone..."
    npm run build
    
    # Sprawdź czy build się powiódł
    if [ ! -d "$STANDALONE_DIR" ]; then
        echo "❌ Build się nie powiódł - brak folderu $STANDALONE_DIR"
        exit 1
    fi
    
    # Przygotuj folder dist
    echo "📁 Przygotowuję pliki do wdrożenia..."
    rm -rf $DIST_DIR
    mkdir -p $DIST_DIR
    
    # Kopiuj zawartość standalone
    cp -r $STANDALONE_DIR/* $DIST_DIR/
    
    # Kopiuj folder public do właściwego miejsca
    if [ -d "public" ]; then
        echo "📂 Kopiuję pliki publiczne..."
        cp -r public $DIST_DIR/
    fi
    
    # Kopiuj pliki statyczne Next.js
    if [ -d ".next/static" ]; then
        echo "📦 Kopiuję pliki statyczne Next.js..."
        mkdir -p $DIST_DIR/.next
        cp -r .next/static $DIST_DIR/.next/
    fi
    
    # Kopiuj brakujące pliki z standalone/.next
    if [ -d "$STANDALONE_DIR/.next" ]; then
        echo "📦 Kopiuję pliki buildu Next.js..."
        cp -r $STANDALONE_DIR/.next/* $DIST_DIR/.next/
    fi
    
    echo "✅ Aplikacja gotowa do wdrożenia!"
    echo "📂 Pliki do wgrania na serwer znajdują się w folderze: $DIST_DIR"
    echo ""
    echo "📋 Następne kroki:"
    echo "1. Wgraj wszystkie pliki z folderu $DIST_DIR/ na serwer Plesk"
    echo "2. Skonfiguruj Node.js w panelu Plesk:"
    echo "   - Document Root: httpdocs/"
    echo "   - Application Root: httpdocs/"
    echo "   - Application Startup File: server.js"
    echo "   - Node.js Version: 18.x lub nowsza"
    echo "3. Ustaw zmienne środowiskowe:"
    echo "   - NODE_ENV=production"
    echo "   - PORT=3000"
    echo "4. Restart aplikacji w panelu Plesk"
    echo "5. Skonfiguruj proxy w Apache/nginx (jeśli potrzebne)"
    
else
    echo "❌ Nieznany typ wdrożenia: $DEPLOYMENT_TYPE"
    echo "Dostępne opcje: static, nodejs"
    exit 1
fi

# Pokaż rozmiar plików
echo ""
echo "📊 Rozmiar plików do wdrożenia:"
du -sh $DIST_DIR

# Utwórz folder releases jeśli nie istnieje
mkdir -p releases

# Utwórz archiwum ZIP
echo ""
echo "📦 Tworzę archiwum ZIP dla szybkiego wgrywania..."
ZIP_NAME="pigeon-map-landing-$(date +%Y%m%d-%H%M%S).zip"
ZIP_PATH="releases/$ZIP_NAME"

if command -v zip &> /dev/null; then
    cd $DIST_DIR
    zip -r "../$ZIP_PATH" . -q
    cd ..
    
    echo "✅ Archiwum ZIP utworzone: $ZIP_PATH"
    echo "📊 Rozmiar archiwum: $(du -sh "$ZIP_PATH" | cut -f1)"
    echo ""
    echo "🎯 SZYBKIE WGRYWANIE:"
    echo "1. Pobierz plik: $ZIP_PATH"
    echo "2. W panelu Plesk → File Manager"
    echo "3. Usuń zawartość httpdocs/"
    echo "4. Wgraj i rozpakuj $ZIP_NAME w httpdocs/"
    echo "5. Skonfiguruj Node.js (patrz dokumentacja)"
else
    echo "⚠️ Polecenie 'zip' nie jest dostępne - pomiń tworzenie archiwum"
    echo "💡 Możesz ręcznie spakować folder $DIST_DIR/ do releases/"
fi

echo ""
echo "📁 Archiwum zapisane w folderze: releases/"
echo "🗂️ Zarządzanie archiwami: ./manage-releases.sh [list|latest|clean]"
echo "🎉 Gotowe! Powodzenia z wdrożeniem!"

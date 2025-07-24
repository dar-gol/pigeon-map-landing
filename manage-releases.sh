#!/bin/bash

# Skrypt zarządzania archiwami releases
# Użycie: ./manage-releases.sh [list|clean|latest|help]

RELEASES_DIR="releases"

show_help() {
    echo "🗂️ Zarządzanie archiwami releases"
    echo ""
    echo "Użycie: ./manage-releases.sh [command]"
    echo ""
    echo "Dostępne komendy:"
    echo "  list     - Pokaż wszystkie archiwa"
    echo "  latest   - Pokaż najnowsze archiwum"
    echo "  clean    - Usuń stare archiwa (zostaw tylko 3 najnowsze)"
    echo "  help     - Pokaż tę pomoc"
    echo ""
}

list_releases() {
    echo "📦 Dostępne archiwa releases:"
    echo ""
    if [ -d "$RELEASES_DIR" ] && [ "$(ls -A $RELEASES_DIR/*.zip 2>/dev/null)" ]; then
        cd "$RELEASES_DIR"
        ls -lht *.zip 2>/dev/null | while read -r line; do
            size=$(echo "$line" | awk '{print $5}')
            date=$(echo "$line" | awk '{print $6, $7, $8}')
            file=$(echo "$line" | awk '{print $9}')
            echo "  📁 $file ($size) - $date"
        done
        cd ..
        echo ""
        echo "📊 Łączny rozmiar: $(du -sh $RELEASES_DIR | cut -f1)"
    else
        echo "  Brak archiwów w folderze $RELEASES_DIR/"
    fi
    echo ""
}

show_latest() {
    echo "🔍 Najnowsze archiwum:"
    echo ""
    if [ -d "$RELEASES_DIR" ] && [ "$(ls -A $RELEASES_DIR/*.zip 2>/dev/null)" ]; then
        latest_file=$(ls -t $RELEASES_DIR/*.zip 2>/dev/null | head -1)
        if [ -f "$latest_file" ]; then
            size=$(du -sh "$latest_file" | cut -f1)
            date=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$latest_file")
            echo "  📁 $(basename "$latest_file")"
            echo "  📊 Rozmiar: $size"
            echo "  📅 Data: $date"
            echo ""
            echo "🚀 Gotowe do wgrania na Plesk!"
        fi
    else
        echo "  Brak archiwów w folderze $RELEASES_DIR/"
    fi
    echo ""
}

clean_old_releases() {
    echo "🧹 Czyszczenie starych archiwów..."
    echo ""
    
    if [ ! -d "$RELEASES_DIR" ]; then
        echo "  Folder $RELEASES_DIR nie istnieje"
        return
    fi
    
    # Policz archiwa
    count=$(ls -1 $RELEASES_DIR/*.zip 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$count" -eq 0 ]; then
        echo "  Brak archiwów do wyczyszczenia"
        return
    fi
    
    echo "  Znaleziono $count archiwów"
    
    if [ "$count" -le 3 ]; then
        echo "  ✅ Masz tylko $count archiwów - nie ma co czyścić"
        echo "  💡 Pozostawiam wszystkie (maksymalnie 3 najnowsze)"
        return
    fi
    
    # Pokaż które zostaną usunięte
    echo "  🗑️ Archiwa do usunięcia (pozostawiam 3 najnowsze):"
    ls -t $RELEASES_DIR/*.zip | tail -n +4 | while read file; do
        size=$(du -sh "$file" | cut -f1)
        echo "    - $(basename "$file") ($size)"
    done
    
    echo ""
    read -p "  ❓ Czy chcesz kontynuować? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Usuń stare archiwa (zostaw 3 najnowsze)
        removed_count=0
        ls -t $RELEASES_DIR/*.zip | tail -n +4 | while read file; do
            rm "$file"
            echo "    ✅ Usunięto: $(basename "$file")"
            removed_count=$((removed_count + 1))
        done
        
        new_count=$(ls -1 $RELEASES_DIR/*.zip 2>/dev/null | wc -l | tr -d ' ')
        echo ""
        echo "  🎉 Wyczyszczono! Pozostało $new_count archiwów"
        
        # Pokaż nowy rozmiar
        echo "  📊 Nowy rozmiar folderu: $(du -sh $RELEASES_DIR | cut -f1)"
    else
        echo "  ❌ Anulowano czyszczenie"
    fi
    echo ""
}

# Main logic
case "${1:-help}" in
    "list")
        list_releases
        ;;
    "latest")
        show_latest
        ;;
    "clean")
        clean_old_releases
        ;;
    "help"|*)
        show_help
        ;;
esac

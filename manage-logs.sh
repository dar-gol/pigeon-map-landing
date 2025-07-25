#!/bin/bash

# Log management utility with date support
# Usage: ./manage-logs.sh [command] [options]

LOG_DIR="./logs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

show_help() {
    echo "🔧 Log Management Utility"
    echo "========================"
    echo ""
    echo "Usage: ./manage-logs.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  list                     List all available log files"
    echo "  today                    Show today's logs"
    echo "  date YYYY-MM-DD          Show logs for specific date"
    echo "  clean [days]             Clean logs older than N days (default: 7)"
    echo "  size                     Show log file sizes"
    echo "  tail [file] [date]       Follow logs in real-time"
    echo ""
    echo "Examples:"
    echo "  ./manage-logs.sh list"
    echo "  ./manage-logs.sh today"
    echo "  ./manage-logs.sh date 2025-07-23"
    echo "  ./manage-logs.sh clean 14"
    echo "  ./manage-logs.sh tail blog.log"
    echo "  ./manage-logs.sh tail blog.log 2025-07-23"
}

list_logs() {
    echo -e "${BLUE}📁 Available log files:${NC}"
    echo "======================="
    
    if [ ! -d "$LOG_DIR" ]; then
        echo -e "${RED}❌ Logs directory does not exist${NC}"
        return 1
    fi
    
    ls -la "$LOG_DIR"/*.log 2>/dev/null | while read -r line; do
        filename=$(echo "$line" | awk '{print $9}')
        size=$(echo "$line" | awk '{print $5}')
        date=$(echo "$line" | awk '{print $6 " " $7 " " $8}')
        
        if [[ "$filename" =~ -([0-9]{4}-[0-9]{2}-[0-9]{2})\.log$ ]]; then
            log_date="${BASH_REMATCH[1]}"
            base_name=$(basename "$filename" "-${log_date}.log")
            echo -e "${GREEN}📄 ${base_name}${NC} (${log_date}) - ${size} bytes - ${date}"
        else
            base_name=$(basename "$filename" .log)
            echo -e "${YELLOW}📄 ${base_name}${NC} (no date) - ${size} bytes - ${date}"
        fi
    done
}

show_today() {
    TODAY=$(date +%Y-%m-%d)
    echo -e "${BLUE}📅 Today's logs (${TODAY}):${NC}"
    echo "=========================="
    
    ./view-logs.sh app.log 20 "$TODAY"
    echo ""
    echo -e "${BLUE}📝 Blog logs:${NC}"
    ./view-logs.sh blog.log 20 "$TODAY"
}

show_date() {
    local target_date="$1"
    if [ -z "$target_date" ]; then
        echo -e "${RED}❌ Please specify a date (YYYY-MM-DD)${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📅 Logs for ${target_date}:${NC}"
    echo "=========================="
    
    ./view-logs.sh app.log 20 "$target_date"
    echo ""
    echo -e "${BLUE}📝 Blog logs:${NC}"
    ./view-logs.sh blog.log 20 "$target_date"
}

clean_logs() {
    local days_to_keep="${1:-7}"
    echo -e "${YELLOW}🧹 Cleaning logs older than ${days_to_keep} days...${NC}"
    
    if [ ! -d "$LOG_DIR" ]; then
        echo -e "${RED}❌ Logs directory does not exist${NC}"
        return 1
    fi
    
    local cutoff_date=$(date -d "${days_to_keep} days ago" +%Y-%m-%d 2>/dev/null || date -v-${days_to_keep}d +%Y-%m-%d)
    local count=0
    
    for file in "$LOG_DIR"/*.log; do
        if [[ -f "$file" && "$file" =~ -([0-9]{4}-[0-9]{2}-[0-9]{2})\.log$ ]]; then
            file_date="${BASH_REMATCH[1]}"
            if [[ "$file_date" < "$cutoff_date" ]]; then
                echo -e "${RED}🗑️  Removing: $(basename "$file")${NC}"
                rm "$file"
                ((count++))
            fi
        fi
    done
    
    echo -e "${GREEN}✅ Cleaned ${count} old log files${NC}"
}

show_sizes() {
    echo -e "${BLUE}📊 Log file sizes:${NC}"
    echo "=================="
    
    if [ ! -d "$LOG_DIR" ]; then
        echo -e "${RED}❌ Logs directory does not exist${NC}"
        return 1
    fi
    
    du -h "$LOG_DIR"/*.log 2>/dev/null | sort -hr
    echo ""
    echo -e "${BLUE}📁 Total logs directory size:${NC}"
    du -sh "$LOG_DIR" 2>/dev/null
}

tail_logs() {
    local file="${1:-app.log}"
    local date="${2:-$(date +%Y-%m-%d)}"
    
    # Create dated filename
    local ext="${file##*.}"
    local base="${file%.*}"
    local dated_file="${base}-${date}.${ext}"
    local log_path="$LOG_DIR/$dated_file"
    
    # Check if dated file exists, fallback to non-dated
    if [ ! -f "$log_path" ]; then
        log_path="$LOG_DIR/$file"
        if [ ! -f "$log_path" ]; then
            echo -e "${RED}❌ Log file does not exist: $log_path${NC}"
            return 1
        fi
    fi
    
    echo -e "${BLUE}👁️  Following: $log_path${NC}"
    echo -e "${YELLOW}   Press Ctrl+C to stop${NC}"
    echo ""
    
    tail -f "$log_path"
}

# Main script logic
case "${1:-help}" in
    list)
        list_logs
        ;;
    today)
        show_today
        ;;
    date)
        show_date "$2"
        ;;
    clean)
        clean_logs "$2"
        ;;
    size)
        show_sizes
        ;;
    tail)
        tail_logs "$2" "$3"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

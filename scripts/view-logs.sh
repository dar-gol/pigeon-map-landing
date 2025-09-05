#!/bin/bash

# Log viewer utility for debugging blog issues
# Usage: ./view-logs.sh [log-file] [lines] [date]
# Examples:
#   ./view-logs.sh                    # Show today's app.log
#   ./view-logs.sh blog.log           # Show today's blog.log  
#   ./view-logs.sh blog.log 100       # Show last 100 lines of today's blog.log
#   ./view-logs.sh blog.log 50 2025-07-23  # Show specific date

LOG_DIR="./logs"
DEFAULT_FILE="app.log"
DEFAULT_LINES=50

# Get parameters
LOG_FILE=${1:-$DEFAULT_FILE}
LINES=${2:-$DEFAULT_LINES}
DATE=${3:-$(date +%Y-%m-%d)}

echo "🔍 Blog Log Viewer"
echo "=================="

# Check if logs directory exists
if [ ! -d "$LOG_DIR" ]; then
    echo "❌ Logs directory does not exist: $LOG_DIR"
    echo "💡 Run the application first to generate logs"
    exit 1
fi

# Create dated filename
EXT="${LOG_FILE##*.}"
BASE="${LOG_FILE%.*}"
DATED_FILE="${BASE}-${DATE}.${EXT}"

# Full path to log file
LOG_PATH="$LOG_DIR/$DATED_FILE"

# Check if dated log file exists
if [ ! -f "$LOG_PATH" ]; then
    # Try fallback to non-dated file
    FALLBACK_PATH="$LOG_DIR/$LOG_FILE"
    if [ ! -f "$FALLBACK_PATH" ]; then
        echo "❌ Log file does not exist: $LOG_PATH"
        echo "❌ Fallback file does not exist: $FALLBACK_PATH"
        echo ""
        echo "📁 Available log files:"
        ls -la "$LOG_DIR"/*.log 2>/dev/null | grep -E '\.(log)$' || echo "   No log files found"
        exit 1
    else
        LOG_PATH="$FALLBACK_PATH"
        echo "⚠️  Using fallback file: $LOG_PATH"
    fi
fi

echo "📂 Log file: $LOG_PATH"
echo "📅 Date: $DATE"
echo "📊 Showing last $LINES lines"
echo "=================="
echo ""

# Show the logs
tail -n "$LINES" "$LOG_PATH"

echo ""
echo "=================="
echo "✅ Done. Use 'tail -f $LOG_PATH' to follow logs in real-time"
echo "💡 Available commands:"
echo "   ./view-logs.sh blog.log 100        # More lines"
echo "   ./view-logs.sh blog.log 50 2025-07-23  # Specific date"
echo "   ls logs/                           # List all log files"

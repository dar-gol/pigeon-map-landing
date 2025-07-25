# Blog Debugging Guide

## Overview

The Pigeon Map Landing application now includes a comprehensive logging system specifically designed to help debug blog-related issues. This guide explains how to use the logging system to troubleshoot problems.

## Logging System Features

### 1. **Structured Logging Service**
- **Location**: `src/services/LoggingService.ts`
- **Features**: 
  - Multiple log levels (ERROR, WARN, INFO, DEBUG)
  - File-based logging with timestamps
  - Context-rich logging with JSON objects
  - Separate blog-specific logging methods

### 2. **Log Files**
All logs are stored in the `logs/` directory:
- `app.log` - General application logs
- `blog.log` - Blog-specific logs (posts loading, static generation, etc.)

### 3. **Blog-Specific Logging**
The system includes specialized logging methods for blog functionality:
- `logger.blogError()` - Critical blog errors
- `logger.blogWarn()` - Blog warnings
- `logger.blogInfo()` - Blog information
- `logger.blogDebug()` - Detailed blog debugging

## Using the Logging System

### View Recent Logs
```bash
# View blog logs (default: last 50 lines)
npm run logs:blog

# View all application logs
npm run logs:app

# View specific number of lines
./view-logs.sh blog.log 100

# Follow logs in real-time
tail -f logs/blog.log
```

### Clear Old Logs
```bash
# Clear all log files
npm run logs:clear

# Or manually
rm -rf logs/*.log
```

## What the Logs Tell You

### 1. **Static Generation Process**
The logs show the complete static generation process:
```log
[2025-07-24T20:04:24.116Z] [INFO] BLOG: Generating static params for blog posts
[2025-07-24T20:04:24.116Z] [DEBUG] BLOG: Processing locale for static params | Context: {"locale":"en"}
```

### 2. **Post Loading**
Each post loading attempt is logged:
```log
[2025-07-24T20:04:24.127Z] [DEBUG] BLOG: Getting post by slug | Context: {"slug":"How-to-login-register","locale":"en"}
[2025-07-24T20:04:24.128Z] [DEBUG] BLOG: Attempting to read post file | Context: {"fileName":"How-to-login-register.en.md","fullPath":"/path/to/file"}
[2025-07-24T20:04:24.128Z] [DEBUG] BLOG: Successfully loaded post | Context: {"slug":"How-to-login-register","hasContent":true}
```

### 3. **Errors and Warnings**
Any issues are clearly logged:
```log
[2025-07-24T20:04:24.128Z] [WARN] BLOG: Post file does not exist | Context: {"fullPath":"/path/to/missing/file"}
[2025-07-24T20:04:24.128Z] [ERROR] BLOG: Critical error in PostPage component | Context: {"error":"message","stack":"..."}
```

## Common Issues and Solutions

### 1. **500 Errors on Blog Posts**
**Check logs for**:
- File path issues
- Missing blog post files
- Markdown parsing errors
- Static generation failures

**Example log pattern**:
```log
[ERROR] BLOG: Post file does not exist | Context: {"fullPath":"..."}
[ERROR] BLOG: Critical error in PostPage component
```

### 2. **Missing Localized Posts**
**Check logs for**:
- Locale-specific file filtering
- File naming convention issues

**Example log pattern**:
```log
[DEBUG] BLOG: Filtered files for locale | Context: {"locale":"en","filteredFiles":[]}
[WARN] BLOG: No universal name found for slug in locale
```

### 3. **Build-Time Issues**
**Check logs for**:
- Static parameter generation errors
- File system access issues

**Example log pattern**:
```log
[ERROR] BLOG: Error generating static params | Context: {"error":"..."}
[ERROR] BLOG: Posts directory does not exist
```

## Best Practices

### 1. **Regular Log Monitoring**
- Check logs after each deployment
- Monitor logs during development
- Clear old logs periodically

### 2. **Error Investigation**
1. Reproduce the issue
2. Check `logs/blog.log` for recent errors
3. Look for context information in the logs
4. Follow the request flow through the logs

### 3. **Performance Monitoring**
- Monitor post loading times
- Check static generation performance
- Look for file system access patterns

## Integration with Development Workflow

### During Development
```bash
# Start development server
npm run dev

# In another terminal, follow logs
tail -f logs/blog.log

# Test blog functionality and watch logs in real-time
```

### During Deployment
```bash
# Build and deploy
npm run deploy

# Check logs for any issues
npm run logs:blog

# Verify all posts were generated correctly
./view-logs.sh blog.log 100 | grep "Successfully loaded"
```

## Advanced Usage

### Custom Log Analysis
```bash
# Find all errors
grep "ERROR" logs/blog.log

# Find specific post issues
grep "How-to-login-register" logs/blog.log

# Count successful vs failed post loads
grep -c "Successfully loaded" logs/blog.log
grep -c "ERROR" logs/blog.log
```

### Log Rotation
For production environments, consider implementing log rotation:
```bash
# Archive old logs
mv logs/blog.log "logs/blog-$(date +%Y%m%d).log"

# The system will create a new log file automatically
```

## Troubleshooting Checklist

When blog posts show 500 errors:

1. ✅ **Check logs**: `npm run logs:blog`
2. ✅ **Verify files exist**: Check `content/blog/` directory
3. ✅ **Check file naming**: Ensure `.locale.md` pattern
4. ✅ **Verify metadata**: Check frontmatter in markdown files
5. ✅ **Test build**: `npm run build` and check for errors
6. ✅ **Check static generation**: Look for "Generated static params" logs

The logging system provides complete visibility into the blog functionality, making it easy to identify and resolve issues quickly.

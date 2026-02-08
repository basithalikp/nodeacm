# Remote Data Configuration Guide

## Overview

This app now fetches data dynamically from the GitHub repository: `https://github.com/basithalikp/acm-events-cdn`

## How It Works

1. **Remote Data Source**: The app fetches JSON data from the raw GitHub URL
2. **Caching**: Data is cached in memory for 5 minutes to reduce API calls
3. **Fallback**: If remote fetch fails, it falls back to local data (`./data/index.js`)
4. **Auto-refresh**: Cache automatically refreshes every 5 minutes

## Setup Instructions

### Step 1: Push JSON to GitHub Repository

1. Upload `data/index.json` to your `acm-events-cdn` repository as `data.json`

```bash
# In your acm-events-cdn repository
cp /path/to/nodeacm/data/index.json ./data.json
git add data.json
git commit -m "Add ACM data source"
git push origin main
```

### Step 2: Configure Environment Variables (Optional)

Create a `.env` file in your project root:

```env
# URL to fetch data from (default shown below)
DATA_SOURCE_URL=https://raw.githubusercontent.com/basithalikp/acm-events-cdn/main/data.json

# Cache duration in milliseconds (default: 5 minutes)
CACHE_DURATION=300000

# Enable/disable local fallback (default: true)
USE_LOCAL_FALLBACK=true

# Site URL for SEO
SITE_URL=https://acm.nssce.ac.in
```

### Step 3: Install dotenv (if using .env)

```bash
npm install dotenv
```

Then add this to the top of `app.js`:

```javascript
require('dotenv').config();
```

## Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `DATA_SOURCE_URL` | `https://raw.githubusercontent.com/.../data.json` | URL to fetch JSON data |
| `CACHE_DURATION` | `300000` (5 min) | How long to cache data in milliseconds |
| `USE_LOCAL_FALLBACK` | `true` | Whether to use local data if remote fails |

## Updating Data

### Option 1: Via GitHub Web Interface
1. Go to https://github.com/basithalikp/acm-events-cdn
2. Edit `data.json` directly on GitHub
3. Commit changes
4. Your website will pick up changes within 5 minutes

### Option 2: Via Git
```bash
cd /path/to/acm-events-cdn
# Edit data.json
git add data.json
git commit -m "Update events/team data"
git push origin main
```

### Option 3: Automated Script
Create a script to update from your local data:

```bash
#!/bin/bash
# update-cdn.sh

# Copy latest data
cp /path/to/nodeacm/data/index.json /path/to/acm-events-cdn/data.json

# Push to GitHub
cd /path/to/acm-events-cdn
git add data.json
git commit -m "Auto-update: $(date)"
git push origin main

echo "✅ CDN updated! Changes will reflect in 5 minutes."
```

## Testing

### Test Remote Fetch
```bash
curl https://raw.githubusercontent.com/basithalikp/acm-events-cdn/main/data.json
```

### Test Locally
```bash
npm start
# Check console for:
# 🌐 Fetching fresh data from: https://...
# ✅ Data fetched and cached successfully
```

### Force Cache Refresh
Restart your server or wait 5 minutes for automatic refresh.

## Monitoring

The app logs show data fetch status:
- `📦 Using cached data` - Serving from cache
- `🌐 Fetching fresh data` - Fetching from GitHub
- `✅ Data fetched successfully` - New data cached
- `❌ Error fetching` - Fetch failed
- `🔄 Falling back to local data` - Using local fallback
- `⚠️ Using stale cached data` - Old cache, but better than nothing

## Production Deployment

### Vercel/Netlify
Set environment variables in dashboard:
```
DATA_SOURCE_URL=https://raw.githubusercontent.com/...
CACHE_DURATION=300000
```

### PM2 (Traditional Server)
```bash
pm2 start app.js --name acm-website
pm2 save
```

### Docker
```dockerfile
ENV DATA_SOURCE_URL=https://raw.githubusercontent.com/...
ENV CACHE_DURATION=300000
```

## Benefits

✅ **No Server Redeployment**: Update data without redeploying your website  
✅ **Version Control**: All data changes tracked in Git  
✅ **Fast Loading**: In-memory caching for quick responses  
✅ **Reliable**: Automatic fallback to local data if GitHub is down  
✅ **Easy Updates**: Edit JSON directly on GitHub or push via Git  

## Troubleshooting

### Data not updating?
- Wait 5 minutes for cache to expire
- Check GitHub URL is correct and file exists
- Restart server to force immediate refresh

### Server won't start?
- Check if `data.json` exists in GitHub repo
- Verify `USE_LOCAL_FALLBACK=true` and `./data/index.js` exists
- Check console for error messages

### Fetch errors?
- Verify GitHub repository is public
- Check URL format (must be raw.githubusercontent.com)
- Ensure JSON is valid (use jsonlint.com)

## Advanced: Multiple Environments

```env
# Development
DATA_SOURCE_URL=https://raw.githubusercontent.com/.../dev-data.json

# Staging  
DATA_SOURCE_URL=https://raw.githubusercontent.com/.../staging-data.json

# Production
DATA_SOURCE_URL=https://raw.githubusercontent.com/.../data.json
```

## Questions?

Contact: 24b789@nssce.ac.in

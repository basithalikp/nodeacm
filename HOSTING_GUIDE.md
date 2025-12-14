# Hosting NSSCE ACM Node.js App on A2Hosting cPanel - Complete Guide

## Prerequisites
- A2Hosting cPanel account with Node.js support enabled
- SSH access to your hosting account
- Domain/subdomain pointed to your hosting account
- Local copy of the nodeacm app ready to deploy

---

## Step 1: Verify Node.js & npm Availability

### 1.1 Check if Node.js is available on your server
```bash
ssh user@yourdomain.com
node -v
npm -v
```

### 1.2 If Node.js is not installed
- Log into cPanel
- Go to **Software** → **Node.js Selector** (or **Setup Node.js App**)
- Install the latest stable LTS version (e.g., v20.x)
- Confirm installation

---

## Step 2: Prepare Your Application

### 2.1 Create a production build locally
```bash
cd /home/katen/gits/acm-no-backend/nodeacm
npm install
```

### 2.2 Update package.json for production
Edit `nodeacm/package.json` and ensure it looks like this:
```json
{
  "name": "nssce-acm-website",
  "version": "1.0.0",
  "description": "NSSCE ACM Student Chapter Website - Node.js version",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "keywords": ["acm", "nssce", "student-chapter"],
  "author": "NSSCE ACM",
  "license": "MIT",
  "dependencies": {
    "ejs": "^3.1.9",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### 2.3 Test locally one more time
```bash
npm start
# Should see: 🚀 NSSCE ACM Website running at http://localhost:3000
```

---

## Step 3: Upload Files to Server

### 3.1 Create directory structure on server
```bash
ssh user@yourdomain.com

# Create app directory (if not using subdomain)
mkdir -p ~/public_html/acm-app
# OR for subdomain
mkdir -p ~/public_html/acm.yourdomain.com
```

### 3.2 Upload files using SFTP/SCP
```bash
# From your local machine
cd /home/katen/gits/acm-no-backend/nodeacm

# Using SCP (all files at once)
scp -r . user@yourdomain.com:~/public_html/acm-app/

# OR using rsync (more efficient)
rsync -avz --exclude node_modules --exclude .git . user@yourdomain.com:~/public_html/acm-app/
```

### 3.3 Verify file permissions
```bash
ssh user@yourdomain.com
cd ~/public_html/acm-app
chmod 755 app.js
chmod -R 755 public/
chmod -R 755 views/
```

---

## Step 4: Install Dependencies on Server

```bash
ssh user@yourdomain.com
cd ~/public_html/acm-app

# Install npm dependencies
npm install --production

# Verify installation
ls node_modules | head
npm list express
```

---

## Step 5: Setup Node.js App via cPanel

### 5.1 Access cPanel Node.js Setup
1. Log into cPanel
2. Go to **Software** → **Setup Node.js App** (or **Node.js Selector**)
3. Click **Create Application**

### 5.2 Configure the Application
Fill in the following details:

| Field | Value |
|-------|-------|
| **Node.js Version** | 20.11.0 (or latest LTS) |
| **Application Mode** | Development or Production (choose Production) |
| **Application Root** | `/home/username/public_html/acm-app` |
| **Application URL** | `yourdomain.com` or `acm.yourdomain.com` |
| **Application Startup File** | `app.js` |

### 5.3 Save Configuration
- Click **Create**
- cPanel will create a wrapper script automatically
- Note the displayed port (usually something like 38443)

---

## Step 6: Set Up Reverse Proxy (Apache Configuration)

### 6.1 Auto-configured by cPanel
When you create a Node.js app in cPanel, it automatically:
- Creates a reverse proxy configuration
- Routes HTTP requests to your Node.js port
- Handles SSL/HTTPS automatically

### 6.2 Verify the proxy is working
```bash
curl -I http://yourdomain.com/
# Should return: HTTP/1.1 200 OK
```

---

## Step 7: SSL/TLS Certificate Setup

### 7.1 Using AutoSSL (Recommended)
1. In cPanel → **Security** → **AutoSSL**
2. Ensure your domain is listed
3. Run AutoSSL to generate certificate

### 7.2 Or manually with Let's Encrypt
```bash
# cPanel usually handles this automatically
# But if needed, SSH and run:
/usr/local/cpanel/scripts/sitepublish yourdomain.com
```

---

## Step 8: Create .env File for Environment Variables (Optional)

### 8.1 Create environment configuration
```bash
ssh user@yourdomain.com
cd ~/public_html/acm-app

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=3000
APP_NAME=NSSCE ACM Website
LOG_LEVEL=info
EOF

chmod 600 .env
```

### 8.2 Update app.js to use environment variables (Optional)
```javascript
// At the top of app.js
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
```

---

## Step 9: Configure Process Manager (PM2)

### 9.1 Install PM2 globally on server
```bash
ssh user@yourdomain.com
npm install -g pm2
```

### 9.2 Create PM2 ecosystem file
```bash
cd ~/public_html/acm-app

cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'acm-website',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
EOF

# Create logs directory
mkdir -p logs
chmod 755 logs
```

### 9.3 Start with PM2
```bash
cd ~/public_html/acm-app
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Step 10: Test the Application

### 10.1 Test from browser
```
http://yourdomain.com
http://yourdomain.com/events
http://yourdomain.com/team
http://yourdomain.com/about
```

### 10.2 Test routes via command line
```bash
curl http://yourdomain.com/
curl http://yourdomain.com/events
curl http://yourdomain.com/team
curl http://yourdomain.com/about
```

### 10.3 Check logs
```bash
ssh user@yourdomain.com
cd ~/public_html/acm-app

# View PM2 logs
pm2 logs

# View application logs
tail -f logs/out.log
tail -f logs/err.log
```

---

## Step 11: Monitor and Manage Application

### 11.1 Check application status
```bash
pm2 status
pm2 info acm-website
```

### 11.2 Restart application
```bash
pm2 restart acm-website
# OR
pm2 restart all
```

### 11.3 Stop application
```bash
pm2 stop acm-website
```

### 11.4 View real-time logs
```bash
pm2 logs acm-website
```

---

## Step 12: Set Up Automatic Backups

### 12.1 Using cPanel Backups
1. Log into cPanel
2. Go to **Files** → **Backup**
3. Configure automatic daily/weekly backups
4. Store backups in remote location (optional)

### 12.2 Manual backup script
```bash
# Create backup
cd ~/public_html/acm-app
tar -czf acm-app-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=logs \
  .

# Move to backups directory
mkdir -p ~/backups
mv acm-app-*.tar.gz ~/backups/
```

---

## Step 13: Enable Cron Jobs for Maintenance (Optional)

### 13.1 Create maintenance script
```bash
# Create a file: maintenance.sh
cat > ~/public_html/acm-app/maintenance.sh << 'EOF'
#!/bin/bash
cd ~/public_html/acm-app

# Check if application is running
if ! pm2 list | grep -q "acm-website.*online"; then
  pm2 start ecosystem.config.js
fi

# Clean old logs (older than 30 days)
find logs -name "*.log" -mtime +30 -delete

# Update npm packages (optional - be careful in production)
# npm update
EOF

chmod +x ~/public_html/acm-app/maintenance.sh
```

### 13.2 Add to cPanel cron
1. Go to **Advanced** → **Cron Jobs**
2. Add new cron job:
   ```
   0 2 * * * /home/username/public_html/acm-app/maintenance.sh
   ```

---

## Troubleshooting Common Issues

### Issue 1: "Cannot find module" errors
**Solution:**
```bash
cd ~/public_html/acm-app
rm -rf node_modules package-lock.json
npm install --production
```

### Issue 2: Port already in use
**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or let PM2 handle it
pm2 restart all
```

### Issue 3: Images not loading
**Solution:**
Verify symlink is correct:
```bash
cd ~/public_html/acm-app/public
ls -la images
# Should show: images -> ../../images
```

### Issue 4: 404 errors on routes
**Solution:**
Check that Express is receiving requests:
```bash
pm2 logs acm-website
# Look for route matching messages
```

### Issue 5: HTTPS not working
**Solution:**
```bash
# Verify SSL certificate
cPanel → Security → SSL/TLS Status
# Or reinstall:
/usr/local/cpanel/scripts/sitepublish yourdomain.com
```

---

## Performance Optimization

### 13.1 Enable gzip compression
Add to app.js:
```javascript
const compression = require('compression');
app.use(compression());
```

Then:
```bash
npm install compression
```

### 13.2 Enable caching headers
Add to app.js:
```javascript
app.use(express.static('public', {
    maxAge: '1d',
    etag: false
}));
```

### 13.3 Monitor memory usage
```bash
pm2 monit
```

---

## Deployment Workflow for Future Updates

### After making code changes locally:

```bash
# 1. Test locally
npm start

# 2. Commit to git
git add .
git commit -m "Update team members and events"

# 3. Upload to server
rsync -avz --exclude node_modules --exclude .git . user@yourdomain.com:~/public_html/acm-app/

# 4. On server, restart app
ssh user@yourdomain.com
cd ~/public_html/acm-app
npm install --production
pm2 restart acm-website
```

---

## Quick Reference Commands

```bash
# SSH into server
ssh user@yourdomain.com

# Navigate to app
cd ~/public_html/acm-app

# Start app
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Restart app
pm2 restart acm-website

# Stop app
pm2 stop acm-website

# Delete app from PM2
pm2 delete acm-website

# Restart all PM2 apps
pm2 restart all

# View app info
pm2 info acm-website

# Monit real-time
pm2 monit
```

---

## Security Checklist

- [x] Install SSL/TLS certificate
- [x] Set proper file permissions (755 for dirs, 644 for files)
- [x] Disable directory listing
- [x] Set NODE_ENV=production
- [x] Use environment variables for sensitive data
- [x] Keep dependencies updated
- [x] Configure firewall rules in cPanel
- [x] Enable ModSecurity (cPanel → Security)
- [x] Regular backups enabled
- [x] Monitor error logs regularly

---

## Support Resources

- A2Hosting Support: https://www.a2hosting.com/support
- cPanel Documentation: https://documentation.cpanel.net/
- Node.js Best Practices: https://nodejs.org/en/docs/guides/
- Express.js Documentation: https://expressjs.com/


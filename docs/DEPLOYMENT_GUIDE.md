# 🚀 Deployment Guide

Complete guide for deploying the Blood Bank Portal to production.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Build Process](#build-process)
- [Environment Configuration](#environment-configuration)
- [Deployment Platforms](#deployment-platforms)
- [Domain Configuration](#domain-configuration)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Logging](#monitoring-and-logging)
- [Backup and Recovery](#backup-and-recovery)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

### Code Review

- [ ] All features tested and working
- [ ] No console errors in browser
- [ ] All TypeScript errors resolved
- [ ] Build completes successfully
- [ ] All dependencies up to date
- [ ] Remove development/debug code
- [ ] Update version numbers

### Configuration

- [ ] Environment variables configured
- [ ] API endpoints set to production
- [ ] Remove test/mock credentials from code
- [ ] Configure proper error handling
- [ ] Set up analytics (if needed)
- [ ] Configure CORS properly

### Security

- [ ] Sensitive data not in code
- [ ] Authentication tokens secure
- [ ] Input validation in place
- [ ] SQL injection prevention (if using database)
- [ ] XSS protection enabled
- [ ] HTTPS enforced

### Documentation

- [ ] README updated
- [ ] API documentation complete
- [ ] User guides finalized
- [ ] Deployment notes documented
- [ ] Contact information current

---

## 🔨 Build Process

### Local Build

```bash
# Clean previous builds
rm -rf dist

# Install dependencies
npm ci

# Run production build
npm run build

# Build output in dist/ folder
```

### Build Configuration

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dropdown-menu', /* other UI libs */]
        }
      }
    }
  }
});
```

### Verify Build

```bash
# Preview production build locally
npm run preview

# Test on http://localhost:4173
# Check all features work
# Verify routing works
# Test all user flows
```

---

## 🔧 Environment Configuration

### Create Environment Files

**.env.production**:
```bash
VITE_APP_NAME=Blood Bank Portal
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Using Environment Variables

```typescript
// Access in code
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;

// Check environment
if (import.meta.env.PROD) {
  // Production-only code
  console.log = () => {}; // Disable console logs
}

if (import.meta.env.DEV) {
  // Development-only code
  enableDevTools();
}
```

---

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)

**Why Vercel:**
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant deployments
- ✅ Free tier available
- ✅ GitHub integration

**Deploy with CLI**:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Deploy with GitHub**:
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables
7. Click "Deploy"

**vercel.json** (optional):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

### 2. Netlify

**Why Netlify:**
- ✅ Easy setup
- ✅ Automatic deployments
- ✅ Form handling
- ✅ Serverless functions
- ✅ Free tier generous

**Deploy with CLI**:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Deploy with Drag & Drop**:
1. Build locally: `npm run build`
2. Go to https://app.netlify.com
3. Drag `dist` folder to deploy

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

### 3. GitHub Pages

**Why GitHub Pages:**
- ✅ Free hosting
- ✅ Direct from repository
- ✅ Custom domain support
- ✅ HTTPS included

**Deploy with gh-pages**:
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/blood-connect"
}

# Deploy
npm run deploy
```

**vite.config.ts** (add base):
```typescript
export default defineConfig({
  base: '/blood-connect/', // Repository name
  // ... other config
});
```

---

### 4. AWS S3 + CloudFront

**Why AWS:**
- ✅ Scalable
- ✅ Reliable
- ✅ Full control
- ✅ Professional choice

**Steps**:

1. **Create S3 Bucket**:
```bash
aws s3 mb s3://blood-bank-portal
```

2. **Configure for Static Hosting**:
```bash
aws s3 website s3://blood-bank-portal \
  --index-document index.html \
  --error-document index.html
```

3. **Upload Build**:
```bash
npm run build
aws s3 sync dist/ s3://blood-bank-portal --delete
```

4. **Set Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::blood-bank-portal/*"
    }
  ]
}
```

5. **Create CloudFront Distribution**:
- Origin: S3 bucket
- Viewer Protocol: Redirect HTTP to HTTPS
- Default Root Object: index.html
- Error Pages: 404 → /index.html (200)

---

### 5. Firebase Hosting

**Why Firebase:**
- ✅ Fast global CDN
- ✅ Free SSL
- ✅ Easy rollbacks
- ✅ Preview channels

**Deploy**:
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deploys: Optional

# Build and deploy
npm run build
firebase deploy
```

**firebase.json**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

### 6. Docker Deployment

**Why Docker:**
- ✅ Consistent environment
- ✅ Easy scaling
- ✅ Platform independent
- ✅ Microservices ready

**Dockerfile**:
```dockerfile
# Multi-stage build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # SPA routing
    location / {
      try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
  }
}
```

**Build and Run**:
```bash
# Build image
docker build -t blood-bank-portal .

# Run container
docker run -d -p 80:80 --name blood-bank blood-bank-portal

# View logs
docker logs blood-bank

# Stop container
docker stop blood-bank

# Remove container
docker rm blood-bank
```

**Docker Compose** (docker-compose.yml):
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

**Deploy with Docker Compose**:
```bash
docker-compose up -d
```

---

## 🌍 Domain Configuration

### Custom Domain Setup

**For Vercel**:
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Add DNS records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Netlify**:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: yoursite.netlify.app
```

**For Cloudflare** (recommended):
1. Add site to Cloudflare
2. Update nameservers at domain registrar
3. Add DNS records
4. Enable proxy (orange cloud)
5. Free SSL included

---

## 🔒 SSL/HTTPS Setup

### Automatic SSL (Most Platforms)

Vercel, Netlify, Firebase, Cloudflare all provide automatic SSL:
- ✅ Free certificates
- ✅ Auto-renewal
- ✅ No configuration needed

### Manual SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates saved in:
# /etc/letsencrypt/live/yourdomain.com/

# Auto-renewal
sudo certbot renew --dry-run

# Add to crontab for auto-renewal
0 0 * * * certbot renew --quiet
```

### Force HTTPS

**In nginx.conf**:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ... rest of config
}
```

---

## ⚡ Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@radix-ui/react-dropdown-menu', /* ... */]
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});
```

### Image Optimization

```bash
# Compress images
npm install -g imagemin-cli

# Optimize
imagemin public/images/* --out-dir=public/images/optimized
```

### Code Splitting

```typescript
// Lazy load routes
import { lazy, Suspense } from 'react';

const DonorDashboard = lazy(() => import('./pages/DonorDashboard'));

<Suspense fallback={<Loading />}>
  <DonorDashboard />
</Suspense>
```

### Caching Strategy

**Static Assets**:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**HTML Files**:
```nginx
location ~* \.html$ {
  expires -1;
  add_header Cache-Control "no-store, no-cache, must-revalidate";
}
```

---

## 📊 Monitoring and Logging

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: 'production',
    tracesSampleRate: 1.0,
  });
}
```

### Analytics (Google Analytics)

```typescript
// Install
npm install react-ga4

// Initialize
import ReactGA from 'react-ga4';

if (import.meta.env.PROD) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
}

// Track page views
useEffect(() => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
}, []);
```

### Uptime Monitoring

**Services**:
- UptimeRobot (free)
- Pingdom
- StatusCake
- Better Uptime

**Setup**:
1. Create account
2. Add monitor for your URL
3. Set check interval (5 minutes)
4. Configure alerts (email/SMS)
5. Create status page (optional)

---

## 💾 Backup and Recovery

### Automated Backups

**For Static Sites**:
```bash
# Backup script (backup.sh)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/blood-bank"

# Create backup
mkdir -p $BACKUP_DIR
cp -r dist $BACKUP_DIR/dist_$DATE

# Keep only last 10 backups
ls -t $BACKUP_DIR | tail -n +11 | xargs -I {} rm -rf $BACKUP_DIR/{}

echo "Backup completed: $DATE"
```

**Schedule with cron**:
```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup.sh
```

### Version Control

```bash
# Always maintain in Git
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0

# Create release branch
git checkout -b production
git push origin production
```

### Database Backup (if using)

```bash
# MongoDB
mongodump --uri="mongodb://..." --out=/backups/$(date +%Y%m%d)

# PostgreSQL
pg_dump dbname > /backups/backup_$(date +%Y%m%d).sql

# MySQL
mysqldump -u user -p database > /backups/backup_$(date +%Y%m%d).sql
```

---

## 🔧 Troubleshooting

### Common Issues

**1. Routes Not Working (404 on refresh)**

**Solution**: Configure server to always serve index.html

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** (.htaccess):
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

**2. Environment Variables Not Working**

**Issue**: Variables not prefixed with VITE_

**Solution**: All variables must start with `VITE_`
```bash
# Wrong
API_URL=https://api.com

# Correct
VITE_API_URL=https://api.com
```

---

**3. Build Size Too Large**

**Solution**: Analyze and optimize
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Solutions:
- Use code splitting
- Remove unused dependencies
- Lazy load routes
- Optimize images
```

---

**4. Slow Initial Load**

**Solutions**:
```typescript
// 1. Lazy load routes
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// 2. Preload critical routes
<link rel="preload" as="script" href="/assets/index.js">

// 3. Use CDN for large libraries
```

---

**5. CORS Errors**

**Solution**: Configure backend CORS headers
```javascript
// Express.js example
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## 📝 Deployment Checklist

### Pre-Launch

- [ ] All tests passing
- [ ] Build completes successfully
- [ ] No console errors
- [ ] All features working
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Performance optimized
- [ ] SEO metadata added
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Backup strategy in place

### Launch

- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Test all critical paths
- [ ] Check SSL certificate
- [ ] Verify custom domain
- [ ] Test from different locations
- [ ] Check mobile devices
- [ ] Monitor for errors
- [ ] Check analytics working
- [ ] Announce launch

### Post-Launch

- [ ] Monitor uptime
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Gather user feedback
- [ ] Plan updates
- [ ] Document issues
- [ ] Update documentation
- [ ] Celebrate success! 🎉

---

## 📞 Support Resources

### Deployment Help

**Vercel**: https://vercel.com/docs
**Netlify**: https://docs.netlify.com
**AWS**: https://docs.aws.amazon.com
**Firebase**: https://firebase.google.com/docs/hosting

### Community

- Stack Overflow
- Vite Discord
- React Discord
- Reddit r/webdev

### Professional Support

Consider hiring DevOps consultant for:
- Complex deployments
- High-traffic applications
- Custom infrastructure
- Security audits

---

**Good luck with your deployment!** 🚀

---

**Last Updated**: November 2024
**Version**: 1.0.0
**For**: Blood Bank & Donor Matching Portal

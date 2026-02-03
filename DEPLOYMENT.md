# Deployment Guide

This guide explains how to prepare and deploy the CAO Voice Platform to production.

## Pre-Deployment Checklist

### 1. Environment Configuration

Create `.env` files for both frontend and backend:

**Frontend (.env)**
```bash
VITE_API_URL=https://your-api-domain.com
VITE_ENABLE_GUIDANCE_MODE=true
VITE_ENABLE_VOICE_COMMANDS=true
```

**Backend (.env)**
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cao
FRONTEND_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
JWT_SECRET=generate-a-strong-secret-key
```

### 2. HTTPS Setup (Required for Voice API)

Web Speech API requires HTTPS in production. Options:

**Option A: Vercel (Recommended for React)**
- Automatic HTTPS
- Free deployment
- Global CDN

**Option B: AWS/Azure**
- Manual HTTPS setup
- AWS Certificate Manager or Azure Key Vault
- More control

**Option C: Heroku (Simple)**
- Automatic HTTPS
- Deploy easily with git push

### 3. Database Setup

**MongoDB Atlas (Cloud)**
```
1. Create account at mongodb.com
2. Create cluster
3. Add IP whitelist (or 0.0.0.0 for all)
4. Get connection string
5. Add to MONGODB_URI in .env
```

### 4. CORS Configuration

Update backend `src/index.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Deployment Options

### Option 1: Vercel + Heroku

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Add environment variables in Vercel Dashboard
VITE_API_URL=https://cao-backend.herokuapp.com
```

**Backend on Heroku:**
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create cao-backend

# Add MongoDB
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# Set environment variables
heroku config:set FRONTEND_URL=https://your-vercel-domain.com
heroku config:set CORS_ORIGIN=https://your-vercel-domain.com
heroku config:set JWT_SECRET=your-secret-key
```

### Option 2: AWS EC2 + RDS

**Backend:**
1. Launch EC2 instance (Node.js AMI)
2. Install Node.js and npm
3. Clone repository
4. Install dependencies: `npm install`
5. Set environment variables
6. Start with PM2: `pm2 start src/index.js`

**Frontend:**
1. Build: `npm run build`
2. Deploy to S3 + CloudFront
3. Or use EC2 with nginx

**Database:**
1. Create RDS MongoDB instance
2. Update MONGODB_URI

### Option 3: Docker + Any Cloud

**Create Dockerfile for Backend:**
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "src/index.js"]
```

**Create Dockerfile for Frontend:**
```dockerfile
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

## Post-Deployment

### 1. Test Voice Functionality

- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari (requires HTTPS)
- [ ] Verify microphone access
- [ ] Test voice commands

### 2. Monitoring

Set up error tracking:

```bash
# Install Sentry
npm install @sentry/react @sentry/tracing

# Or: LogRocket
npm install logrocket
```

### 3. Performance

- [ ] Check bundle size: `npm run build`
- [ ] Test voice latency
- [ ] Monitor API response times
- [ ] Check database query performance

### 4. Security

- [ ] Enable HTTPS redirect
- [ ] Set strong JWT secret
- [ ] Update CORS whitelist
- [ ] Hide sensitive data in .env
- [ ] Enable database authentication
- [ ] Use environment variables for all secrets

### 5. Backup & Recovery

- [ ] Enable MongoDB automated backups
- [ ] Test restore process
- [ ] Document rollback procedure

## SSL/HTTPS Certificate

### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

## Troubleshooting

### Voice Commands Not Working
- Verify HTTPS is enabled
- Check microphone permissions
- Check browser console for errors
- Test in another browser

### API Endpoints Failing
- Verify CORS_ORIGIN is correct
- Check MongoDB connection
- Verify environment variables
- Check network tab in DevTools

### Slow Performance
- Check API response times
- Monitor database queries
- Review Vite build output
- Check cloud service metrics

## Rollback Plan

If deployment fails:

```bash
# Backend
heroku rollback  # or git revert

# Frontend
vercel rollback  # automatic from dashboard
```

## Maintenance

- Monitor error logs
- Update dependencies: `npm update`
- Regular database backups
- Test voice commands weekly
- Monitor performance metrics

---

For more information, refer to framework-specific documentation:
- [Vercel Deployment](https://vercel.com/docs)
- [Heroku Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [AWS EC2](https://docs.aws.amazon.com/ec2/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)

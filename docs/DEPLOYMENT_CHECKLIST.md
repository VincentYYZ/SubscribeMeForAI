# Production Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Generate secure `NEXTAUTH_SECRET` (32+ characters)
- [ ] Configure production database URL
- [ ] Set up error monitoring (Sentry DSN)
- [ ] Configure OAuth providers (if needed)
- [ ] Set up Redis for rate limiting (optional)
- [ ] Verify all environment variables in `.env.production`

### Database
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Verify database indexes are created
- [ ] Set up database backups
- [ ] Configure connection pooling

### Security
- [ ] Review security headers configuration
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Set up DDoS protection
- [ ] Review CORS settings

### Performance
- [ ] Build production bundle: `npm run build`
- [ ] Analyze bundle size: `npm run analyze`
- [ ] Optimize images in `/public`
- [ ] Configure CDN (if applicable)
- [ ] Enable compression

## Deployment

### Server Setup
- [ ] Install Node.js 20+
- [ ] Install PM2: `npm install -g pm2`
- [ ] Install PostgreSQL 16+
- [ ] Configure nginx reverse proxy
- [ ] Set up SSL certificates

### Application Deployment
- [ ] Clone repository
- [ ] Copy `.env.production` to `.env`
- [ ] Run deployment script: `./scripts/deploy.sh`
- [ ] Verify application starts: `pm2 status`
- [ ] Check logs: `pm2 logs subscribemeforai`

### Verification
- [ ] Health check: `./scripts/health-check.sh https://yourdomain.com`
- [ ] Test all pages load
- [ ] Verify API endpoints work
- [ ] Check error monitoring (Sentry)
- [ ] Test database connections
- [ ] Verify rate limiting works

## Post-Deployment

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure alerting (Sentry, email, Slack)
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Review application logs
- [ ] Check error rates

### Optimization
- [ ] Review performance metrics
- [ ] Analyze slow queries
- [ ] Optimize cache hit rates
- [ ] Monitor API response times

### Maintenance
- [ ] Document deployment process
- [ ] Set up automated backups
- [ ] Plan rollback strategy
- [ ] Schedule regular updates
- [ ] Monitor security advisories

## Emergency Procedures

### Rollback
```bash
git checkout <previous-commit>
./scripts/deploy.sh
```

### Database Rollback
```bash
npx prisma migrate resolve --rolled-back <migration-name>
```

### Quick Restart
```bash
pm2 restart subscribemeforai
```

### Check Logs
```bash
pm2 logs subscribemeforai --lines 100
```

## Support Contacts
- DevOps: [contact info]
- Database Admin: [contact info]
- Security Team: [contact info]

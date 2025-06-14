# WeatherDress MVP - Deployment Guide 🚀

## Quick Deploy to Vercel

### 1. Prerequisites
- GitHub/GitLab repository
- OpenWeatherMap API key
- Vercel account (free)

### 2. One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/weatherdress-mvp)

### 3. Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Environment Configuration

### Required Variables
```bash
# OpenWeatherMap API
OPENWEATHERMAP_API_KEY=your_api_key_here
```

### Optional Variables
```bash
# Production optimizations
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Custom API base URL
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com
```

## Performance Requirements

### Load Time Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## Deployment Checklist

### Pre-deployment
- [ ] Environment variables set
- [ ] Build passes (`npm run build`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm run test`)

### Post-deployment
- [ ] Health check endpoint responds
- [ ] API endpoints functional
- [ ] Mobile responsiveness verified
- [ ] Performance metrics meet targets

## Production Optimizations

### Automatically Applied
- Console log removal in production
- Image optimization (WebP/AVIF)
- CSS optimization
- Bundle compression
- Static asset caching

### Manual Optimizations
```bash
# Analyze bundle size
ANALYZE=true npm run build

# Performance testing
npm run lighthouse

# Load testing
npm run loadtest
```

## Monitoring & Debugging

### Health Checks
```bash
# API health
curl https://your-domain.com/api/health

# Station search
curl "https://your-domain.com/api/stations?q=渋谷"

# Weather recommendation
curl "https://your-domain.com/api/weather?origin_lat=35.6762&origin_lon=139.6503"
```

### Common Issues

#### API Key Issues
```bash
# Verify API key
curl "http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=YOUR_API_KEY"
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Scaling Considerations

### Current Limits (MVP)
- **Concurrent Users**: 1,000
- **API Requests**: 60/min per API key
- **Data Storage**: In-memory (volatile)

### Production Scaling
- **Database**: PostgreSQL + Redis
- **CDN**: Vercel Edge Network
- **API Rate Limiting**: Redis-based
- **Monitoring**: Vercel Analytics

## Security

### Implemented
- Environment variable protection
- CORS configuration
- Input validation
- Type safety

### Production Additions
- Rate limiting
- Authentication (NextAuth.js)
- HTTPS enforcement
- Security headers

## Domain Setup

### Custom Domain on Vercel
1. Add domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### SSL Certificate
- Automatically provisioned by Vercel
- Includes www and apex domain
- Auto-renewal enabled

## Rollback Strategy

### Quick Rollback
```bash
# List deployments
vercel list

# Promote previous deployment
vercel promote [deployment-url]
```

### Database Rollback (Future)
```bash
# PostgreSQL backup restoration
pg_restore --clean --if-exists -d weatherdress backup.sql
```

## Cost Estimation

### Vercel (Free Tier)
- **Bandwidth**: 100GB/month
- **Serverless Functions**: 100GB-hours
- **Edge Functions**: 500K invocations

### OpenWeatherMap API
- **Free**: 1,000 calls/day
- **Startup**: $40/month (300K calls)

### Expected MVP Costs
- **Month 1-3**: $0 (free tiers)
- **Scale to 1K users**: ~$50/month
- **Scale to 10K users**: ~$200/month

## Backup & Recovery

### Data Backup (Production)
```bash
# User preferences backup
pg_dump -t user_preferences weatherdress > prefs_backup.sql

# Outfit history backup
pg_dump -t outfit_history weatherdress > history_backup.sql
```

### Recovery Process
1. Identify issue scope
2. Check recent deployments
3. Rollback if needed
4. Restore data from backup
5. Verify functionality

---

**Happy Deploying! 🎉**
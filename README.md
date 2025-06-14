# WeatherDress MVP 🌤️👗

毎朝の服装選びの悩みから解放される、パーソナル服装レコメンドSaaS

## 🚀 Features

### ✅ 実装済み機能

- **🌡️ リアルタイム天気データ**: OpenWeatherMap API統合
- **🚉 駅名→座標変換**: 主要駅データベース（40駅以上）内蔵
- **🧠 AI服装レコメンデーション**: 気温・湿度・風速・降水を考慮した推論
- **📍 2地点間天気差分析**: 自宅⇄職場の気温差を考慮
- **👤 ユーザーデータ管理**: 設定・履歴・統計機能
- **📊 服装履歴・統計**: 満足度追跡・アイテム使用頻度分析
- **⚡ 高速API**: TypeScript + Next.js API Routes
- **🔄 自動デプロイ**: Vercel対応

## 🏗️ Architecture

### API Endpoints

```
GET  /api/health                     # ヘルスチェック
GET  /api/weather                    # 天気データ&服装推奨
POST /api/weather                    # バッチ天気取得
GET  /api/stations                   # 駅検索
POST /api/stations                   # 複数駅座標取得
GET  /api/user/preferences           # ユーザー設定取得
POST /api/user/preferences           # ユーザー設定更新
GET  /api/user/history               # 服装履歴取得
POST /api/user/history               # 服装履歴追加
```

### Tech Stack

- **Framework**: Next.js 15 + TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **Weather API**: OpenWeatherMap
- **Data Storage**: Memory (MVP) → Redis/PostgreSQL (Production)

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API Key

### Installation

```bash
# Clone repository
git clone <repository-url>
cd weatherdress-mvp

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local and add your OPENWEATHERMAP_API_KEY
```

### Running Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### API Testing

```bash
# Health check
curl http://localhost:3000/api/health

# Station search
curl "http://localhost:3000/api/stations?q=渋谷"

# Weather with recommendations
curl "http://localhost:3000/api/weather?origin_lat=35.6762&origin_lon=139.6503&dest_lat=35.6895&dest_lon=139.6917"
```

## 🌍 Deployment

### Vercel Deployment

1. **Environment Variables**:
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

2. **Deploy**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Custom Domain** (Optional):
   - Add domain in Vercel dashboard
   - Configure DNS records

### Environment Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENWEATHERMAP_API_KEY` | OpenWeatherMap API key | ✅ |
| `NODE_ENV` | Environment (development/production) | ❌ |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL for client | ❌ |

## 📊 API Usage Examples

### Weather Recommendation

```typescript
// Single location
const response = await fetch('/api/weather?origin_lat=35.6762&origin_lon=139.6503');
const data = await response.json();

console.log(data.recommendation.mainOutfit);
// ['長袖シャツ', 'チノパン', 'スニーカー']

// Two locations (home → work)
const response = await fetch('/api/weather?origin_lat=35.6762&origin_lon=139.6503&dest_lat=35.6895&dest_lon=139.6917');
```

### Station Search

```typescript
// Search stations
const response = await fetch('/api/stations?q=新宿&limit=5');
const { stations } = await response.json();

console.log(stations[0]);
// {
//   name: '新宿',
//   latitude: 35.689592,
//   longitude: 139.700464,
//   prefecture: '東京都'
// }
```

### User Data Management

```typescript
// Get user preferences
const prefs = await fetch('/api/user/preferences?userId=user123');

// Update preferences
await fetch('/api/user/preferences', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    clothingStyle: 'business',
    weatherSensitivity: 'high'
  })
});

// Add outfit history
await fetch('/api/user/history', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    weatherCondition: { temperature: 22, humidity: 65 },
    chosenOutfit: { main: ['シャツ', 'パンツ'], accessories: ['カーディガン'] },
    satisfaction: 4,
    location: '東京'
  })
});
```

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 🔮 Future Enhancements

- [ ] **Frontend UI**: React components + mobile app
- [ ] **Database Integration**: PostgreSQL + Redis
- [ ] **User Authentication**: NextAuth.js
- [ ] **Push Notifications**: Weather alerts
- [ ] **Machine Learning**: Personal preference learning
- [ ] **Social Features**: Outfit sharing
- [ ] **Weather Forecasting**: Multi-day recommendations
- [ ] **Clothing Inventory**: Wardrobe management
- [ ] **Style Analytics**: Trend analysis

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Made with ❤️ for better mornings**